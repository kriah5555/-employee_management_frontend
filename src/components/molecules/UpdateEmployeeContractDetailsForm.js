import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import EditIcon from "../../static/icons/edit-dark.svg"
import CustomButton from "../atoms/CustomButton";
import { getFormattedDropdownOptions, getFormattedRadioOptions } from "../../utilities/CommonFunctions";
import RadioInput from "../atoms/formFields/RadioInput";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { EmployeeContractApiUrl, LogoutApiUrl } from "../../routes/ApiEndPoints";
import { toast } from 'react-toastify';

// import getFormattedDropdownOptions from

export default function UpdateEmployeeContractDetailsForm({ data, eid, edit, employeeContractOptions, setEditStatus, setToggleOpen, toggleOpen, setDataRefresh, dataRefresh }) {
    //creating deep copy
    const copy = JSON.parse(JSON.stringify(data));
    const response = JSON.parse(JSON.stringify(data));
    let contractId = data.id

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
    const [selectedScheduleType, setSelectedScheduleType] = useState(response.schedule_type)
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(response.employment_type)
    const [functionIndex, setFuncitonIndex] = useState("")
    const [refresh, setRefresh] = useState(false)

    let scheduleTypeArray = getFormattedRadioOptions(employeeContractOptions.schedule_types, 'key', 'value')
    let employementTypeArray = getFormattedRadioOptions(employeeContractOptions.employment_types, 'key', 'value')
    let functionData = data.employee_function_details
    let functionListArray = getFormattedDropdownOptions(employeeContractOptions.functions, "id", "name")
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
        //setting radio options
        if (isLongTermContract) {
            setEmployeeTypeList(longtermEmployeeTypeListArray)
            setSubTypeList(subTypeListArray)
            longtermEmployeeTypeListArray.map((val) => {
                if (val.label == data.employee_type) {
                    setEmployeeType(val)
                }
            })

            subTypeListArray.map((val) => {
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

        // setting function list from response
        setFunctionList(functionListArray)
        //setting schedule type and sub type from response
        if (response.schedule_type !== undefined && response.schedule_type !== null && response.employment_type !== undefined && response.employment_type !== null) {
            response.schedule_type == "part_time" ? setSelectedScheduleType(scheduleTypeArray[0].key) : setSelectedScheduleType(scheduleTypeArray[1].key)
            response.employment_type == 'fixed' ? setSelectedEmploymentType(employementTypeArray[0].key) : setSelectedEmploymentType(employementTypeArray[1].key)
        }

        setEditStatus(false)

    }, [toggleOpen, eid, refresh])

    useEffect(() => {
        // set function when loaded
        functionListArray.map((val) => {
            if (val.value == response.employee_function_details[functionIndex]?.function_id) {
                setFunctionName(val)
            }
        })

    }, [functionIndex])


    const onRadioSelect = (type, key) => {

        if (type === 'schedule_type') {
            if (key === "part_time") {
                setSelectedScheduleType(key)
            } else {
                setSelectedScheduleType(key)
            }
            setFormData((prev) => ({ ...prev, [type]: key }))

        } else {
            if (key === 'fixed') {
                setSelectedEmploymentType(key)
            } else {

                setSelectedEmploymentType(key)
            }
            setFormData((prev) => ({ ...prev, [type]: key }))

        }
    }

    const setValues = (index, name, value, field, functionIndex) => {
        let newData = { ...formData }
        if (field !== "dropdown") {
            if (name === "salary" || name === "experience") {
                newData['employee_function_details'][functionIndex][name] = value
            } else {
                newData[name] = value
            }

        } else {
            if (name == "function_id") {
                newData['employee_function_details'][functionIndex][name] = value.value
                setFunctionName(value)
            }
        }
        setFormData(newData)

    }

    const onSave = () => {

        const { employee_function_details, ...contractDetails } = formData
        data = {
            "employee_profile_id": eid,
            "employee_contract_details": contractDetails,
            "employee_function_details": formData.employee_function_details
        }

        let url = EmployeeContractApiUrl + "/" + contractId
        AXIOS.service(url, "PUT", data)
            .then((result) => {
                if (result?.success) {
                    setRefresh(!refresh)
                    setEditStatus(false)
                    setEditFunction(false)
                    setCardNumber("")
                    setDataRefresh(!dataRefresh)
                    toast.success(result.message[0], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const reset = (index) => {

        let oldData = copy.employee_function_details[index]
        setFormData((prev) => {
            let currentDetails = [...prev.employee_function_details]
            currentDetails[index] = oldData
            // setCardNumber(""); setEditFunction(false);
            return {
                ...prev, employee_function_details: currentDetails
            }
        })
    }

    const handleOk = (index) => {

        // functionData.replaceformData.employee_function_details[index])
        setCardNumber(""); setEditFunction(false);
        setRefresh(!refresh)
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
        { title: "Function name", name: "function_id", type: "dropdown", options: functionList, selectedOptions: functionName, required: true, style: "col-md-12 p-0" },
        { title: "Salary", name: "salary", type: "text", style: "col-md-12 p-0 float-right mt-2" },
        { title: "Experience", name: "experience", type: "text", style: "col-md-12 p-0 float-right mt-2" },
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
                        selectedOption={selectedScheduleType}
                        type={'schedule_type'}
                    ></RadioInput>
                    <RadioInput
                        title={'Employement type'}
                        radiobuttonsList={employementTypeArray}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'col-md-4'}
                        selectedOption={selectedEmploymentType}
                        type={'employment_type'}
                    ></RadioInput>
                </div>}
            </div>
            }
            <div className=" col-md-12 d-flex flex-wrap">
                {functionData?.map((val, index) => {
                    let otherData = [
                        { label: "Function name", value: val.function_title },
                        { label: "Salary", value: val.salary },
                        { label: "Experience", value: val.experience },// need to add value for this
                    ]
                    return (
                        <div key={index} className={"border mt-2 mr-2 mb-2 function-card font-14"}>
                            {showData && cardNumber !== index && <img className="float-right pr-2 pt-2" src={EditIcon} onClick={() => { setEditFunction(true); setCardNumber(index); setFuncitonIndex(index) }}></img>}
                            {showData && cardNumber !== index && otherData.map((data, index) => {
                                return (
                                    <div key={data.label} className={"font-weight-bold col-md-12 p-0 row m-0 mb-2"}>
                                        <label className="col-md-6 mb-1 p-0 text-secondary">{data.label}:</label>
                                        <p className="mb-0 col-md-6 p-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>{data.value}</p>
                                    </div>
                                )
                            })}
                            {cardNumber == index && editFunction && <>
                                <div key={data.label} className={"font-weight-bold col-md-12 p-0 row m-0 mb-2 mt-2"}>
                                    <label className="col-md-6 mb-1 p-0 text-secondary">Minimum salary:</label>
                                    <p className="mb-0 col-md-6 p-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>{val.minimum_salary.minimumSalary}</p>
                                </div>
                                <div key={data.label} className={"font-weight-bold col-md-12 p-0 row m-0 mb-2"}>
                                    <label className="col-md-6 mb-1 p-0 text-secondary">Type:</label>
                                    <p className="mb-0 col-md-6 p-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>{val.minimum_salary.salary}</p>
                                </div>
                                <FormsNew
                                    view={'filters'}
                                    data={otherDataFieldsArray}
                                    SetValues={setValues}
                                    formattedData={formData.employee_function_details[index]}
                                    OnSave={onSave}
                                    functionIndex={index}
                                >
                                </FormsNew>
                            </>
                            }
                            {cardNumber == index && editFunction && <div className="float-right col-md-12 mb-1 text-right">
                                <CustomButton buttonName={'ok'} ActionFunction={() => { handleOk(index); setCardNumber(""); setEditFunction(false) }}></CustomButton>
                                <CustomButton buttonName={'Cancel'} ActionFunction={() => {reset(index); setCardNumber(""); setEditFunction(false)}}></CustomButton>
                            </div>}
                        </div>
                    )
                })}
                <div className="float-right col-md-12 mb-2 text-right">
                   {(editFunction|| edit)&&<CustomButton buttonName={'save'} ActionFunction={() => { /*setCardNumber(""); setToggleOpen("") */ onSave() }}></CustomButton>}
                    <CustomButton buttonName={'Cancel'} ActionFunction={() => { setCardNumber(""); setToggleOpen("") }}></CustomButton>
                </div>
            </div >
        </div >
    )
}
