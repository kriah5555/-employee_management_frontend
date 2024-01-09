import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { ResponsibleCompaniesApiUrl, PublicHolidayCodeApiUrl } from "../../routes/ApiEndPoints"
import { t } from "../../translations/Translation";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";

export default function AddPublicHoliday() {

    const [formData, setFormData] = useState({
        "name": "",
        "date": "",
        "companies": [],
        "status": 1,
    })

    const [companies, setCompanies] = useState([])
    const [companyList, setCompanyList] = useState([])
    const [errors, setErrors] = useState([]);
    const [active, setActive] = useState(1);
    const [inactive, setInactive] = useState(0);

    const navigate = useNavigate();
    const params = useParams();



    useEffect(() => {
        AXIOS.service(ResponsibleCompaniesApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    let resp = getFormattedDropdownOptions(result.data, "id", "company_name")
                    setCompanyList(resp);
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    useEffect(() => {
        if (params.id !== undefined) {
            AXIOS.service(PublicHolidayCodeApiUrl + '/' + params.id, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let selectedCompanyList = []
                        result.data?.companies_value.map((val) => {
                            selectedCompanyList.push(val.value)
                        })
                        setCompanies(result.data?.companies_value)
                        let data = {
                            "name": result.data?.name,
                            "date": result.data?.date,
                            "companies": selectedCompanyList,
                            "status": result.data?.status,
                        }
                        setFormData(data)
                        if (result.data?.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }, [])


    const setValues = (index, name, value, field) => {
        const newData = { ...formData };
        if (field !== 'dropdown') {
            newData[name] = value
        } else {
            setCompanies(value);
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            newData[name] = arr
        }
        setFormData(newData);
    }


    const onSave = () => {

        let status = 1
        if (inactive) { status = 0 }

        setFormData['status'] = status

        let url = PublicHolidayCodeApiUrl
        let method = 'POST'

        // Updation url and method
        if (params.id !== undefined) {
            url = PublicHolidayCodeApiUrl + '/' + params.id
            method = 'PUT'
        }
        // APICall for create and updation of holiday code
        AXIOS.service(url, method, formData)
            .then((result) => {
                if (result?.success) {
                    navigate('/manage-holiday-configurations/public_holiday_configuration');
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
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const statusCheckBoxList = [
        {
            key: "active",
            name: t("ACTIVE"),
            checked: active
        },
        {
            key: "inactive",
            name: t("INACTIVE"),
            checked: inactive
        }
    ];

    const changeCheckbox = (type) => {
        if (type === 'active') {
            setActive(1);
            setInactive(0);
        } else {
            setActive(0);
            setInactive(1);
        }
    }

    const publicHolidayFields = [
        { title: t("HOLIDAY_NAME"), name: "name", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("DATE"), name: "date", type: "date", required: true, style: "col-md-6 float-left mt-4" },
        { title: t("COMPANIES_TEXT"), name: "companies", required: true, options: companyList, isMulti: true, selectedOptions: companies, type: "dropdown", style: "col-md-6 float-left" },
        { title: t("STATUS_TEXT"), checkboxList: statusCheckBoxList, changeCheckbox: changeCheckbox, type: "checkbox", style: "col-md-12 mt-4 mb-2 float-left" },

    ];

    return (
        <div className="right-container">
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="public_holiday"
                formTitle={t("ADD_PUBLIC_HOLIDAY")}
                redirectURL={'/manage-holiday-configurations/public_holiday_configuration'}
                formattedData={formData}
                data={publicHolidayFields}
                SetValues={setValues}
                OnSave={onSave}
            ></FormsNew>
        </div>
    )
}