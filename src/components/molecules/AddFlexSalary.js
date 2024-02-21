import React, { useState, useEffect } from "react";
import FormsNew from "./FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast, ToastContainer } from 'react-toastify';
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { FlexSalaryCreateOrUpdateApiUrl } from "../../routes/ApiEndPoints"
import { t } from "../../translations/Translation";

export default function AddFlexSalary() {

    const [formData, setFormData] = useState({
        "value": ""
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        AXIOS.service(FlexSalaryCreateOrUpdateApiUrl + '/flex_min_salary', 'GET')
            .then((result) => {
                if (result?.success) {
                    let data = { "value": result?.data?.europian_format }
                    setFormData(data)
                }
            });
    }, [])

    const setValues = (index, name, value, field) => {
        let newData = { ...formData }
        newData['value'] = value;
        setFormData(newData);
    }

    const fieldsArray = [
        { title: t('FLEX_SALARY'), name: 'value', required: true, type: 'text', style: 'col-md-6 mt-4 float-left' },
    ];

    const onSave = () => {

        AXIOS.service(FlexSalaryCreateOrUpdateApiUrl, 'POST', formData)
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
                } else {
                    setErrors(result.message);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="right-container add_public_holidays">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="flex salary"
                formTitle={t("ADD_FLEX_SALARY")}
                redirectURL={'/manage-configurations/min_salary'}
                formattedData={formData}
                data={fieldsArray}
                SetValues={setValues}
                OnSave={onSave}
            ></FormsNew>
        </div >
    );
}