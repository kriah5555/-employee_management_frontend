import React from "react";
import Card from "../components/atoms/Card";
// import PlanningIcon from "../static/icons/PlanningWhite.svg";
// import AddEmployeeIcon from "../static/icons/AddEmployeeWhite.svg";
// import DimonaIcon from "../static/icons/DimonaWhite.svg";
// import UurrosterIcon from "../static/icons/Uurrooster.svg";
// import EmployeeAvailabilityIcon from "../static/icons/EmployeeAvailability.svg";
// import QRCode from "../static/icons/QRCode.svg";
// import HolidaysIcon from "../static/icons/ManageHoliday.svg";
// import DeviceIcon from "../static/icons/DeviceActivate.svg";
import Messageboard from "../components/molecules/Messageboard";
import { t } from "../translations/Translation";
// import Uurrooster from "./Uurrooster";
import { useNavigate } from "react-router-dom";
import PlanningWhite from "../static/icons/PlanningWhite";
import Uurrooster from "../static/icons/Uurrooster";
import EmployeeAvailability from "../static/icons/EmployeeAvailability";
import AddEmployeeWhite from "../static/icons/AddEmployeeWhite";
import QRCode from "../static/icons/QRCode";
import ManageHoliday from "../static/icons/ManageHoliday";
import DimonaWhite from "../static/icons/DimonaWhite";
import DeviceActivate from "../static/icons/DeviceActivate";
import InviteEmployee from "../static/icons/InviteEmployee"
import InviteEmployeePopup from "../components/molecules/InviteEmployeePopup";
import { ToastContainer } from "react-toastify";


export default function Dashboard() {

    const navigate = useNavigate();
    const mainTabStyle = "col-md-4 my-3 mx-3 background-indii-blue text-center text-white";
    const subTabStyle = "col-md-3 my-3 mx-3 shadow text-center border-0";

    // Dashboard content
    const dashboardTabs = [
        { title: t('PLANNING'), icon: <PlanningWhite />, styleClass: mainTabStyle, actionLink: "/manage-plannings" },
        { title: t('TIME_TABLE'), icon: <Uurrooster />, styleClass: subTabStyle, actionLink: "/uurrooster" },
        { title: t('AVAILABILITY'), icon:<EmployeeAvailability/>, styleClass: subTabStyle, actionLink: "/manage-employees#employee_availability" },
        { title: t('NEW_EMPLOYEE'), icon: <AddEmployeeWhite/>, styleClass: mainTabStyle, actionLink: "/add-employees" },
        { title: t('QRCODE'), icon: <QRCode/>, styleClass: subTabStyle, actionLink: "" },
        { title: t('HOLIDAY'), icon: <ManageHoliday/>, styleClass: subTabStyle, actionLink: "/manage-plannings#holiday" },
        { title: t('DIMONA'), icon: <DimonaWhite color={"#fff"}/>, styleClass: mainTabStyle, actionLink: "/manage-plannings#dimona" },
        { title: t('DEVICE_ACTIVATE'), icon: <DeviceActivate/>, styleClass: subTabStyle, actionLink: "" },
        { title: t('INVITE_EMPLOYEE'), icon: <InviteEmployee color="#073763" />, styleClass: subTabStyle, actionLink: "#invite" },
    ]

    // Messages to display in message board (API will be called to fetch this data)
    const messages = [
        { message: "Happy New Year!!", styleClass: "indii-message text-blue" },
        { message: "Don't forget to check who can work as flex next quarter.", styleClass: "indii-message text-blue" },
        { message: "Dimona failure code 00000-000 server government offline.", styleClass: "dimona-message text-red" },
        { message: "Dimona failure code 90378-460 Laatijdige aangifte.", styleClass: "dimona-message text-red" },
        { message: "Dimona failure code 00024-003 Ongeldig rijkregisternummer.", styleClass: "dimona-message text-red" },
        { message: "Dimona failure code 00024-003 Ongeldig rijkregisternummer.", styleClass: "dimona-message text-red" },
        { message: "Leon can't work tomorrow because of illness.", styleClass: "employee-message text-green" },
        { message: "Leon has applied for a holiday from December 1st till December 31st.", styleClass: "employee-message text-green" },
    ]


    return (
        <div className="right-container bg-white">
            {window.location.hash === '#invite' && <InviteEmployeePopup onHide={() => window.location.hash = ''}></InviteEmployeePopup>}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="col-md-9 d-inline-flex mb-0 mt-2 pt-1 flex-wrap dashboard_height">  {/* mb-5 */}
                {
                    dashboardTabs.map((val, index) => {
                        return (
                            <Card key={val.title} title={val.title} icon={val.icon} actionLink={val.actionLink} styleClass={val.styleClass} view={'dashboard'}></Card>
                        )
                    })
                }
            </div>
            <Messageboard Messages={messages}></Messageboard>
        </div>
    )
}
