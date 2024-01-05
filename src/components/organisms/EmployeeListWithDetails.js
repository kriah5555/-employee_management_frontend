import React, { useState } from "react";
import EmployeesOverview from "../molecules/EmployeesOverview";
import EmployeeDetails from "../molecules/EmployeeDetails";
import { useParams } from "react-router-dom";

export default function EmployeeListWithDetails({ showDetails, setShowDetails }) {

    const params = useParams();
    const [eid, setEid] = useState(params.id ? params.id : '');

    return (
        <div className="row m-0">
            <div className={showDetails ? "col-md-2 px-0 tablescroll manage_employee_left_block" : "col-md-12 px-0 tablescroll"}>
                <EmployeesOverview setShowDetails={setShowDetails} showDetails={showDetails} eid={eid} setEid={setEid} ></EmployeesOverview>
            </div>
            {showDetails &&
                <div className="col-md-10 px-0 border">
                    <EmployeeDetails eid={eid}></EmployeeDetails>
                </div>
            }
        </div>

    )
}
