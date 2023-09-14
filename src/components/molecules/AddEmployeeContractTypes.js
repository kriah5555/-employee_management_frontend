import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { EmployeeApiUrl } from "../../routes/ApiEndPoints";
import RadioInput from "../atoms/formFields/RadioInput";


export default function AddEmployeeContractTypes({ tabIndex, employeeData, setEmployeeData, OnSave, gender, setGender, language, setLanguage,
    maritalStatus, setMaritalStatus, fuelCard, setFuelCard, companyCar, setCompanyCar, mealVoucher, setMealVoucher }) {

    const [options, setOptions] = useState([]);

    const [longTerm, setLongTerm] = useState(true);
    const [dailyContract, setDailyContract] = useState(false);
    const [employeeContract, setEmployeeContract] = useState(false);

    const YesNoOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]

    const VouchersOptions = [{ value: 'sodexo', label: 'Sodexo' }, { value: 'not applicable', label: 'Not applicable' }]


    useEffect(() => {
        AXIOS.service(EmployeeApiUrl + '/create/1', 'GET')
            .then((result) => {
                if (result?.success) {
                    setOptions(result.data)
                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])



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
        { title: "Date of joining", name: "date_of_joining", required: true, type: "date", style: "col-md-2 mt-4 float-left" },
        { title: "Date of leaving", name: "date_of_leaving", required: false, type: "date", style: "col-md-2 mt-4 float-left" },

        { title: "Address: Street + House num", name: "street_house_no", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Postal code", name: "postal_code", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "City", name: "city", required: true, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Country", name: "country", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Nationality", name: "nationality", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Bank account number", name: "bank_account_number", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Language", name: "language", required: true, options: options.languages, selectedOptions: language, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: 'Marital status', name: 'marital_status_id', required: true, options: options.marital_status, selectedOptions: maritalStatus, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        // { title: "Dependant spouse", name: "dependant_spouse", type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Childrens", name: "childrens", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
    ];

    const extraBenefitFields = [
        { title: "Transport", name: "transport_id", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Distance(kms)", name: "distance", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Company fuel card", name: "fuel_card", required: false, options: YesNoOptions, selectedOptions: fuelCard, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Company car", name: "company_car", required: false, options: YesNoOptions, selectedOptions: companyCar, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Meal Vouchers", name: "meal_voucher", required: false, options: VouchersOptions, selectedOptions: mealVoucher, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Clothing compensation(Euros)", name: "clothing_compensation", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
    ]

    const functionSalariesFields = [
        { title: "Add function", name: "function", required: false, options: YesNoOptions, selectedOptions: fuelCard, isMulti: false, type: 'dropdown', style: "col-md-12 mt-2 float-left" },
        { title: "Function name", name: "function_name", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Minimum salary", name: "min_salary", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Salary to be paid", name: "salary", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Contract number", name: "contract_no", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Social security number", name: "social_security_number_2", required: false, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Weekly contract hours", name: "weekly_contract_hour", required: false, type: "text", style: "col-md-2 mt-4 float-left" },
        { title: "Work days per week", name: "week_day", required: false, type: "text", style: "col-md-2 mt-4 float-left" },

    ]

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
            } else if (name === 'fuel_card') {
                setFuelCard(value)
            } else if (name === 'company_car') {
                setCompanyCar(value)
            } else {
                setMealVoucher(value)
            }
            employees[name] = value.value
        }
        setEmployeeData(employees);
    }

    let data = addEmployeeDetailsFields

    if (tabIndex === 0) {
        data = addEmployeeDetailsFields
    } else if (tabIndex === 2) {
        data = functionSalariesFields
    } else {
        data = extraBenefitFields
    }


    const radiobuttonsList = [
        {
            name: 'Long term contract',
            key: 'long_term',
            checked: longTerm,
        },
        {
            name: 'Daily contract',
            key: 'daily_contract',
            checked: dailyContract,
        },
        {
            name: 'External employee',
            key: 'external_employee',
            checked: employeeContract,
        }
    ]

    const onRadioSelect = (key) => {
        if (key === 'longTerm') {
            setLongTerm(true);
            setDailyContract(false);
            setEmployeeContract(false);
        } else if(key === 'daily_contract') {
            setLongTerm(false);
            setDailyContract(true);
            setEmployeeContract(false);
        } else {
            setLongTerm(false);
            setDailyContract(false);
            setEmployeeContract(true);
        }
    }

    return (
        <div className="col-md-12 p-0">
            <div className="col-md-3 my-5 mx-5 px-5 border-right">
                <RadioInput
                    title={''}
                    radiobuttonsList={radiobuttonsList}
                    changeCheckbox={onRadioSelect}
                    CustomStyle={''}
                ></RadioInput>
            </div>
            {/* <FormsNew
                view="employees"
                formTitle={''}
                redirectURL={'/manage-employees'}
                formattedData={employeeData}
                data={data}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew> */}
        </div>
    )
}
