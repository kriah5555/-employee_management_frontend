import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import { t } from "../../translations/Translation"
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { ResponsibleCompaniesApiUrl } from "../../routes/ApiEndPoints";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { toast } from "react-toastify";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";

export default function ExportConfiguration() {

    const navigate = useNavigate()
    const [company, setCompany] = useState("")
    const [companyList, setCompanyList] = useState([])
    const [seletedStarTimeType, setSelectedStartTimeType] = useState("")
    const [selectedEndTimeType, setSelectedEndTimeType] = useState("")
    const [selectedWorkTime, setSelectedWorkTime] = useState("")
    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        "company_id": "",
        "start_time_type": "",
        "end_time_type": "",
        "work_time": "",
        "default_break_time": "",
        "measured_break_time": "",
        "night_worked_hours": "",
    })

    const timeTypeOptions = [
        { value: 1, label: 'Exact' },
        { value: 2, label: 'Round by plan' },
        { value: 3, label: 'Round by quarterly' },
    ]
    const workTimeOptions = [
        { value: 1, label: 'Exact' },
        { value: 2, label: 'Rounded' }
    ]

    useEffect(() => {
        AXIOS.service(ResponsibleCompaniesApiUrl, "GET")
            .then((result) => {
                if (result?.success) {
                    setCompanyList(getFormattedDropdownOptions(result.data, 'id', 'company_name'))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const companyArray = [
        { title: t("COMPANY"), name: "company_id", required: true, options: companyList, selectedOptions: company, isMulti: false, type: 'dropdown', style: "col-md-8 p-0" },
    ]
    const formFieldsArray1 = [
        { title: t("START_TIME_TYPE"), name: "start_time_type", required: true, options: timeTypeOptions, selectedOptions: seletedStarTimeType, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2" },
        { title: t("END_TIME_TYPE"), name: "end_time_type", required: true, options: timeTypeOptions, selectedOptions: selectedEndTimeType, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2" },
        { title: t("WORK_TIME"), name: "work_time", required: true, options: workTimeOptions, selectedOptions: selectedWorkTime, isMulti: false, type: 'dropdown', style: "col-md-6 mt-2" },
        { title: t("DEFAULT_BREAK_TIME"), name: "default_break_time", required: false, type: 'switch', style: "col-md-12 d-flex mt-4" },
        { title: t("MEASURED_BREAK_TIME"), name: "measured_break_time", required: false, type: 'switch', style: "col-md-12 d-flex mt-2" },
        { title: t("NIGHT_WORKED_HOURS"), name: "night_worked_hours", required: false, type: 'switch', style: "col-md-12 d-flex mt-2" },
    ]

    const setValues = (index, name, value, type) => {
        console.log(index, name, value, type);
        let newData = { ...formData }
        if (type !== "dropdown") {
            newData[name] = value
        } else {
            if (name === 'company_id') {
                setCompany(value)
                newData[name] = value.value

            } else if (name === 'start_time_type') {
                setSelectedStartTimeType(value)
                newData[name] = value.value
            } else if (name === 'end_time_type') {
                setSelectedEndTimeType(value)
                newData[name] = value.value
            } else if (name === 'work_time') {
                setSelectedWorkTime(value)
                newData[name] = value.value
            }
        }
        setFormData(newData)
    }

    const onSelect = () => {
        if (company) {

            setShow(true)
        } else {
            setErrors(["Please select Company"])
        }
    }

    const onSave = () => {

        let url = ''
        // AXIOS.service(url, "GET")
        //     .then((result) => {
        //         if (result?.success) {
        //             toast.success(result.message[0], {
        //                 position: "top-center",
        //                 autoClose: 2000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "colored",
        //             });
        //         } else {
        //             setErrors(result.message)
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        // console.log(formData);

    }
    return (
        <>
            <div className="d-flex mb-2">
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={t("VALIDATION_ERROR") + ("!")}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                <div className="col-md-6">
                    <FormsNew
                        view=""
                        formTitle={''}
                        formattedData={company}
                        data={companyArray}
                        SetValues={setValues}
                    ></FormsNew>
                </div>
                <div className="col-md-3 my-auto text-left">
                    <CustomButton buttonName={t("SELECT_COMPANY")} ActionFunction={() => onSelect()} CustomStyle="my-4 mr-2"></CustomButton>
                </div>
            </div>
            {show && <><FormsNew
                data={formFieldsArray1}
                formattedData={formData}
                SetValues={setValues}
                redirectURL={"/configurations"}
                OnSave={onSave}
            >
            </FormsNew>
                <div className={" mb-3 text-right pr-3 mt-5"}>
                    <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                    <CustomButton buttonName={t("BACK_LINK")} ActionFunction={() => navigate("/configurations")} CustomStyle="mr-3"></CustomButton>
                </div></>}
        </>

    )
}