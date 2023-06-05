import React, { useState } from "react";
import DashboardIcon from "../static/icons/Dashboard.svg"
import UurroosterIcon from "../static/icons/UurroosterDark.svg"
import PlanningIcon from "../static/icons/Planning.svg"
import employeesIcon from "../static/icons/Employees.svg"
import CompaniesIcon from "../static/icons/CompanyInfo.svg"
import ConfigurationIcon from "../static/icons/Configuration.svg"
import SettingIcon from "../static/icons/Settings.svg"
import ReportingIcon from "../static/icons/Reports.svg"
import { t } from "../translations/Translation";

export default function Sidebar() {

    const [displaySidebar, setSidebardOpen] = useState(false)

    //Constant data for sidebard
    const sideBarData = [
        { title: t('DASHBOARD'), icon: DashboardIcon, url: '/' },
        { title: t('UURROOSTER'), icon: UurroosterIcon, url: '/uurrooster' },
        { title: t('MANAGE_PLANNINGS'), icon: PlanningIcon, url: '/manage-plannings' },
        { title: t('EMPLOYEES'), icon: employeesIcon, url: '/manage-employees' },
        { title: t('COMPANIES'), icon: CompaniesIcon, url: '/manage-companies' },
        { title: t('CONFIGURATIONS'), icon: ConfigurationIcon, url: '/configurations' },
        { title: t('SETTINGS'), icon: SettingIcon, url: '/settings' },
        { title: t('REPORTING'), icon: ReportingIcon, url: '/reporting' },
    ]


    return (
        <div className={"side-bar shadow" + (displaySidebar ? "" : " d-flex justify-content-center")} onMouseLeave={() => setSidebardOpen(false)} onMouseEnter={() => setSidebardOpen(true)} >
            <ul className={"" + (displaySidebar ? "side-bar shadow side-bar-open " : "no-padd")}>
                {sideBarData.map((val, index) => {
                    return (
                        <li key={val.title} title={val.title} className="d-flex my-4">
                            <img className="shortcut-icon sidebar-icon" src={val.icon}></img>{displaySidebar && <h6 className="mb-0 align-self-center pl-3 pr-5 sidebar-title">{val.title}</h6>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
