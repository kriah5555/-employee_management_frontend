import React, { useState } from "react";
import AddEmployeeIcon from "../static/icons/AddEmployee.svg"
import EmailForwardersIcon from "../static/icons/EmailForwarders.svg"
import FilterIcon from "../static/icons/Filter.svg"
import ExportIcon from "../static/icons/Export.svg"
import EmployeeListWithDetails from "../components/organisms/EmployeeListWithDetails";
import BackIcon from "../static/icons/BackIcon.png"
import { useNavigate } from "react-router-dom";
export default function Employees() {

    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <div className="col-md-12 row mt-3 mx-0 px-0 ">
                    <div className="col-md-6 float-left">
                        <h4>{showDetails && <img className="shortcut-icon mr-2 mb-1" onClick={() => setShowDetails(false)} src={BackIcon}></img>}Employees</h4>
                    </div>
                    <div className="col-md-6 float-right">
                        <ul className="float-right">
                            {!showDetails &&
                                <li className="list-group d-inline" onClick={() => navigate('/add-employees')}>
                                    <img className="header-icon mr-1 pr-1" src={AddEmployeeIcon}></img>
                                    <u>Create employee</u>
                                </li>}
                            <li className="list-group d-inline ml-5"><img className="header-icon " src={EmailForwardersIcon}></img></li>
                            <li className="list-group d-inline ml-3"><img className="header-icon " src={FilterIcon}></img></li>
                            <li className="list-group d-inline ml-3"><img className="header-icon " src={ExportIcon}></img></li>
                        </ul>
                    </div>
                </div>
                <EmployeeListWithDetails setShowDetails={setShowDetails} showDetails={showDetails}></EmployeeListWithDetails>
            </div>
        </div>

    )
}
