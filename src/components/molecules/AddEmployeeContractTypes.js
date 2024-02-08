import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import RadioInput from "../atoms/formFields/RadioInput";
import { getFormattedRadioOptions, GetReversedDate } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function AddEmployeeContractTypes({ options, employeeContracts, setEmployeeContracts, selectedEmpTypeCategory, setSelectedEmpTypeCategory, displaySubType, setDisplaySubType, }) {

    const [longTermDimona, setLongTermDimona] = useState(employeeContracts.send_dimona === "" ? false : employeeContracts.send_dimona)
    const [startDateWarning, setStartDateWarning] = useState("")
    const [showReservedHours, setShowReservedHours] = useState(false)

    //to retain the reserved hours field when movet to next tab
    useEffect(() => {
        let listOptions = options?.employee_contract_options?.employee_types[selectedEmpTypeCategory]
        listOptions && listOptions.map((item) => {
            if (item.key === employeeContracts.employee_type_id) {
                setShowReservedHours(item.reserved_hours);
            }
        })
    }, [])

    const startdateWarning = (date) => {
        if (date !== null) {
            let reverseDate = GetReversedDate(date)
            let modifiedDate = new Date(reverseDate)
            let currentDate = new Date();
            if (modifiedDate.getDate() < currentDate.getDate()) {
                setStartDateWarning(t("YOU_ARE_ENTERING_PAST_DATE"))
            } else if (modifiedDate.getDate() >= currentDate.getDate()) {
                setStartDateWarning("")
            }
        }
    }

    const checkboxList = [
        {
            key: "send_dimona",
            name: t("DO_YOU_WANT_TO_SEND_LONGTERM_DIMONA"),
        }
    ]

    const changeCheckbox = (type) => {
        setLongTermDimona(!longTermDimona)
        let newData = { ...employeeContracts }
        newData.send_dimona = !longTermDimona
        setEmployeeContracts(newData)
        if (!longTermDimona && employeeContracts.start_date !== "") {
            startdateWarning(employeeContracts.start_date)
        } else {
            setStartDateWarning("")
        }
    }

    const contractFields = [
        { title: t("WEEKLY_CONTRACT_HOURS"), name: "weekly_contract_hours", required: true, type: "text", style: "col-md-6 pl-0 float-left" },
        { title: t("WORK_DAYS_PER_WEEK"), name: "work_days_per_week", required: true, type: "text", style: "col-md-6 float-left" },
        { title: "", required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, checked: longTermDimona, style: 'col-md-12 mt-4 pl-0 float-left' },
        (!longTermDimona) ? { title: t("DIMONA_PERIOD_ID"), name: "dimona_period_id", required: true, type: "text", style: "col-md-6  mt-4 pl-0 float-left" } : {},
        (longTermDimona && showReservedHours) ? { title: t("RESERVED_HOURS"), name: "reserved_hours", required: true, type: "text", style: "col-md-6  mt-4 pl-0 float-left" } : {}
    ]

    const ContractDateFields = [
        { title: t("CONTRACT_START_DATE"), name: "start_date", required: true, type: "date", style: startDateWarning ? "col-md-12 pl-0 mt-4 float-left" : "col-md-6 pl-0 mt-4 float-left", warning: startDateWarning },
        { title: t("CONTRACTS_END_DATE"), name: "end_date", required: false, type: "date", style: "col-md-6 mt-4 float-left" },
    ]


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const employeeContractsData = { ...employeeContracts };
        if (field !== 'dropdown') {
            employeeContractsData[name] = value
            if (name === 'start_date' && longTermDimona) {
                startdateWarning(value)
            }
        }
        setEmployeeContracts(employeeContractsData);
    }

    const onRadioSelect = (type, key, reservedHours) => {
        if (type === 'emp_type_cat') {
            setSelectedEmpTypeCategory(key);
            if (key === 1) {
                setDisplaySubType(true)
            } else {
                setDisplaySubType(false)
            }
        } else if (type === 'employee_type_id') {
            let listOptions = options?.employee_contract_options?.employee_types[selectedEmpTypeCategory]
            listOptions.map((item) => {
                if (item.key === key) {
                    setShowReservedHours(item.reserved_hours);
                }
            })
            const employeeContractsData = { ...employeeContracts };
            employeeContractsData[type] = key
            setEmployeeContracts(employeeContractsData)
        } else {
            const employeeContractsData = { ...employeeContracts };
            employeeContractsData[type] = key
            setEmployeeContracts(employeeContractsData)
            // console.log(employeeContractsData);
        }
    }




    return (
        <div className="col-md-12 p-0 row m-0">
            <div className="col-md-3 pr-0 my-5 border-right">
                <RadioInput
                    title={''}
                    radiobuttonsList={options && options.employee_contract_options !== undefined ? options.employee_contract_options.employee_type_categories : []}
                    changeCheckbox={onRadioSelect}
                    CustomStyle={''}
                    selectedOption={selectedEmpTypeCategory}
                    type={'emp_type_cat'}
                ></RadioInput>
            </div>
            <div className="col-md-9 pl-0 my-5">
                <div className="col-md-12 pl-0 row m-0">
                    {selectedEmpTypeCategory && <RadioInput
                        title={t("EMPLOYEE_TYPES")}
                        radiobuttonsList={options.employee_contract_options.employee_types[selectedEmpTypeCategory]}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'col-md-3'}
                        selectedOption={employeeContracts['employee_type_id']}
                        type={'employee_type_id'}
                    ></RadioInput>}
                    {displaySubType && <>
                        <RadioInput
                            title={t("SUB_TYPES")}
                            radiobuttonsList={getFormattedRadioOptions(options.sub_types, 'key', 'value')}
                            changeCheckbox={onRadioSelect}
                            CustomStyle={'col-md-3'}
                            selectedOption={employeeContracts['sub_type']}
                            type={'sub_type'}
                        ></RadioInput>
                        <RadioInput
                            title={t("SCHEDULE_TYPE")}
                            radiobuttonsList={getFormattedRadioOptions(options.schedule_types, 'key', 'value')}
                            changeCheckbox={onRadioSelect}
                            CustomStyle={'col-md-3'}
                            selectedOption={employeeContracts['schedule_type']}
                            type={'schedule_type'}
                        ></RadioInput>
                        <RadioInput
                            title={t("EMPLOYEEMENT_TYPE")}
                            radiobuttonsList={getFormattedRadioOptions(options.employment_types, 'key', 'value')}
                            changeCheckbox={onRadioSelect}
                            CustomStyle={'col-md-3'}
                            selectedOption={employeeContracts['employment_type']}
                            type={'employment_type'}
                        ></RadioInput>
                    </>}
                </div>
                {selectedEmpTypeCategory && <div className="col-md-12 pl-0 row m-0">
                    <FormsNew
                        view="contracts"
                        formTitle={''}
                        redirectURL={''}
                        formattedData={employeeContracts}
                        data={ContractDateFields}
                        SetValues={setValues}
                    ></FormsNew>
                </div>}
                {displaySubType && <div className="col-md-12 pl-0 row m-0">
                    <FormsNew
                        view="contracts"
                        formTitle={''}
                        redirectURL={''}
                        formattedData={employeeContracts}
                        data={contractFields}
                        SetValues={setValues}
                    ></FormsNew>
                </div>}
            </div>
        </div>
    )
}
