import React, { useState, useEffect } from "react";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { EmployeeCreateApiUrl, EmployeeApiUrl, EmployeeBenefitsApiUrl } from "../../routes/ApiEndPoints";
import FormsNew from "./FormsNew";
import { Axios } from "axios";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import EditIcon from "../../static/icons/edit-dark.svg"
import CustomButton from "../atoms/CustomButton"
import { toast } from 'react-toastify';

export default function EmployeeDetailsUpdateForm({ data, eid, refId, setRefId, response, redirectURL, setShowAddress, showAddress, setShowDetails, showDetails, setDataRefresh, dataRefresh, tab, showExtraBenifits, setShowExtraBenefits }) {
    const [langaugeList, setLangaugeList] = useState([])
    const [maritalStausList, setMaritalStatusList] = useState([])
    const [genderList, setGenderList] = useState([])
    const [dependentSpouseList, setDependentSpouseList] = useState([])
    const [langauge, setLanguage] = useState("")
    const [gender, setGender] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("")
    const [dependantSpouse, setDependantSpouse] = useState("")
    const [formData, setFormData] = useState(response.data)
    const [children, setChildren] = useState([]);
    const [fuelCard, setFuelCard] = useState("")
    const [companyCar, setCompanyCar] = useState("")
    const [mealVoucher, setMealVoucher] = useState("")
    const [mealVoucherList, setMealVoucherList] = useState([])
    const [mealVoucherDetails, setMealVoucherDetails] = useState([])

    const MaximumChildren = 10;
    let count = 0
    let childrenOptions = [];
    while (count <= MaximumChildren) {
        childrenOptions.push({ value: count, label: count })
        count = count + 1
    }

    useEffect(() => {

        if (tab == "tab6") {

            AXIOS.service(EmployeeBenefitsApiUrl + "/create", "GET")
                .then((result) => {
                    if (result?.success) {
                        let data = result.data
                        setMealVoucherList(getFormattedDropdownOptions(data.meal_vouchers))
                        //to prefill the meal voucher amount  field based on delected meal voucher
                        setMealVoucherDetails(data.meal_vouchers)
                        let benefitsdata = {
                            "social_secretary_number": response.social_secretary_number,
                            "contract_number": response.contract_number,
                            "fuel_card": false,
                            "company_car": false,
                            "clothing_compensation": response.benefits.clothing_compensation,
                            "clothing_size": response.benefits.clothing_size,
                            "meal_voucher_id": response.benefits.meal_voucher_id,
                            "clothing_compensation": response.benefits.clothing_compensation_european,
                            "meal_voucher_amount": response.benefits.meal_voucher.amount_formatted,
                        }
                        setFormData(benefitsdata)
                        setMealVoucher(getFormattedDropdownOptions(response.benefits.meal_voucher))
                        YesNoOptions.map((val) => {
                            if (val.value == response.benefits.company_car) {
                                setCompanyCar(val)
                            }
                            if (val.value == response.benefits.fuel_card) {
                                setFuelCard(val)
                            }

                        })

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            AXIOS.service(EmployeeCreateApiUrl + "/create", "GET")
                .then((result) => {
                    if (result?.success) {
                        let data = result.data
                        setGenderList(getFormattedDropdownOptions(data.genders))
                        setLangaugeList(getFormattedDropdownOptions(data.languages, "key", "value"))
                        setMaritalStatusList(getFormattedDropdownOptions(data.marital_statuses))
                        setDependentSpouseList(getFormattedDropdownOptions(data.dependent_spouse_options, "key", "value"))
                        setLanguage({ "value": response.language.id, "label": response.language.name })
                        setMaritalStatus({ "value": response.marital_status.id, "label": response.marital_status.name })
                        setGender({ "value": response.gender.id, "label": response.gender.name })
                        setDependantSpouse({ "value": response.dependent_spouse.id, "label": response.dependent_spouse.name })
                        setChildren(selectedOptions(childrenOptions, response.children))

                        //modifying response passed from emp details.js as required for update
                        let userData = { ...response }
                        userData["marital_status_id"] = response.marital_status.id
                        userData["gender_id"] = response.gender.id
                        userData["dependent_spouse"] = response.dependent_spouse.id
                        userData["language"] = response.language.id
                        userData["place_of_birth"] = response.place_of_birth == null ? "" : response.place_of_birth
                        userData["license_expiry_date"] = response.license_expiry_date == null ? "" : response.license_expiry_date
                        setFormData(userData)

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])


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

    const selectedOptions = (data, id) => {

        let option = data.filter((obj) => {

            if (obj.value == id) {
                return obj
            }
        })
        return option[0]
    }


    const setValues = (index, name, value, field) => {
        const employees = { ...formData };
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
            } else if (name === 'dependant_spouse') {
                setDependantSpouse(value)
            } else if (name === 'children') {
                setChildren(value)
            }
            employees[name] = value.value
        }
        setFormData(employees);
    }

    const setExtraBenefitsValue = (index, name, value, field) => {
        const benefits = { ...formData };
        if (field !== 'dropdown') {
            benefits[name] = value
        } else {
            if (name === 'fuel_card') {
                setFuelCard(value)
            } else if (name === 'company_car') {
                setCompanyCar(value)
            } else {
                setMealVoucher(value)
                mealVoucherDetails.map((val) => {
                    if (val.id === value.value) {
                        benefits['meal_voucher_amount'] = val.amount_formatted
                    }
                })
            }
            benefits[name] = value.value
        }
        setFormData(benefits);
    }
    const onSave = () => {

        if (tab == "tab6") {
            let url = EmployeeBenefitsApiUrl + "/" + eid
            AXIOS.service(url, "PUT", formData)
                .then((result) => {
                    if (result?.success) {
                        setDataRefresh(!dataRefresh)
                        setShowAddress(false)
                        setShowDetails(false)
                        setShowExtraBenefits(false)
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
        } else {
            let url = EmployeeApiUrl + "/" + eid
            AXIOS.service(url, "PUT", formData)
                .then((result) => {
                    if (result?.success) {
                        setDataRefresh(!dataRefresh)
                        setShowAddress(false)
                        setShowDetails(false)
                        setShowExtraBenefits(false)
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

    }

    let detailsArray = [
        { title: "First name", name: "first_name", type: "text", required: true, style: "col-md-6 float-left mt-2" },
        { title: "Social security number", name: "social_security_number", type: "text", required: true, style: "col-md-6 float-left mt-2" },
        { title: "Last name", name: "last_name", type: "text", required: true, style: "col-md-6 float-left mt-2" },
        { title: "Expiry date", name: "license_expiry_date", type: "date", required: false, style: "col-md-6 float-left mt-2" },
        { title: "Mobile number", name: "phone_number", type: "text", required: true, style: "col-md-6 float-left mt-2" },
        { title: "Bank account number", name: "account_number", type: "text", required: false, style: "col-md-6 float-left mt-2" },
        { title: "Email", name: "email", type: "text", required: true, style: "col-md-6 float-left mt-2" },
        { title: "Language", name: "language", type: "dropdown", options: langaugeList, selectedOptions: langauge, required: true, style: "col-md-6 float-left mt-2" },
        { title: "Gender", name: "gender", type: "dropdown", options: genderList, selectedOptions: gender, required: true, style: "col-md-6 float-left mt-2" },
        { title: "Marital status", name: "marital_status_id", type: "dropdown", options: maritalStausList, selectedOptions: maritalStatus, required: true, style: "col-md-6 float-left mt-2" },
        { title: "DOB", name: "date_of_birth", type: "date", required: true, style: "col-md-6 float-left mt-2" },
        { title: "Dependant spouse", name: "dependent_spouse", required: true, options: dependentSpouseList, selectedOptions: dependantSpouse, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: "Place of birth", name: "place_of_birth", type: "text", required: false, style: "col-md-6 float-left mt-2" },
        { title: "Childrens", name: "children", required: false, options: childrenOptions, selectedOptions: children, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: "Nationality", name: "nationality", type: "text", required: true, style: "col-md-6 mt-2 float-left" },
    ]


    let addressArray = [
        { title: "Street+house no", name: "street_house_no", type: "text", required: true, style: "col-md-12 float-left mt-3" },
        { title: "City", name: "city", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: "Country", name: "country", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: "Postal code", name: "postal_code", type: "text", required: true, style: "col-md-6 float-left mt-3" },
    ]

    const YesNoOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]

    const extraBenefitsArray = [
        { title: "Social secretory number", name: "social_secretary_number", required: false, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Contract number", name: "contract_number", required: false, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Company car", name: "company_car", required: false, options: YesNoOptions, selectedOptions: companyCar, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: "Company fuel card", name: "fuel_card", required: false, options: YesNoOptions, selectedOptions: fuelCard, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: "Clothing compensation(Euros)", name: "clothing_compensation", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Meal Voucher type", name: "meal_voucher_id", required: false, options: mealVoucherList, selectedOptions: mealVoucher, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: "Meal Voucher amount", name: "meal_voucher_amount", required: false, type: "text", disabled: true, style: "col-md-6 mt-4 float-left" },
    ];

    return (
        <>
            {tab == "tab1" && <FormsNew
                data={detailsArray}
                SetValues={setValues}
                formattedData={formData}
                redirectURL={redirectURL}
                OnSave={onSave} mealVoucherList
                setRefId={setRefId}
            ></FormsNew>}
            {tab !== "tab6" && <div className={showAddress ? "ml-5 mb-1 " : "ml-5 mb-5"}>
                <div className={"font-weight-bold col-md-6 row mb-1"}>
                    <div className="col-md-6 pl-0"><h4 className="col-md-6 mb-1 ml-0 float-left" id="text-indii-blue">{"Address"}</h4></div>
                    <div className="col-md-6"><img className="float-right pr-3 pt-0" src={EditIcon} onClick={() => { setShowAddress(true) }}></img></div>
                    {!showAddress && <p className="mb-0 col-md-8">{response.street_house_no + ", " + response.city + ", " + response.country + ", " + response.postal_code}</p>}
                </div>
            </div>}
            {showAddress && <div className="col-md-6 p-0 mr-0"><FormsNew
                data={addressArray}
                SetValues={setValues}
                formattedData={formData}
                redirectURL={redirectURL}
                OnSave={onSave}
                actionButtons={false}
                setRefId={setRefId}
            ></FormsNew></div>}
            {showExtraBenifits && tab == "tab6" && <FormsNew
                data={extraBenefitsArray}
                SetValues={setExtraBenefitsValue}
                formattedData={formData}
                redirectURL={redirectURL}
                OnSave={onSave} mealVoucherList
                setRefId={setRefId}
            ></FormsNew>}
            <div className="col-md-12 mb-3 text-right pr-5">
                <CustomButton buttonName={'Save'} ActionFunction={() => { onSave() }} CustomStyle=""></CustomButton>
                <CustomButton buttonName={'Cancel'} ActionFunction={() => { setShowAddress(false); setShowDetails(false); setShowExtraBenefits(false) }} CustomStyle="mr-3"></CustomButton>
            </div>
        </>
    )
}