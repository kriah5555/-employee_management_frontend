import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import EditIcon from "../../static/icons/edit-dark.svg"
import CustomButton from "../atoms/CustomButton";
import { getFormattedDropdownOptions, getFormattedRadioOptions } from "../../utilities/CommonFunctions";
import RadioInput from "../atoms/formFields/RadioInput";

// import getFormattedDropdownOptions from 

export default function UpdateEmployeeContractDetailsForm({ data={}, edit, employeeContractOptions, setEditStatus, setToggleOpen }) {
    let response = { ...data }
    const [formData, setFormData] = useState(response)
    const [employeeTypeList, setEmployeeTypeList] = useState([])
    const [employeeType, setEmployeeType] = useState("")
    const [subTypeList, setSubTypeList] = useState([])
    const [subType, setSubType] = useState("")
    const [functionList, setFunctionList] = useState([])
    const [functionName, setFunctionName] = useState("")
    const [showData, setShowData] = useState(true)
    const [editFunction, setEditFunction] = useState(false)
    const [cardNumber, setCardNumber] = useState("")
    const [isLongTermContract, setisLongTermContract] = useState(data.long_term)

    let scheduleTypeArray = getFormattedRadioOptions(employeeContractOptions.schedule_types, 'key', 'value')
    let employementTypeArray = getFormattedRadioOptions(employeeContractOptions.schedule_types, 'key', 'value')
    let functionData = data.employee_function_details
    let longtermEmployeeTypeListArray = getFormattedDropdownOptions(employeeContractOptions?.employee_contract_options.employee_types[1], "key", "name")
    let dayContractEmployeeTypeListArray = getFormattedDropdownOptions(employeeContractOptions?.employee_contract_options.employee_types[2], "key", "name")
    let subTypeListArray = getFormattedDropdownOptions(employeeContractOptions?.sub_types, "key", "value")

    let commonData = [
        { label: "Employee type", value: data.employee_type },
        { label: "Sub type", value: data.sub_type },
        { label: "Start Date", value: data.start_date },
        { label: "end date", value: data.end_date },
        { label: "Weekly contract hours", value: data.weekly_contract_hours },
        { label: "Work days per week", value: data.work_days_per_week }
    ]

    useEffect(() => {
        if (isLongTermContract) {
            setEmployeeTypeList(longtermEmployeeTypeListArray)
            setSubTypeList(subTypeListArray)
            longtermEmployeeTypeListArray.map((val) => {
                if (val.label == data.employee_type) {
                    setEmployeeType(val)
                }
            })

            subTypeListArray.map((val) => {
                console.log(val);
                if (val.label == data.sub_type) {
                    setSubType(val)
                }
            })
        } else {
            setEmployeeTypeList(dayContractEmployeeTypeListArray)
            dayContractEmployeeTypeListArray.map((val) => {
                if (val.label == data.employee_type) {
                    setEmployeeType(val)
                }
            })
        }

    }, [])


    const onRadioSelect = () => {

    }

    const setValues = (index, name, value, field) => {
        
    
    }

    const onSave = () => {

    }

    let commonDataFieldsArray = [
        { title: "Employee Type", name: "employee_type", type: "dropdown", options: employeeTypeList, selectedOptions: employeeType, required: true, isDisabled: true, style: "col-md-6 float-left" },
        { title: "Sub Type", name: "sub_type", type: "dropdown", options: subTypeList, selectedOptions: subType, required: true, isDisabled: true, style: "col-md-6 float-left mt-2" },
        { title: "Start date", name: "start_date", type: "date", disabled: true, style: "col-md-6 float-left  mt-2" },
        { title: "End date", name: "end_date", type: "date", disabled: (data.end_date) ? true : false, style: "col-md-6 float-left mt-2" },
        { title: "Weekly contract hours", name: "weekly_contract_hours", type: "text", style: "col-md-6 float-left mt-2" },
        { title: "Work days per week", name: "work_days_per_week", type: "text", style: "col-md-6 float-left mt-2" },
        { title: "Schedule type", name: "schedule_type", type: "radio", style: "col-md-6 float-left mt-2" },
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
                {isLongTermContract && edit && <div className="col-md-6 ml-4 p-0 d-flex mb-2">
                    <RadioInput
                        title={'Schedule type'}
                        radiobuttonsList={scheduleTypeArray}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'col-md-4'}
                        selectedOption={""}
                        type={'schedule_type'}
                    ></RadioInput>
                    <RadioInput
                        title={'Employement type'}
                        radiobuttonsList={employementTypeArray}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'col-md-4'}
                        selectedOption={""}
                        type={'employment_type'}
                    ></RadioInput>
                </div>}
            </div>
            }
            <div className=" col-md-12 d-flex flex-wrap">
                {functionData?.map((val, index) => {
                    console.log(val.salary);
                    let otherData = [
                        { label: "Function name", value: val.function_title },
                        { label: "Salary", value: val.salary },
                        { label: "Experience", value: val.experience },// need to add value for this
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