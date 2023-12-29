import React, { useState } from "react";
import EmployeesOverview from "../molecules/EmployeesOverview";
import EmployeeDetails from "../molecules/EmployeeDetails";
import ViewOpenShiftDetails from "../molecules/ViewOpenShiftDetails";
import OpenShiftOverview from "./OpenShiftOverview";

export default function OpenShiftListWithDetails({ shiftId, setShiftId, setShowDetails, showDetails }) {

    return (
        <div className="row m-0">
            <div className={showDetails ? "col-md-2 px-0 tablescroll" : "col-md-12 px-0 tablescroll"}>
                <OpenShiftOverview setShowDetails={setShowDetails} showDetails={showDetails} shiftId={shiftId} setShiftId={setShiftId} ></OpenShiftOverview>
            </div>
            {showDetails &&
                <div className="col-md-10 px-0 border">
                    <ViewOpenShiftDetails shiftId={shiftId} setShowDetails={setShowDetails} ></ViewOpenShiftDetails>
                </div>
            }
        </div>

    )
}
