import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import EditIcon from "../../static/icons/edit-dark.svg"
import CustomButton from "../atoms/CustomButton";

export default function UpdateEmployeeContractDetailsForm({ data, edit, employeeContractOptions, setEditStatus, setToggleOpen }) {
    console.log(employeeContractOptions);
    const [formData, setFormData] = useState({})
    const [employeeTypeList, setEmployeeTypeList] = useState([])
    const [employeeType, setEmployeeType] = useState("")
    const [subTypeList, setSubTypeList] = useState([])
    const [subType, setSubType] = useState("")
    const [functionList, setFunctionList] = useState([])
    const [functionName, setFunctionName] = useState("")
    const [showData, setShowData] = useState(true)
    const [editFunction, setEditFunction] = useState(false)
    const [cardNumber, setCardNumber] = useState("")

    let commonData = [
        { label: "Employee type", value: data.employee_type },
        { label: "Sub type", value: data.sub_type },
        { label: "Start Date", value: data.start_date },
        { label: "end date", value: data.end_date },
        { label: "Weekly contract hours", value: data.weekly_contract_hours },
        { label: "Work days per week", value: data.work_days_per_week }
    ]

    let otherData = [
        { label: "Function_name", value: data.Function_name },
        { label: "Minimum salary", value: data.minimum_salary },
        { label: "Salary to be paid", value: data.salary_to_be_paid },
    ]

    let functionData = data.functions

    const setValues = () => {

    }

    const onSave = () => {

    }

    let commonDataFieldsArray = [
        { title: "Employee Type", name: "employee_type", type: "dropdown", options: employeeTypeList, selectedOptions: employeeType, required: true, isDisabled:true, style: "col-md-6 float-left" },
        { title: "Sub Type", name: "sub_type", type: "dropdown", options: employeeTypeList, selectedOptions: employeeType, required: true, isDisabled:true, style: "col-md-6 float-left mt-2" },
        { title: "Start date", name: "start_date", type: "date", disabled: true, style: "col-md-6 float-left  mt-2" },
        { title: "End date", name: "employee_type", type: "date", style: "col-md-6 float-left mt-2" },
        { title: "Weekly contract hours", name: "weekly_hours", type: "text", style: "col-md-6 float-left mt-2" },
        { title: "Work days per week", name: "work_days_per_week", type: "text", style: "col-md-6 float-left mt-2" },
    ]

    let otherDataFieldsArray = [
        { title: "Function name", name: "function_name", type: "dropdown", options: functionList, selectedOptions: functionName, required: true, style: "col-md-12 p-0" },
        { title: "Minimum salary", name: "minimum_salary", type: "text", style: "col-md-12 p-0 float-right mt-2" },
        { title: "Salary to be paid", name: "paid_salary", type: "text", style: "col-md-12 p-0 float-right mt-2" },
    ]
    return (
        <div>
            {!edit && commonData?.map((val) => {
                return (
                    <div key={val.label} className={"font-weight-bold col-md-12 row m-0 mb-1"}>
                        <label className="col-md-3 mb-1 pr-0 text-secondary">{val.label}:</label>
                        <p className="mb-0 col-md-9">{val.value}</p>
                    </div>
                )
            })}
            {edit && <div className="row">
                <FormsNew
                    data={commonDataFieldsArray}
                    SetValues={setValues}
                    formattedData={formData}
                    OnSave={onSave}
                >
                </FormsNew>
            </div>
            }
            <div className=" col-md-12 d-flex flex-wrap">
                {functionData?.map((val, index) => {
                    let otherData = [
                        { label: "Function name", value: val.function_name },
                        { label: "Minimum salary", value: val.minimum_salary },
                        { label: "Salary to be paid", value: val.salary_to_be_paid },
                    ]
                    return (
                        <div key={index} className={"border mt-2 mr-2 mb-2 function-card font-14"}>
                            {showData && cardNumber !== index && <img className="float-right pr-2 pt-2" src={EditIcon} onClick={() => { setEditFunction(true); setCardNumber(index) }}></img>}
                            {showData && cardNumber !== index && otherData.map((data, index) => {
                                return (
                                    <div key={data.label} className={"font-weight-bold col-md-12 p-0 row m-0 mb-2"}>
                                        <label className="col-md-6 mb-1 p-0 text-secondary">{data.label}:</label>
                                        <p className="mb-0 col-md-6 p-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>{data.value}</p>
                                    </div>
                                )
                            })}
                            {cardNumber == index && editFunction && <FormsNew
                                view={'filters'}
                                data={otherDataFieldsArray}
                                SetValues={setValues}
                                formattedData={formData}
                                OnSave={onSave}
                            >
                            </FormsNew>}
                            {cardNumber == index && editFunction && <div className="float-right col-md-12 mb-1 text-right">
                                <CustomButton buttonName={'ok'} ActionFunction={() => { setCardNumber(""); setEditFunction(false) }}></CustomButton>
                                <CustomButton buttonName={'Cancel'} ActionFunction={() => { setCardNumber(""); setEditFunction(false) }}></CustomButton>
                            </div>}
                        </div>
                    )
                })}
                <div className="float-right col-md-12 mb-2 text-right">
                    <CustomButton buttonName={'save'} ActionFunction={() => { setCardNumber(""); setToggleOpen("") }}></CustomButton>
                    <CustomButton buttonName={'Cancel'} ActionFunction={() => { setCardNumber(""); setToggleOpen("") }}></CustomButton>
                </div>
            </div >
        </div >
    )
}