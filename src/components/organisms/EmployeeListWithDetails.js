import React, { useEffect, useState } from "react";
import EmployeesOverview from "../molecules/EmployeesOverview";
import EmployeeDetails from "../molecules/EmployeeDetails";
import { useParams } from "react-router-dom";

export default function EmployeeListWithDetails({ showDetails, setShowDetails }) {

    const params = useParams();
    const [eid, setEid] = useState(params.id ? params.id : '');
    const [firstEmployeeId, setFirstEmployeeId] = useState('');

    useEffect(() => {
        let hash = window.location.hash
        if (hash === '#employee_availability') {
            // setTabIndex(4);
            setShowDetails(true);
            setEid(firstEmployeeId)
        }
        // if (firstEmployeeId) {
        //     window.location.hash = ''
        // }
    }, [firstEmployeeId, eid])

    return (
        <div className="row m-0">
            <div className={showDetails ? "col-md-2 px-0 tablescroll manage_employee_left_block" : "col-md-12 px-0 tablescroll"}>
                <EmployeesOverview setShowDetails={setShowDetails} showDetails={showDetails} eid={eid} setEid={setEid} setFirstEmployeeId={setFirstEmployeeId}></EmployeesOverview>
            </div>
            {showDetails &&
                <div className="col-md-10 px-0 border">
                    <EmployeeDetails eid={eid ? eid : firstEmployeeId} setShowEmployeeDetails={setShowDetails} showDetails={showDetails} setEid={setEid} firstEmployeeId={firstEmployeeId} ></EmployeeDetails>
                </div>
            }
        </div>

    )
}
