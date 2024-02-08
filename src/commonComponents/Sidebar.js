import React, { useEffect, useState } from "react";
import DashboardIcon from "../static/icons/Dashboard.svg"
import UurroosterIcon from "../static/icons/UurroosterDark.svg"
import PlanningIcon from "../static/icons/Planning.svg"
import EmployeesIcon from "../static/icons/Employees.svg"
import CompaniesIcon from "../static/icons/Company.png"
import ConfigurationIcon from "../static/icons/Configuration.svg"
import SettingIcon from "../static/icons/Settings.svg"
import ReportingIcon from "../static/icons/Reports.svg"
import HamburgerIcon from "../static/icons/Hamburger.svg"
import { t } from "../translations/Translation";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ActiveDashboardIcon from "../static/icons/DashboardActive.svg"
import ActiveUurrosterIcon from "../static/icons/UurroosterActive.svg"
import ActivePlanningIcon from "../static/icons/PlanningActive.svg"
import ActiveEmployeesIcon from "../static/icons/EmployeesActive.svg"
import ActiveCompaniesIcon from "../static/icons/CompanyActive.png"
import ActiveConfigurationIcon from "../static/icons/ConfigurationActive.svg"
import ActiveSettingIcon from "../static/icons/SettingsActive.svg"


export default function Sidebar() {

    const [displaySidebar, setSidebardOpen] = useState(false)
    const [sideBarData, setSideBarData] = useState([])
    const [activeIcon, setActiveIcon] = useState('')

    let params = useParams();
    const navigate = useNavigate();
    let location = useLocation();
    let selectedCompany = localStorage.getItem('company_id');

    //Constant data for sidebard
    const sideBarFullData = [

        { title: t('DASHBOARD'), icon: (location.pathname === '/' || activeIcon == t('DASHBOARD') ? ActiveDashboardIcon : DashboardIcon), url: '/' },
        { title: t('UURROOSTER'), icon: (location.pathname === '/uurrooster' || activeIcon == t('UURROOSTER') ? ActiveUurrosterIcon : UurroosterIcon), url: '/uurrooster' },
        { title: t('MANAGE_PLANNINGS'), icon: (location.pathname === '/manage-plannings' || activeIcon == t('MANAGE_PLANNINGS') ? ActivePlanningIcon : PlanningIcon), url: '/manage-plannings' },
        { title: t('EMPLOYEES'), icon: (location.pathname === '/manage-employees' || activeIcon == t('EMPLOYEES') ? ActiveEmployeesIcon : EmployeesIcon), url: '/manage-employees' },
        { title: t('COMPANIES'), icon: (location.pathname === '/manage-companies' || activeIcon == t('COMPANIES') ? ActiveCompaniesIcon : CompaniesIcon), url: '/manage-companies' },
        { title: t('CONFIGURATIONS'), icon: (location.pathname === '/configurations' || activeIcon == t('CONFIGURATIONS') ? ActiveConfigurationIcon : ConfigurationIcon), url: '/configurations' },
        { title: t('SETTINGS'), icon: (location.pathname === '/settings' || activeIcon == t('SETTINGS') ? ActiveSettingIcon : SettingIcon), url: '/settings' },
        { title: t('REPORTING'), icon: ReportingIcon, url: '/reporting' },
    ]
    const noCompanySideBar = [
        { title: t('DASHBOARD'), icon: (location.pathname === '/' || activeIcon == t('DASHBOARD') ? ActiveDashboardIcon : DashboardIcon), url: '/' },
        { title: t('COMPANIES'), icon: (location.pathname === '/manage-companies' || activeIcon == t('COMPANIES') ? ActiveCompaniesIcon : CompaniesIcon), url: '/manage-companies' },
        { title: t('CONFIGURATIONS'), icon: (location.pathname === '/configurations' || activeIcon == t('CONFIGURATIONS') ? ActiveConfigurationIcon : ConfigurationIcon), url: '/configurations' },
        { title: t('SETTINGS'), icon: (location.pathname === '/settings' || activeIcon == t('SETTINGS') ? ActiveSettingIcon : SettingIcon), url: '/settings' },
        { title: t('REPORTING'), icon: ReportingIcon, url: '/reporting' },
    ]

    useEffect(() => {
        if (selectedCompany) {
            setSideBarData(sideBarFullData)
        } else {
            setSideBarData(noCompanySideBar)
        }
        //setting active icon in local storage when navigated through browser buttons
        let path = location.pathname
        switch (path) {
            case '/': localStorage.setItem("activeIcon", t('DASHBOARD')); break;
            case '/uurrooster': localStorage.setItem("activeIcon", t('UURROOSTER')); break;
            case '/manage-plannings': localStorage.setItem("activeIcon", t('MANAGE_PLANNINGS')); break;
            case '/manage-employees': localStorage.setItem("activeIcon", t('EMPLOYEES')); break;
            case '/manage-companies': localStorage.setItem("activeIcon", t('COMPANIES')); break;
            case '/configurations': localStorage.setItem("activeIcon", t('CONFIGURATIONS')); break;
            case '/settings': localStorage.setItem("activeIcon", t('SETTINGS')); break;
            case '/reporting': localStorage.setItem("activeIcon", t('REPORTING')); break;
        }
        //setting activeIcon
        setActiveIcon(localStorage.getItem('activeIcon'))
    }, [localStorage.getItem('company_id'), activeIcon, location.pathname])


    const handleClick = (url, title,) => {
        navigate(url);
        setActiveIcon(title);
        setSidebardOpen(false)
        localStorage.setItem('activeIcon', title)
        if (url === '/manage-companies') {window.location.reload();}
    }

    return (
        <div className={"side-bar shadow border-right" + (displaySidebar ? " side-bar-open" : " d-flex justify-content-center")} > {/* onMouseLeave={() => setSidebardOpen(false)} onMouseEnter={() => setSidebardOpen(true)} */}
            <ul className={displaySidebar ? "side-bar shadow" : "no-padd"}>
                <li className="d-flex py-4" onClick={() => setSidebardOpen(!displaySidebar)}>
                    <img className="shortcut-icon sidebar-icon" src={HamburgerIcon}></img>
                </li>
                {sideBarData.map((val, index) => {
                    return (
                        <li key={val.title} title={val.title} className="d-flex my-4" onClick={() => handleClick(val.url, val.title)}>
                            <img className="shortcut-icon sidebar-icon" src={val.icon}></img>
                            {displaySidebar &&
                                <h6 className="mb-0 align-self-center pl-3 pr-2 sidebar-title" id={location.pathname === val.url ? "text-indii-blue" : ''} >{val.title}</h6>
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
