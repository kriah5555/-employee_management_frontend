import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { DimonaNamespaceApiUrl } from "../../routes/ApiEndPoints"
import { t } from "../../translations/Translation";

export default function AddDimonaNamespace() {

    const [formData, setFormData] = useState({
        namespace: "",
        from_date: "",
        to_date: "",
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const params = useParams();


    // Fetch data of social secretary for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = DimonaNamespaceApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data
                        let data = {
                            "namespace": response.namespace,
                            'from_date': response.from_date,
                            'to_date': response.to_date,
                        }
                        setFormData(data);
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    // social secretary fields
    const formFields = [
        { title: t("DIMONA_NAMESPACE"), name: 'namespace', required: true, type: 'text', style: 'col-md-12 mt-4 float-left' },
        { title: t("FROM_DATE"), name: "from_date", required: true, type: "date", style: "col-md-6 mt-4 float-left" },
        { title: t("TO_DATE"), name: "to_date", required: true, type: "date", style: "col-md-6 mt-4 float-left" },
    ]

    // Function to set values of social secretary
    const setValues = (index, name, value, field) => {
        const newData = { ...formData };
        newData[name] = value
        setFormData(newData);
    }

    // On submit function for create and update social secretary
    const OnSave = () => {
        if (formData.namespace) {

            // Creation url and method
            let url = DimonaNamespaceApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = DimonaNamespaceApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of social secretary
            AXIOS.service(url, method, formData)
                .then((result) => {
                    if (result?.success) {
                        setSuccessMessage(result.message);
                        navigate('/manage-configurations/dimona_namespace');
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
        } else {
            setErrors([t("PLEASE_FILL_REQUIRED_FIELDS")])
        }
    }
    return (
        <div className="right-container add_public_holidays">
            {/* {successMessage && <ModalPopup
            title={('SUCCESS')}
            body={(successMessage)}
            onHide={() => navigate('/manage-configurations/social_secretary')}
        ></ModalPopup>} */}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="dimona namespace"
                formTitle={t("ADD_DIMONA_NAMESPACE")}
                redirectURL={'/manage-configurations/dimona_namespace'}
                formattedData={formData}
                data={formFields}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew>
        </div>
    );
}