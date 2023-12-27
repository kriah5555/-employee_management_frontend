import React, { useEffect, useState } from "react"
import Logo from "../static/icons/Logo.png"
import SearchIcon from "../static/icons/Search.svg"
import DimonaIcon from "../static/icons/Dimona.svg"
import QuickAccessIcon from "../static/icons/QuickAccess.svg"
import CalendarIcon from "../static/icons/Calendar.svg"
import FAQIcon from "../static/icons/FAQ.svg"
import NotificationIcon from "../static/icons/Notification.svg"
import DummyIcon from "../static/icons/Profile.png"
import MenuContent from "../components/atoms/MenuContent"
import Dropdown from "../components/atoms/Dropdown"
import AddPlanIcon from "../static/icons/Uurrooster.svg"
import AddEmployeeIcon from "../static/icons/AddEmployee.svg"
import AddHolidayIcon from "../static/icons/ManageHoliday.svg"
import AddLocation from "../static/icons/AddLocation.svg"
import DownArrowIcon from "../static/icons/arrow.png"
import { GetTranslatedConstants, t } from "../translations/Translation"

import { APICALL as AXIOS } from "../services/AxiosServices";
import { LogoutApiUrl, ResponsibleCompaniesApiUrl } from "../routes/ApiEndPoints";
import { useNavigate } from "react-router-dom"
import { getFormattedDropdownOptions } from "../utilities/CommonFunctions"
import Popup from "../utilities/popup/Popup"

export default function Header({ setAuth, selectedCompany, setSelectedCompany, onCompanySelect, companyList, setCompanyList}) {

    const UserName = localStorage.getItem('name');
    const [Time, setTime] = useState(new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit' }));
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState({ value: localStorage.getItem('active_language'), label: (localStorage.getItem('active_language')).toUpperCase() })
    const [shortcutMenuOpen, setShortcutMenuOpen] = useState(false);
    const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
    const navigate = useNavigate()
    
    // const [selectedCompany, setSelectedCompany] = useState("")
    const [isCompanyIdEmpty, setIsCompanyIdEmpty] = useState(false)
    const [message, setMessage] = useState(false)


    useEffect(() => {
        //Implementing the setInterval method for displaying current belgium time
        const interval = setInterval(() => {
            let current_time = new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit' })
            setTime(current_time);
        }, 100);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [Time]);


    useEffect(() => {
        let lastCompanyId = localStorage.getItem('company_id')

        AXIOS.service(ResponsibleCompaniesApiUrl, "GET")
            .then((result) => {
                if (result.success) {
                    if (result.data.length !== 0) {
                        let data = getFormattedDropdownOptions(result.data, "id", "company_name")
                        setCompanyList(data)
                        //filtering last selected company from company list
                        const lastCompany = data.filter((obj) => {
                            return obj.value == lastCompanyId;
                        })
                        //if only one company then select it without showing popup
                        if (data.length == 1) {
                            setSelectedCompany(data[0])
                            //setting last selected company if it is present
                        } else if (lastCompany.length != 0) {
                            setSelectedCompany(lastCompany)
                        } else {
                            //message popup if last company not matching  in company list
                            setIsCompanyIdEmpty(true)
                        }
                    } 
                    // else {
                    //     if (window.location.pathname !== "/manage-companies/company/0"){
                    //         setIsCompanyIdEmpty(true)
                    //     }
                    // }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    //to set selected company
    // useEffect(() => {
    //     console.log(selectedCompany);
    //     if (selectedCompany.value !== undefined) {
    //         localStorage.setItem('company_id', selectedCompany.value);
    //     }
    // }, [selectedCompany])

    const onConfirm = () => {
        window.location.reload()
        if (selectedCompany.value !== undefined) {
            setIsCompanyIdEmpty(false)
            setMessage(false)
        } else {
            setMessage(true)
        }
        if (companyList.length === 0) {
            navigate("/manage-companies/company/0")
        }
    }

    // const onCompanySelect = (e) => {
    //     if (e.value === undefined) {
    //         let company = companyList.filter(item => {return item.value === e} )
    //         console.log(company);
    //     }
    //     setSelectedCompany(e);
    //     window.location.reload();
    // }

    // Function to call Logout Api call 
    const Logout = () => {
        AXIOS.service(LogoutApiUrl, 'GET')
            .then((result) => {
                if (result.success) {
                    let lastCompanyId = localStorage.getItem('company_id')
                    localStorage.clear();
                    localStorage.setItem('auth', false)
                    localStorage.setItem('company_id', lastCompanyId)
                    setAuth(false);
                    navigate('/login');
                }
            })
    }

    //Dummy data for menu content
    const MenuData = [
        { title: 'My account', icon: '', url: '/my-account' },
        { title: 'Change company', icon: '', url: '/change-company' },
        { title: 'Change password', icon: '', url: '/change-password' },
        { title: 'Logout', icon: '', url: '', ActionFunction: Logout },
    ]

    const shortcutData = [
        { title: 'Add planning', icon: AddPlanIcon, url: '/add-planning' },
        { title: 'Add employee', icon: AddEmployeeIcon, url: '/add-employee' },
        { title: 'Add holidays', icon: AddHolidayIcon, url: '/add-holidays' },
        { title: 'Send invoices', icon: AddPlanIcon, url: '/send-incoices' },
        { title: 'Add location', icon: AddLocation, url: '/add-location' },
    ]

    const NotificationData = [
        { title: 'Laxmi planned you on 26th June', icon: '', url: '#' },
        { title: 'Your leave on 13th August is approved', icon: '', url: '#' },
        { title: 'Your contract is about to expire, please update it', icon: '', url: '#' },
        { title: 'Please stop the plan before you leave', icon: '', url: '#' },
    ]

    //Language options
    const LanguageOptions = [
        { value: 'en', label: 'EN' },
        { value: 'nl', label: 'NL' },
        { value: 'fr', label: 'FR' },
    ]

    //Function to open content box based on type
    const setContentBox = (type) => {
        if (type === 'shortcut') {
            setShortcutMenuOpen(!shortcutMenuOpen);
            setNotificationMenuOpen(false);
            setAccountMenuOpen(false);
        } else if (type === 'notification') {
            setNotificationMenuOpen(!notificationMenuOpen);
            setShortcutMenuOpen(false);
            setAccountMenuOpen(false);
        } else {
            setAccountMenuOpen(!accountMenuOpen);
            setShortcutMenuOpen(false);
            setNotificationMenuOpen(false);
        }
    }

    //List of nav icons
    const IconsList = [
        { icon: SearchIcon, url: '#', type: '' },
        { icon: DimonaIcon, url: '/dimona', type: '' },
        { icon: QuickAccessIcon, url: '#', type: 'shortcut' },
        { icon: CalendarIcon, url: '/uurrooster', type: '' },
        { icon: FAQIcon, url: '/faq', type: '' },
        { icon: NotificationIcon, url: '#', type: 'notification' },
    ]

    return (
        <section>
            {isCompanyIdEmpty && <Popup
                body={
                    // companyList.length !== 0 ?
                    <>
                        {message && <h6 className="text-danger">Please select responsible company</h6>}
                        <Dropdown
                            options={companyList}
                            selectedOptions={selectedCompany}
                            onSelectFunction={(e) => onCompanySelect(e)}
                            CustomStyle="company-dropdown"
                            styleClass=""
                            isMulti={false}
                        ></Dropdown>
                    </> 
                    // :
                    // <>
                    //     <h6 className="text-danger">No companies found</h6>
                    //     <a href="/manage-companies/company/0"><u>Create company</u></a>
                    // </>
                }
                onHide={() => setIsCompanyIdEmpty(false)}
                backdrop="static"
                title="Responsible company"
                onConfirm={() => onConfirm()}
            ></Popup>}
            <nav className="navbar navbar-expand-sm bg-white navbar-light px-4 mx-auto shadow-sm border-bottom py-3 justify-content-between">
                <div className="d-flex">
                    <div className=" align-items-center">
                        <a className="navbar-brand p-0" href="/"><img alt={t("LOGO")} className="logo" src={Logo}></img></a>
                    </div>
                    {companyList.length == 1 && <h4 className="align-items-center pt-1 pl-5 mb-0 text-color">{selectedCompany ? selectedCompany.label : companyList[0].label}</h4>}
                    {companyList.length > 1 && <div className="d-flex col-md-12">
                        <Dropdown
                            options={companyList}
                            selectedOptions={selectedCompany}
                            onSelectFunction={(e) => onCompanySelect(e)}
                            CustomStyle="col-md-12"
                            // styleClass="company-dropdown"
                            isMulti={false}
                        >
                        </Dropdown>
                    </div>}
                </div>

                <ul className="navbar-nav ">
                    {IconsList.map((val, index) => {
                        return (
                            <li key={val['icon']} className="nav-item" onClick={() => val.type !== '' ? setContentBox(val.type) : ''}>
                                <a className="navbar-brand p-0 pt-1" href={val.url}><img alt={t("NAV_ICONS")} className="header-icon" src={val.icon}></img></a>
                            </li>
                        )
                    })}
                    <li><h5 className="align-items-center pt-2 mb-0 ml-4 dark-color">{Time}</h5></li>
                    <li className="mx-3 px-2">
                        <Dropdown
                            options={LanguageOptions}
                            selectedOptions={activeLanguage}
                            onSelectFunction={(e) => {setActiveLanguage(e); localStorage.setItem('active_language', e?.value); window.location.reload();}}
                            styleClass="language-dropdown"
                        ></Dropdown>
                    </li>
                    <li><a className="navbar-brand p-0" href="#"><img alt={t("PROFILE")} className="profile-icon rounded-pill" src={DummyIcon}></img></a></li>
                    <li><h5 className="align-items-center pt-2 mb-0 dark-color">{UserName}</h5></li>
                    <li className="pt-2 pr-3 pl-2"><img alt={t("MY_ACCOUNT")} className="header-icon" src={DownArrowIcon} onClick={() => setContentBox()}></img></li>
                </ul>


                {/* Content menus for different data defined below */}
                {shortcutMenuOpen &&
                    <div className="shortcut-menu">
                        <MenuContent content={shortcutData} MenuName={t('QUICK_ACCESS')} setMenuclose={() => { setShortcutMenuOpen(!shortcutMenuOpen) }} IdName=''></MenuContent>
                    </div>
                }
                {notificationMenuOpen &&
                    <div className="notification-menu col-md-4 p-0">
                        <MenuContent content={NotificationData} MenuName={t('NOTIFICATIONS')} setMenuclose={() => { setNotificationMenuOpen(!notificationMenuOpen) }} IdName="notify-id"></MenuContent>
                    </div>
                }
                {accountMenuOpen &&
                    <div className="account-menu">
                        <MenuContent content={MenuData} MenuName='' IdName=''></MenuContent>
                    </div>
                }
            </nav>
        </section>
    )
}
