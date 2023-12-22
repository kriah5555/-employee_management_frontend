import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import RadioInput from "../atoms/formFields/RadioInput";
import { getFormattedRadioOptions } from "../../utilities/CommonFunctions";

export default function AddEmployeeContractTypes({ options, employeeContracts, setEmployeeContracts, selectedEmpTypeCategory, setSelectedEmpTypeCategory, displaySubType, setDisplaySubType }) {

    const contractFields = [
        { title: "Weekly contract hours", name: "weekly_contract_hours", required: true, type: "text", style: "col-md-6 pl-0 float-left" },
        { title: "Work days per week", name: "work_days_per_week", required: true, type: "text", style: "col-md-6 float-left" },
    ]

    const ContractDateFields = [
        { title: "Contract start date", name: "start_date", required: true, type: "date", style: "col-md-6 pl-0 mt-4 float-left" },
        { title: "Contract end date", name: "end_date", required: false, type: "date", style: "col-md-6 mt-4 float-left" },
    ]


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const employeeContractsData = { ...employeeContracts };
        if (field !== 'dropdown') {
            employeeContractsData[name] = value
        }
        setEmployeeContracts(employeeContractsData);
    }

    const onRadioSelect = (type, key) => {
        if (type === 'emp_type_cat') {

            setSelectedEmpTypeCategory(key);
            if (key === 1) {
                setDisplaySubType(true)
            } else {
                setDisplaySubType(false)
            }
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
                        title={'Employee types'}
                        radiobuttonsList={options.employee_contract_options.employee_types[selectedEmpTypeCategory]}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'col-md-3'}
                        selectedOption={employeeContracts['employee_type_id']}
                        type={'employee_type_id'}
                    ></RadioInput>}
                    {displaySubType && <>
                        <RadioInput
                            title={'Sub types'}
                            radiobuttonsList={getFormattedRadioOptions(options.sub_types, 'key', 'value')}
                            changeCheckbox={onRadioSelect}
                            CustomStyle={'col-md-3'}
                            selectedOption={employeeContracts['sub_type']}
                            type={'sub_type'}
                        ></RadioInput>
                        <RadioInput
                            title={'Schedule type'}
                            radiobuttonsList={getFormattedRadioOptions(options.schedule_types, 'key', 'value')}
                            changeCheckbox={onRadioSelect}
                            CustomStyle={'col-md-3'}
                            selectedOption={employeeContracts['schedule_type']}
                            type={'schedule_type'}
                        ></RadioInput>
                        <RadioInput
                            title={'Employement type'}
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
