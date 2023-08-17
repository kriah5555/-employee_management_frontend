import React, { useEffect, useState } from "react"
import Logo from "../static/icons/Logo.png"
import SearchIcon from "../static/icons/Search.svg"
import DimonaIcon from "../static/icons/Dimona.svg"
import QuickAccessIcon from "../static/icons/QuickAccess.svg"
import CalendarIcon from "../static/icons/Calendar.svg"
import FAQIcon from "../static/icons/FAQ.svg"
import NotificationIcon from "../static/icons/Notification.svg"
import DummyIcon from "../static/icons/dummy.png"
import MenuContent from "../components/atoms/MenuContent"
import Dropdown from "../components/atoms/Dropdown"
import AddPlanIcon from "../static/icons/Uurrooster.svg"
import AddEmployeeIcon from "../static/icons/AddEmployee.svg"
import AddHolidayIcon from "../static/icons/ManageHoliday.svg"
import AddLocation from "../static/icons/AddLocation.svg"
import DownArrowIcon from "../static/icons/arrow.png"
import {t} from "../translations/Translation"

import { APICALL as AXIOS } from "../services/AxiosServices";
import { LogoutApiUrl } from "../routes/ApiEndPoints";
import { useNavigate } from "react-router-dom"
 
export default function Header({setAuth}) {

    const Company = "Company 01";
    const UserName = localStorage.getItem('name');
    const [Time, setTime] = useState(new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit'}));
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState({value:'en', label:'EN'})
    const [shortcutMenuOpen, setShortcutMenuOpen] = useState(false);
    const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        //Implementing the setInterval method for displaying current belgium time
        const interval = setInterval(() => {
            let current_time = new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit'})
            setTime(current_time);
        }, 100);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [Time]);

    // Function to call Logout Api call 
    const Logout = () => {
        AXIOS.service(LogoutApiUrl, 'GET')
        .then((result) => {
            if (result.success) {
                localStorage.clear();
                localStorage.setItem('auth', false)
                setAuth(false);
                navigate('/login');
            }
        })
    }

    //Dummy data for menu content
    const MenuData = [
        {title: 'My account', icon: '', url: '/my-account'},
        {title: 'Change company', icon: '', url: '/change-company'},
        {title: 'Change password', icon: '', url: '/change-password'},
        {title: 'Logout', icon: '', url: '', ActionFunction:Logout},
    ]

    const shortcutData = [
        {title: 'Add planning', icon: AddPlanIcon, url: '/add-planning'},
        {title: 'Add employee', icon: AddEmployeeIcon, url: '/add-employee'},
        {title: 'Add holidays', icon: AddHolidayIcon, url: '/add-holidays'},
        {title: 'Send invoices',icon: AddPlanIcon, url: '/send-incoices'},
        {title: 'Add location', icon: AddLocation, url: '/add-location'},
    ]

    const NotificationData = [
        {title: 'Laxmi planned you on 26th June', icon: '', url: '#'},
        {title: 'Your leave on 13th August is approved', icon: '', url: '#'},
        {title: 'Your contract is about to expire, please update it', icon: '', url: '#'},
        {title: 'Please stop the plan before you leave',icon: '', url: '#'},
    ]

    //Language options
    const LanguageOptions = [
        {value: 'en' , label: 'EN'},
        {value: 'nl' , label: 'NL'},
        {value: 'fr' , label: 'FR'},
    ]

    //Function to open content box based on type
    const setContentBox = (type) => {
        if (type === 'shortcut'){
            setShortcutMenuOpen(!shortcutMenuOpen);
            setNotificationMenuOpen(false);
            setAccountMenuOpen(false);
        }else if (type === 'notification'){
            setNotificationMenuOpen(!notificationMenuOpen);
            setShortcutMenuOpen(false);
            setAccountMenuOpen(false);
        }else{
            setAccountMenuOpen(!accountMenuOpen);
            setShortcutMenuOpen(false);
            setNotificationMenuOpen(false);
        }
    }

    //List of nav icons
    const IconsList = [
        {icon : SearchIcon, url:'#', type:''},
        {icon : DimonaIcon, url:'/dimona', type:''},
        {icon : QuickAccessIcon, url:'#', type:'shortcut'},
        {icon : CalendarIcon, url:'/uurrooster', type:''},
        {icon : FAQIcon, url:'/faq', type:''},
        {icon : NotificationIcon, url:'#', type:'notification'},
    ]
    
    return (
        <section>
            <nav className="navbar navbar-expand-sm bg-white navbar-light px-4 mx-auto shadow-sm border-bottom py-3 justify-content-between">
                <div className="d-flex">
                    <div className=" align-items-center">
                        <a className="navbar-brand p-0" href="/"><img alt={t("LOGO")} className="logo" src={Logo}></img></a>
                    </div>
                    <h4 className="align-items-center pt-1 pl-5 mb-0 text-color">{Company}</h4>
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
                            onSelectFunction={(e) => setActiveLanguage(e)}
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
                        <MenuContent content={shortcutData} MenuName={t('QUICK_ACCESS')} setMenuclose={() => {setShortcutMenuOpen(!shortcutMenuOpen)}} IdName=''></MenuContent>
                    </div>
                }
                {notificationMenuOpen && 
                    <div className="notification-menu col-md-4 p-0">
                        <MenuContent content={NotificationData} MenuName={t('NOTIFICATIONS')} setMenuclose={() => {setNotificationMenuOpen(!notificationMenuOpen)}} IdName="notify-id"></MenuContent>
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
