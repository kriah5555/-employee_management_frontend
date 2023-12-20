import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { EmployeeApiUrl } from "../../routes/ApiEndPoints";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";


export default function AddEmployeePersonalDetails({ options, employeeData, setEmployeeData, gender, setGender, language, setLanguage,
    maritalStatus, setMaritalStatus, dependantSpouse, setDependantSpouse, children, setChildren, childrenOptions }) {

    //add employee personal detail fields
    const addEmployeeDetailsFields = [
        { title: "Social security number", name: "social_security_number", required: true, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "First name", name: "first_name", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Last name", name: "last_name", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Mobile number", name: "phone_number", required: true, type: "phone_input", style: "col-md-4 mt-4 float-left" },

        { title: "Email", name: "email", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "DOB", name: "date_of_birth", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: "Place of birth", name: "place_of_birth", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Gender", name: "gender_id", required: true, options: getFormattedDropdownOptions(options.genders), selectedOptions: gender, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        // { title: "Social security number", name: "social_security_number", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Licence expiry", name: "license_expiry_date", required: false, type: "date", style: "col-md-4 mt-4 float-left" },

        { title: "Address: Street + House num", name: "street_house_no", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Postal code", name: "postal_code", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "City", name: "city", required: true, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Country", name: "country", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Nationality", name: "nationality", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Bank account number", name: "account_number", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Language", name: "language", required: true, options: getFormattedDropdownOptions(options.languages, 'key', 'value'), selectedOptions: language, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: 'Marital status', name: 'marital_status_id', required: true, options: getFormattedDropdownOptions(options.marital_statuses), selectedOptions: maritalStatus, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Dependant spouse", name: "dependent_spouse", required: true, options: getFormattedDropdownOptions(options.dependent_spouse_options, 'key', 'value'), selectedOptions: dependantSpouse, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        // { title: "Children", name: "children", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Children", name: "children", required: false, options: childrenOptions, selectedOptions: children, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
    ];

    function formatDate(value) {

        const firstSixDigits = value.toString().replace(/[^\d]/g, '').slice(0, 6);
        // Check if the extracted 6 digits are not digits
        if (!/^\d+$/.test(firstSixDigits)) {
            return ""; // Return an empty string if not digits
        }

        const yy = firstSixDigits.slice(0, 2);
        const xx = yy >= 23 ? '19' : '20';
        const formattedDate = `${firstSixDigits.slice(4, 6)}-${firstSixDigits.slice(2, 4)}-${xx}${yy}`;
        return formattedDate;

    }


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const employees = { ...employeeData };
        if (field !== 'dropdown') {
            if (name === 'social_security_number') {
                if (value.length <= 15) {
                    employees[name] = [2, 5, 8, 12].includes(value.length) ? (value + (value.length === 8 ? '-' : '.')) : value
                }
                if (value.length >= 8) {
                    employees["date_of_birth"] = formatDate(value)
                }
            } else {
                employees[name] = value
            }
        } else {
            if (name === 'gender_id') {
                setGender(value);
            } else if (name === 'language') {
                setLanguage(value);
            } else if (name === 'marital_status_id') {
                setMaritalStatus(value);
            } else if (name === 'dependent_spouse') {
                setDependantSpouse(value)
            } else if (name === 'children') {
                setChildren(value)
            }
            employees[name] = value.value
        }
        setEmployeeData(employees);
    }


    return (
        <div className="">
            <FormsNew
                view="employees"
                formTitle={''}
                redirectURL={'/manage-employees'}
                formattedData={employeeData}
                data={addEmployeeDetailsFields}
                SetValues={setValues}
            ></FormsNew>
        </div>
    )
}

