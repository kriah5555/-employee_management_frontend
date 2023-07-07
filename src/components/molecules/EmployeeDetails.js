import React, { useEffect } from "react";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"

export default function EmployeeDetails() {


    return (
        <div>
            <div className="col-md-12 row m-0 p-3">
                <img className="employee-icon rounded-circle mx-2 " src={EmployeeIcon}></img>
                <div className="col-2 px-2">
                    <p className="mb-0">Employee - 01</p>
                    <small>Employee type</small>
                </div>
                <div className="col-2 px-2">
                    <p className="mb-0">1234567890</p>
                    <p className="mb-0">employee@gmail.com</p>
                </div>
                <div className="col-2 px-2">
                    <p className="mb-0">9887428392932</p>
                </div>
            </div>
        </div>
    )
}
