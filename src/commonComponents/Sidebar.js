import React, { useState } from "react";
import DashboardIcon from "../static/icons/Dashboard.svg"
import UurroosterIcon from "../static/icons/UurroosterDark.svg"
import PlanningIcon from "../static/icons/Planning.svg"
import employeesIcon from "../static/icons/Employees.svg"
import CompaniesIcon from "../static/icons/CompanyInfo.svg"
import ConfigurationIcon from "../static/icons/Configuration.svg"
import SettingIcon from "../static/icons/Settings.svg"
import ReportingIcon from "../static/icons/Reports.svg"

export default function Sidebar() {

    const [displaySidebar, setSidebardOpen] = useState(false)

    const sideBarData = [
        {title: 'Dashboard', icon: DashboardIcon, url: '/'},
        {title: 'Uurrooster', icon: UurroosterIcon, url: '/uurrooster'},
        {title: 'Manage plannings', icon: PlanningIcon, url: '/manage-plannings'},
        {title: 'Manage employees',icon: employeesIcon, url: '/manage-employees'},
        {title: 'Manage companies', icon: CompaniesIcon, url: '/manage-companies'},
        {title: 'Configurations', icon: ConfigurationIcon, url: '/configurations'},
        {title: 'Settings', icon: SettingIcon, url: '/settings'},
        {title: 'Reporting overview', icon: ReportingIcon, url: '/reporting'},
    ]


    return (
        <div className={"side-bar shadow" + (displaySidebar ? "" : " d-flex justify-content-center")} onMouseLeave={() => setSidebardOpen(false)} onMouseEnter={() => setSidebardOpen(true)} >
            <ul className={"" + (displaySidebar ? "side-bar shadow side-bar-open " : "no-padd")}>
                {sideBarData.map((val, index)=>{
                    return (
                        <li key={val.title} title={val.title} className="d-flex my-4">
                            <img className="shortcut-icon sidebar-icon" src={val.icon}></img>{displaySidebar && <h6 className="mb-0 align-self-center px-3 sidebar-title">{val.title}</h6>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
