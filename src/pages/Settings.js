import React, { useState } from "react";
import EmployeeTypeIcon from "../static/icons/EmployeeType.png";
import NotificationIcon from "../static/icons/notifications.png";
import ConfigurationIcon from "../static/icons/setting.png";
import { t } from "../translations/Translation";
import ConfigurationOverviews from "../components/molecules/ConfigurationOverviews";

export default function Settings() {

    const subTabStyle = "col-md-3 my-3 mx-3 shadow text-center border-0";

    const [overviewContent, setOverviewContent] = useState('employee_type')

    // Dashboard content
    // const settingTabs = [
    //     { title: t('ADD_FUNCTION'), icon: FunctionsIcon, styleClass: subTabStyle, url: '/add-function' },
    //     { title: t('ADD_EMPLOYEE_TYPE'), icon: EmployeeTypeIcon, styleClass: subTabStyle, url: '/add-employee-type' },
    //     { title: t('ADD_SECTOR'), icon: SectorIcon, styleClass: subTabStyle, url: '/add-sector' }
    // ]
    // return (
    //     <div className="right-container d-inline">
    //         <h2 className="text-center mt-4">Settings</h2>
    //         <div className="col-md-12 mx-auto d-inline-flex mt-3 pt-1 flex-wrap justify-content-center">
    //             {
    //                 settingTabs.map((val, index) => {
    //                     return (
    //                         <Card key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={val.url}></Card>
    //                     )
    //                 })
    //             }
    //         </div>
    //     </div>
    // )


    const settingTabs = [
        { title: t('EMPLOYEE_TYPES'), icon: EmployeeTypeIcon, styleClass: subTabStyle, url: '/add-employee-type', type: 'employee_type' },
        { title: t('SECTORS'), icon: ConfigurationIcon, styleClass: subTabStyle, url: '/add-sector', type: 'sectors' },
        { title: t('FUNCTIONS'), icon: ConfigurationIcon, styleClass: subTabStyle, url: '/add-function', type: 'functions' },
        { title: t('GROUP_FUNCTIONS'), icon: ConfigurationIcon, styleClass: subTabStyle, url: '/add-sector', type: 'group_functions' },
        { title: t('MIN_SALARY'), icon: ConfigurationIcon, styleClass: subTabStyle, url: '/add-sector', type: 'min_salary' },
        { title: t('NOTIFICATIONS'), icon: NotificationIcon, styleClass: subTabStyle, url: '/notifications', type: 'notifications' },
    ]


    return (
        <div className="right-container p-3" >
            <div className="col-md-3 bg-white border-right">
                <h2 className="text-center my-4 text-color">Configurations</h2>
                <ul className="p-0 mt-2">
                    {
                        settingTabs.map((val) => {
                            return (
                                <li
                                    key={val.title}
                                    className="list-group-item border-bottom-only"
                                    id={overviewContent === val.type ? "text-indii-dark-blue" : ''}
                                    onClick={() => setOverviewContent(val.type)}>
                                    <img className="shortcut-icon" src={val.icon}></img>
                                    {val.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="col-md-9 bg-white">
                <div><ConfigurationOverviews overviewContent={overviewContent}></ConfigurationOverviews></div>
            </div>
        </div>
    )
}
