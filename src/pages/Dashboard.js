import React from "react";
import Card from "../components/atoms/Card";
import PlanningIcon from "../static/icons/PlanningWhite.svg";
import AddEmployeeIcon from "../static/icons/AddEmployeeWhite.svg";
import DimonaIcon from "../static/icons/DimonaWhite.svg";
import UurrosterIcon from "../static/icons/Uurrooster.svg";
import EmployeeAvailabilityIcon from "../static/icons/EmployeeAvailability.svg";
import QRCode from "../static/icons/QRCode.svg";
import HolidaysIcon from "../static/icons/ManageHoliday.svg";
import DeviceIcon from "../static/icons/DeviceActivate.svg";
import Messageboard from "../components/molecules/Messageboard";
import { t } from "../translations/Translation";


export default function Dashboard() {

    const mainTabStyle = "col-md-4 my-3 mx-3 background-indii-blue text-center text-white";
    const subTabStyle = "col-md-3 my-3 mx-3 shadow text-center border-0";

    // Dashboard content
    const dashboardTabs = [
        { title:t('PLANNING'),        icon:PlanningIcon,             styleClass:mainTabStyle },
        { title:t('TIME_TABLE'),      icon:UurrosterIcon,            styleClass:subTabStyle },
        { title:t('AVAILABILITY'),    icon:EmployeeAvailabilityIcon, styleClass:subTabStyle },
        { title:t('NEW_EMPLOYEE'),    icon:AddEmployeeIcon,          styleClass:mainTabStyle },
        { title:t('QRCODE'),          icon:QRCode,                   styleClass:subTabStyle },
        { title:t('HOLIDAY'),         icon:HolidaysIcon,             styleClass:subTabStyle },
        { title:t('DIMONA'),          icon:DimonaIcon,               styleClass:mainTabStyle },
        { title:t('DEVICE_ACTIVATE'), icon:DeviceIcon,               styleClass:subTabStyle },
    ]

    // Messages to display in message board (API will be called to fetch this data)
    const messages = [
        {message: "Happy New Year!!",   styleClass:"indii-message text-blue"},
        {message: "Don't forget to check who can work as flex next quarter.",   styleClass:"indii-message text-blue"},
        {message: "Dimona failure code 00000-000 server government offline.",   styleClass:"dimona-message text-red"},
        {message: "Dimona failure code 90378-460 Laatijdige aangifte.",   styleClass:"dimona-message text-red"},
        {message: "Dimona failure code 00024-003 Ongeldig rijkregisternummer.",   styleClass:"dimona-message text-red"},
        {message: "Dimona failure code 00024-003 Ongeldig rijkregisternummer.",   styleClass:"dimona-message text-red"},
        {message: "Leon can't work tomorrow because of illness.",   styleClass:"employee-message text-green"},
        {message: "Leon has applied for a holiday from December 1st till December 31st.",   styleClass:"employee-message text-green"},
    ]


    return (
        <div className="right-container bg-white">
            <div className="col-md-9 d-inline-flex mb-0 mt-2 mb-5 pt-1 flex-wrap">
                {
                    dashboardTabs.map((val, index) => {
                        return (
                            <Card key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass}></Card>
                        )
                    })
                }
            </div>
            <Messageboard Messages={messages}></Messageboard>
        </div>
    )
}
