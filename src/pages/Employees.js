import React, { useState } from "react";
import AddEmployeeIcon from "../static/icons/AddEmployee.svg"
import EmailForwardersIcon from "../static/icons/EmailForwarders.svg"
import FilterIcon from "../static/icons/Filter.svg"
import ExportIcon from "../static/icons/Export.svg"
import EmployeeListWithDetails from "../components/organisms/EmployeeListWithDetails";
import BackIcon from "../static/icons/BackIcon.png"
import { useNavigate } from "react-router-dom";
import { t } from "../translations/Translation";

export default function Employees() {

    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <div className="col-md-12 row mt-3 mx-0 px-0 ">
                    <div className="col-md-6 float-left">
                        <h4 className="d-flex align-items-center">{showDetails && <img className="shortcut-icon mr-2 pointer" onClick={() => setShowDetails(false)} src={BackIcon}></img>}{t("EMPLOYEES_TITLE")}</h4>
                    </div>
                    <div className="col-md-6 float-right">
                        <ul className="float-right">
                            {!showDetails &&
                                <li className="list-group d-inline" onClick={() => navigate('/add-employees')}>
                                    <img className="header-icon mr-1 pr-1" src={AddEmployeeIcon}></img>
                                    <u>{t("CREATE_EMPLOYEE")}</u>
                                </li>}
                            <li className="list-group d-inline ml-5"><img className="header-icon " src={EmailForwardersIcon} alt={t("EMAIL_FORWARD")} title={t("EMAIL_FORWARD")} /></li>
                            <li className="list-group d-inline ml-3"><img className="header-icon " src={FilterIcon} alt={t("FILTER")} title={t("FILTER")}/></li>
                            <li className="list-group d-inline ml-3"><img className="header-icon " src={ExportIcon} alt={t("EXPORT")} title={t("EXPORT")} /></li>
                        </ul>
                    </div>
                </div>
                <EmployeeListWithDetails setShowDetails={setShowDetails} showDetails={showDetails}></EmployeeListWithDetails>
            </div>
        </div>

    )
}
