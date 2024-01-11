import React, { useState, useEffect } from "react";
import CustomButton from "../atoms/CustomButton";
import TextInput from "../atoms/formFields/TextInput";
import CustomPhoneInput from "../atoms/formFields/CustomPhoneInput";
import { t } from "../../translations/Translation";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { UserDetailsApiUrl, EmployeeCreateApiUrl, UpdateUserDetailsApiUrl } from "../../routes/ApiEndPoints";
import FormsNew from "./FormsNew";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";

export default function ProfileData({ title, edit, setEditStatus, type }) {

    //set Profile data from api call
    const [firstName, setFirstName] = useState("Employee");
    const [lastName, setLastName] = useState("01");
    const [mobileNumber, setMobileNumber] = useState("32123456789");
    const [gender, setGender] = useState("");
    const [genderList, setGenderList] = useState([])

    const [initialData, setInitialData] = useState({})
    const [formData, setFormData] = useState({

        "first_name": "",
        "last_name": "",
        "email": "",
        "phone_number": "",
        "gender_id": "",
        "date_of_birth": "",
        "place_of_birth": "",
        "nationality": "",
        "social_security_number": "",
        "street_house_no": "",
        "city": "",
        "country": "",
        "postal_code": "",
    })

    const [refresh, setRefresh] = useState(false)
    const [errors, setErrors] = useState([]);



    useEffect(() => {

        let genderArrays = []
        AXIOS.service(EmployeeCreateApiUrl + "/create", "GET")
            .then((result) => {
                if (result?.success) {
                    let data = result.data
                    setGenderList(getFormattedDropdownOptions(data.genders))
                    genderArrays = getFormattedDropdownOptions(data.genders)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        AXIOS.service(UserDetailsApiUrl, "GET")
            .then((result) => {
                if (result?.success) {
                    let data = result.data
                    data.user_id = localStorage.getItem("userId")
                    setFormData(data)
                    setInitialData(data)
                    genderArrays = genderArrays.filter((item) => {
                        if (result.data?.gender_id == item.value) {
                            return item;
                        }
                    })
                    setGender(genderArrays[0])

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [refresh])

    const profile = [
        { label: t("FIRST_NAME"), value: initialData.first_name },
        { label: t("LAST_NAME"), value: initialData.last_name },
        { label: t("EMAIL"), value: initialData.email },
        { label: t("MOBILE_NUMBER"), value: initialData.phone_number },
        { label: t("GENDER"), value: gender?.label },
        { label: t("DATE_OF_BIRTH"), value: initialData.date_of_birth },
        { label: t("PLACE_OF_BIRTH"), value: initialData.place_of_birth },
        { label: t("NATIONALITY"), value: initialData.nationality },
        { label: t("SSN"), value: initialData.social_security_number },
    ]

    const address = [
        { label: t("STREET_HOUSE"), value: initialData.street_house_no },
        { label: t("POSTAL_CODE"), value: initialData.postal_code },
        { label: t("CITY"), value: initialData.city },
        { label: t("COUNTRY"), value: initialData.country },
    ]

    let fieldData = (type == "address") ? address : profile

    let fieldsArray = (type == "address") ? [
        { title: t("STREET_HOUSE"), name: "street_house_no", type: "text", required: true, style: "col-md-12 float-left mt-3" },
        { title: t("CITY"), name: "city", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: t("COUNTRY"), name: "country", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: t("POSTAL_CODE"), name: "postal_code", type: "text", required: true, style: "col-md-6 float-left mt-3" },
    ] : [
        { title: t("FIRST_NAME"), name: "first_name", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: t("LAST_NAME"), name: "last_name", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: t("EMAIL"), name: "email", type: "text", required: true, style: "col-md-6 float-left mt-3" },
        { title: t("MOBILE_NUMBER"), name: "phone_number", type: "phone_input", required: true, style: "col-md-6 float-left mt-3" },
        { title: t("PLACE_OF_BIRTH"), name: "place_of_birth", type: "text", required: false, style: "col-md-6 float-left mt-3" },
        { title: t("NATIONALITY"), name: "nationality", type: "text", required: true, style: "col-md-6 mt-3 float-left" },

        { title: t("DATE_OF_BIRTH"), name: "date_of_birth", type: "date", required: true, style: "col-md-6 float-left mt-4" },
        { title: t("GENDER"), name: "gender_id", type: "dropdown", options: genderList, selectedOptions: gender, required: true, style: "col-md-6 float-left" },
        { title: t("SSN"), name: "social_security_number", type: "text", required: true, style: "col-md-6 float-left mt-3" },
    ]

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

    const setValues = (index, name, value, field) => {
        const newData = { ...formData };
        if (field !== 'dropdown') {
            if (name === 'social_security_number') {
                if (value.length <= 15) {
                    newData[name] = [2, 5, 8, 12].includes(value.length) ? (value + (value.length === 8 ? '-' : '.')) : value
                }
                if (value.length >= 8) {
                    newData["date_of_birth"] = formatDate(value)
                }
            } else {
                newData[name] = value
            }
        } else {
            if (name === 'gender_id') {
                setGender(value);
                newData[name] = value.value
            }
        }
        setFormData(newData);
    }

    const onSave = () => {

        AXIOS.service(UpdateUserDetailsApiUrl, "POST", formData)
            .then((result) => {
                if (result?.success) {
                    setRefresh(!refresh)
                    setEditStatus(false)
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
                } else {
                    setErrors(result.message[0]) //in back end error msg coming in the form of string ,it should be an array
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const onCancel = () => {
        setEditStatus(false)
        setFormData(initialData)
    }


    return (<>
        {errors !== undefined && errors.length !== 0 && <ErrorPopup
            title={t("VALIDATION_ERROR") + ("!")}
            body={(errors)}
            onHide={() => setErrors([])}
        ></ErrorPopup>}
        <h2 className="col-md-10 p-0 mt-4 mb-3 ml-5 " id="text-indii-blue">{title}</h2>
        <div className="col-md-12 font-details pt-2">
            {!edit && (fieldData).map((val, index) => {
                return (
                    <div key={val.label} className={"font-weight-bold col-md-12 row m-0 mb-1"}>
                        <label className="col-md-3 mb-1 pr-0 text-secondary">{val.label}:</label>
                        <p className="mb-0 col-md-9 mb-3">{val.value}</p>
                    </div>

                )
            })}
            {edit &&
                <FormsNew
                    view={"filters"}
                    data={fieldsArray}
                    SetValues={setValues}
                    formattedData={formData}
                    actionButtons={false}
                ></FormsNew>
            }
        </div>
        {edit && <div className="float-right col-md-12 text-right mr-3 mb-1">
            <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()}></CustomButton>
            <CustomButton buttonName={t("CANCEL")} ActionFunction={() => onCancel()}></CustomButton>
        </div>}
    </>
    );
}

