import React, { useState, useEffect } from "react";
import { EmployeeCreateApiUrl, ValidateEmployeeInvitation, EmployeeRegistrationApiUrl } from "../../routes/ApiEndPoints";
import { toast } from 'react-toastify';
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import Logo from "../../static/icons/Logo.png"
import FormsNew from "../molecules/FormsNew";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";

export default function EmployeeBasicDetails() {

    const navigate = useNavigate();
    const params = useParams();
    const [tabIndex, setTabIndex] = useState(0);

    const [employeeCreateOptions, setEmployeeCreateOptions] = useState([]);
    const [gender, setGender] = useState()
    const [language, setLanguage] = useState();
    const [maritalStatus, setMaritalStatus] = useState();
    const [dependantSpouse, setDependantSpouse] = useState([]);
    const [children, setChildren] = useState([]);

    const [errors, setErrors] = useState([]);
    const [validToken, setValidToken] = useState({
        "token": params.validtoken
    })
    const [showForm, setShowForm] = useState(false)

    const [employeeData, setEmployeeData] = useState({
        "token":validToken.token,
        "first_name": "",
        "last_name": "",
        "date_of_birth": "",
        "gender_id": "",
        "marital_status_id": "",
        "email": "",
        "phone_number": "",
        "social_security_number": "",
        "language": "",
        "street_house_no": "",
        "postal_code": "",
        "city": "",
        "country": "",
        "account_number": "",
    })

    const MaximumChildren = 10;
    let count = 0
    let childrenOptions = [];
    while (count <= MaximumChildren) {
        childrenOptions.push({ value: count, label: count })
        count = count + 1
    }

    const validateToken = () => {

        AXIOS.service(ValidateEmployeeInvitation, 'POST', validToken)
            .then((result) => {
                if (result?.success) {
                    setShowForm(true)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {

        validateToken()

        if (showForm) {
            AXIOS.service(EmployeeCreateApiUrl + '/create', 'GET')
                .then((result) => {
                    if (result?.success) {
                        setEmployeeCreateOptions(result.data)
                    } else {
                        setErrors(result.message[0])
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        localStorage.setItem("auth", false)

    }, [showForm])

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

    const onSave = () => {

        AXIOS.service(EmployeeRegistrationApiUrl, "POST", employeeData)
            .then((result) => {
                if (result?.success) {
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

    const addEmployeeDetailsFields = [
        { title: "SSN", name: "social_security_number", required: true, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "First name", name: "first_name", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Last name", name: "last_name", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Mobile number", name: "phone_number", required: true, type: "phone_input", style: "col-md-4 mt-4 float-left" },

        { title: "Email", name: "email", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "DOB", name: "date_of_birth", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: "Place of birth", name: "place_of_birth", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Gender", name: "gender_id", required: true, options: getFormattedDropdownOptions(employeeCreateOptions.genders), selectedOptions: gender, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },

        { title: "Address: Street + House num", name: "street_house_no", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Postal code", name: "postal_code", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "City", name: "city", required: true, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Country", name: "country", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Nationality", name: "nationality", required: true, type: "text", style: "col-md-4 mt-4 float-left" },
        { title: "Bank account number", name: "account_number", required: false, type: "text", style: "col-md-4 mt-4 float-left" },

        { title: "Language", name: "language", required: true, options: getFormattedDropdownOptions(employeeCreateOptions.languages, 'key', 'value'), selectedOptions: language, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Marital status", name: 'marital_status_id', required: true, options: getFormattedDropdownOptions(employeeCreateOptions.marital_statuses), selectedOptions: maritalStatus, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Dependent spouse", name: "dependent_spouse", required: true, options: getFormattedDropdownOptions(employeeCreateOptions.dependent_spouse_options, 'key', 'value'), selectedOptions: dependantSpouse, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "Children", name: "children", required: false, options: childrenOptions, selectedOptions: children, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
    ];


    return (<>
        <nav className="navbar navbar-expand-sm bg-white navbar-light px-4 mx-auto shadow-sm border-bottom py-3 justify-content-between">
            <div className="d-flex col-xl-3 col-lg-4">
                <div className=" align-items-center">
                    <a className="navbar-brand p-0" href="/"><img alt={"logo"} className="logo" src={Logo}></img></a>
                </div>
            </div>
        </nav>
        <div className="col-md-12 d-flex align-items-center p-0">
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={'Validation error'}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            {showForm && <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">
                <h2 className="col-md-10 p-0 mt-4 ml-5 text-center" id="text-indii-blue">{"Employee Registration"}</h2>
                <FormsNew
                    view="employees"
                    formTitle={''}
                    redirectURL={'/manage-employees'}
                    formattedData={employeeData}
                    data={addEmployeeDetailsFields}
                    SetValues={setValues}
                ></FormsNew>
                <div className="company-tab-width mt-2 mb-3 mx-auto bg-white">
                    <CustomButton buttonName={"Save"} ActionFunction={() => onSave()} CustomStyle="my-3 float-right"></CustomButton>
                    <CustomButton buttonName={"Cancel"} ActionFunction={() => { navigate("/login"); window.location.reload() }} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                </div>
            </div>}
            {!showForm && <div className="company-tab-width full-page-height company_creation mt-2 mb-3 mx-auto border bg-white"> <h2 className="col-md-10 p-0 mt-4 ml-5 text-center text-danger " >{"Un Authorized"}</h2></div>}
        </div>
    </>
    )
} 