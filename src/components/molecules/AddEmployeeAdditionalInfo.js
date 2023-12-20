import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { EmployeeApiUrl } from "../../routes/ApiEndPoints";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";


export default function AddEmployeeAdditionalInfo({ tabIndex, employeeData, setEmployeeData, fuelCard, setFuelCard, companyCar, setCompanyCar, mealVoucher, setMealVoucher, options }) {

    const YesNoOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]

    //add employee personal detail fields
    const socialSecurityFields = [
        { title: "Social secretary number", name: "social_secretary_number", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Contract number", name: "contract_number", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
    ];

    const extraBenefitFields = [
        { title: "Company fuel card", name: "fuel_card", required: false, options: YesNoOptions, selectedOptions: fuelCard, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Company car", name: "company_car", required: false, options: YesNoOptions, selectedOptions: companyCar, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Clothing compensation(Euros)", name: "clothing_compensation", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Meal Voucher type", name: "meal_voucher_id", required: false, options: getFormattedDropdownOptions(options.meal_vouchers), selectedOptions: mealVoucher, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Meal Voucher amount", name: "meal_voucher_amount", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
    ]

    const extraPersonalInfo = [
        { title: "Id card front", name: "id_card_front", required: false, type: "text-area", style: "col-md-4 mt-4 float-left" },
        { title: "Id card back", name: "id_card_back", required: false, type: "text-area", style: "col-md-4 mt-4 float-left" },
        { title: 'Extra information', name: 'extra_info', required: false, type: 'text-area', style: "col-md-4 mt-4 mb-5 float-left" },

    ]

    // const FreeFields = [
    //     { title: "", name: "", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
    //     { title: "", name: "", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

    // ]


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const employees = { ...employeeData };
        if (field !== 'dropdown') {
            employees[name] = value
        } else {
            if (name === 'fuel_card') {
                setFuelCard(value)
            } else if (name === 'company_car') {
                setCompanyCar(value)
            } else {
                setMealVoucher(value)
                options.meal_vouchers.map((val) => {
                    if (val.id === value.value) {
                        employees['meal_voucher_amount'] = val.amount_formatted
                    }
                })
            }
            employees[name] = value.value
        }
        setEmployeeData(employees);
    }


    return (
        <div className="pt-4">
            <span className="col-md-12 pl-5 ml-3 form-subHeading pos-relative">{'Social secretary details'}</span>
            <FormsNew
                view="employees"
                formTitle={''}
                formattedData={employeeData}
                data={socialSecurityFields}
                SetValues={setValues}
            ></FormsNew>

            <span className="col-md-12 pl-5 ml-3 form-subHeading pos-relative">{'Extra benefits'}</span>
            <FormsNew
                view="employees"
                formTitle={''}
                formattedData={employeeData}
                data={extraBenefitFields}
                SetValues={setValues}
            ></FormsNew>

            {/* <span className="col-md-12 pl-5 ml-3 form-subHeading pos-relative">{'Free fields'}</span>
            <FormsNew
                view="employees"
                formTitle={''}
                formattedData={employeeData}
                data={FreeFields}
                SetValues={setValues}
            ></FormsNew> */}

            <span className="col-md-12 pl-5 ml-3 form-subHeading pos-relative">{'Identity info'}</span>
            <FormsNew
                view="employees"
                formTitle={''}
                formattedData={employeeData}
                data={extraPersonalInfo}
                SetValues={setValues}
            ></FormsNew>
        </div>
    )
}

