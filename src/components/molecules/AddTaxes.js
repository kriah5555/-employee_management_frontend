import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { TaxesApiUrl } from "../../routes/ApiEndPoints"
import { t } from "../../translations/Translation";

export default function AddTaxes() {

    const [formData, setFormData] = useState({
        "tax_from_date": "",
        "tax_to_date": "",
        "hourly_tax": "",
        "daily_max_tax": "",
        "employee_tax": "",
        "employer_tax": "",
        "year_end_bonus": "",
        "holiday_pay": "",
        "pay_type_tax_percentage": "",
    })

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        if (params.id !== undefined) {
        //     AXIOS.service(TaxesApiUrl + '/' + params.id, 'GET')
        //         .then((result) => {
        //             if (result?.success) {

        //             } else {
        //                 setErrors(result.message)
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })

        }
    }, [])


    const setValues = (index, name, value, field) => {
        const newData = { ...formData };
        newData[name] = value
        setFormData(newData);
    }


    const onSave = () => {

        let url = TaxesApiUrl
        let method = 'POST'

        // Updation url and method
        if (params.id !== undefined) {
            url = TaxesApiUrl + '/' + params.id
            method = 'PUT'
        }
        // APICall for create and updation of holiday code
        // AXIOS.service(url, method, formData)
        //     .then((result) => {
        //         if (result?.success) {
        //             navigate('/manage-social-secretary-and-reporting-configurations/taxes');
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

    }



    const Taxfields = [
        { title: t("TAX_FROM_DATE"), name: "tax_from_date", required: true, type: "date", style: "col-md-6 mt-4 float-left" },
        { title: t("TAX_TO_DATE"), name: "tax_to_date", type: "date", required: true, style: "col-md-6 float-left mt-4" },
        { title: t("HOURLY_TAX"), name: "hourly_tax", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("DAILY_MAXIMUM_TAX"), name: "daily_max_tax", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("EMPLOYEE_TAX"), name: "employee_tax", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("EMPLOYER_TAX"), name: "employer_tax", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("YEAR_END_BONUS"), name: "year_end_bonus", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("HOLIDAY_PAY"), name: "holiday_pay", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("PAY_TYPE_TAX_PERCENTAGE"), name: "pay_type_tax_percentage", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
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
                formTitle={t("ADD_TAXES")}
                redirectURL={'/manage-social-secretary-and-reporting-configurations/taxes'}
                formattedData={formData}
                data={Taxfields}
                SetValues={setValues}
                OnSave={onSave}
            ></FormsNew>
        </div>
    )
}