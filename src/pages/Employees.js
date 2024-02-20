import React, { useState } from "react";
// import AddEmployeeIcon from "../static/icons/AddEmployee.svg"
import ExportIcon from "../static/icons/Export.svg"
import EmployeeListWithDetails from "../components/organisms/EmployeeListWithDetails";
import BackIcon from "../static/icons/BackIcon.png"
import { useNavigate, useParams } from "react-router-dom";
import { t } from "../translations/Translation";
import InviteEmployeePopup from "../components/molecules/InviteEmployeePopup"
import AddEmployee from "../static/icons/AddEmployee";
import ImportIcon from "../static/icons/Import.svg"
import InviteEmployee from "../static/icons/InviteEmployee"


export default function Employees() {

    const navigate = useNavigate();
    const params = useParams();
    const [showDetails, setShowDetails] = useState(params.id ? true : false);
    const [openPopup, setOpenPopup] = useState(false)

    const handleInvite = () => {
        setOpenPopup(true)
    }
    const onHide = () => {
        setOpenPopup(false)
    }

    return (
        <div className="right-container">
            {openPopup ? <InviteEmployeePopup onHide={onHide} setOpenPopup={setOpenPopup} openPopup={openPopup}></InviteEmployeePopup> :
                <div className="company-tab-width mt-3 border bg-white">
                    <div className="col-md-12 row mt-3 mx-0 px-0 ">
                        <div className="col-md-6 float-left">
                            <h4 className="d-flex align-items-center">{showDetails && <img className="shortcut-icon mr-2 pointer" onClick={() => { setShowDetails(false); navigate('/manage-employees') }} src={BackIcon} alt="Back"></img>}{t("EMPLOYEES_TITLE")}</h4>
                        </div>
                        <div className="col-md-6 float-right">
                            <ul className="float-right">
                                {!showDetails &&
                                    <li className="list-group d-inline add_btn" onClick={() => navigate('/add-employees')}>
                                        <AddEmployee />
                                        <span className="">{t("CREATE_EMPLOYEE")}</span>
                                    </li>}
                                <li className="list-group d-inline ml-5"><img className="header-icon" src={ImportIcon} alt={t("IMPORT")} title={t("IMPORT_EMPLOYEES")} onClick={() => navigate("/import-employees")} /></li>
                                <li className="list-group d-inline ml-3 p-0" onClick={() => handleInvite()} title={t("INVITE_EMPLOYEE")}><InviteEmployee color="#292929" /></li>
                                    {/* <img className="header-icon" src={EmailForwardersIcon} alt={t("INVITE_EMPLOYEE")} title={t("INVITE_EMPLOYEE")} /></li> */}
                                {/* <li className="list-group d-inline ml-3"><img className="header-icon" src={FilterIcon} alt={t("FILTER")} title={t("FILTER")} /></li> */}
                                <li className="list-group d-inline ml-3"><img className="header-icon" src={ExportIcon} alt={t("EXPORT")} title={t("EXPORT")} /></li>
                            </ul>
                        </div>
                    </div>
                    <EmployeeListWithDetails setShowDetails={setShowDetails} showDetails={showDetails}></EmployeeListWithDetails>
                </div>}
        </div>

    )
}
