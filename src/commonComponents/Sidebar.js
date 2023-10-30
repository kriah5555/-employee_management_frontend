import React, { useState } from "react";
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

    let params = useParams();
    const navigate = useNavigate();
    let location = useLocation();

    //Constant data for sidebard
    const sideBarData = [

        { title: t('DASHBOARD'), icon: (location.pathname === '/' ? ActiveDashboardIcon : DashboardIcon), url: '/' },
        { title: t('UURROOSTER'), icon: (location.pathname === '/uurrooster' ? ActiveUurrosterIcon : UurroosterIcon), url: '/uurrooster' },
        { title: t('MANAGE_PLANNINGS'), icon: (location.pathname === '/manage-plannings' ? ActivePlanningIcon : PlanningIcon), url: '/manage-plannings' },
        { title: t('EMPLOYEES'), icon: (location.pathname === '/manage-employees' ? ActiveEmployeesIcon : EmployeesIcon), url: '/manage-employees' },
        { title: t('COMPANIES'), icon: (location.pathname === '/manage-companies' ? ActiveCompaniesIcon : CompaniesIcon), url: '/manage-companies' },
        { title: t('CONFIGURATIONS'), icon: (location.pathname === '/configurations' ? ActiveConfigurationIcon : ConfigurationIcon), url: '/configurations' },
        { title: t('SETTINGS'), icon: (location.pathname === '/settings' ? ActiveSettingIcon : SettingIcon), url: '/settings' },
        { title: t('REPORTING'), icon: ReportingIcon, url: '/reporting' },
    ]


    return (
        <div className={"side-bar shadow border-right" + (displaySidebar ? " side-bar-open" : " d-flex justify-content-center")} > {/* onMouseLeave={() => setSidebardOpen(false)} onMouseEnter={() => setSidebardOpen(true)} */}
            <ul className={displaySidebar ? "side-bar shadow" : "no-padd"}>
                <li className="d-flex my-4" onClick={() => setSidebardOpen(!displaySidebar)}>
                    <img className="shortcut-icon sidebar-icon" src={HamburgerIcon}></img>
                </li>
                {sideBarData.map((val, index) => {
                    return (
                        <li key={val.title} title={val.title} className="d-flex my-4" onClick={() => navigate(val.url)}>
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
