import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { EmployeeApiUrl } from "../../routes/ApiEndPoints";


export default function AddEmployeePersonalDetails({ options, employeeData, setEmployeeData, gender, setGender, language, setLanguage,
    maritalStatus, setMaritalStatus, dependantSpouse, setDependantSpouse }) {

    //add employee personal detail fields 
    const addEmployeeDetailsFields = [
        { title: "First name", name: "first_name", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Last name", name: "last_name", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Mobile number", name: "phone_number", required: true, type: "phone_input", style: "col-md-4 mt-4 mb-1 float-left" },

        { title: "Email", name: "email", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "DOB", name: "date_of_birth", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: "Place of birth", name: "birth_place", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Gender", name: "gender_id", required: true, options: options.genders, selectedOptions: gender, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Social security number", name: "social_security_number", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Licence expiry", name: "license_expiry_date", required: false, type: "date", style: "col-md-4 mt-4 float-left" },

        { title: "Address: Street + House num", name: "street_house_no", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Postal code", name: "postal_code", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "City", name: "city", required: true, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Country", name: "country", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Nationality", name: "nationality", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Bank account number", name: "bank_account_number", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Language", name: "language", required: true, options: options.languages, selectedOptions: language, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: 'Marital status', name: 'marital_status_id', required: true, options: options.marital_statuses, selectedOptions: maritalStatus, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Dependant spouse", name: "dependant_spouse", required: true, options: options.dependent_spouse_options, selectedOptions: dependantSpouse, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        // { title: "Childrens", name: "childrens", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
    ];


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const employees = { ...employeeData };
        if (field !== 'dropdown') {
            employees[name] = value
        } else {
            if (name === 'gender_id') {
                setGender(value);
            } else if (name === 'language') {
                setLanguage(value);
            } else if (name === 'marital_status_id') {
                setMaritalStatus(value);
            } else if (name === 'dependant_spouse') {
                setDependantSpouse(value)
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

