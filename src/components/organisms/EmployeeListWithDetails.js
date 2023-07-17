import React from "react";
import EmployeesOverview from "../molecules/EmployeesOverview";
import EmployeeDetails from "../molecules/EmployeeDetails";

export default function EmployeeListWithDetails({ showDetails, setShowDetails }) {

    return (
        <div className="row m-0">
            <div className={showDetails ? "col-md-2 px-0 tablescroll" : "col-md-12 px-0 tablescroll"}>
                <EmployeesOverview setShowDetails={setShowDetails} showDetails={showDetails}></EmployeesOverview>
            </div>
            {showDetails &&
                <div className="col-md-10 px-0 border">
                    <EmployeeDetails ></EmployeeDetails>
                </div>
            }
        </div>

    )
}
