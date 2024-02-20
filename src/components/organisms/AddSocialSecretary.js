import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { SocialSecretaryApiUrl } from "../../routes/ApiEndPoints"
import { t } from "../../translations/Translation";

export default function AddSocialSecretary() {

    const [socialSecretaryData, setSocialSecretaryData] = useState({
        name: "",
        status: "",
    });

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    // Checkbox status data
    const changeCheckbox = (type) => {
        if (type === 'active') {
            setActive(true);
            setInactive(false);
        } else {
            setActive(false);
            setInactive(true);
        }
    }
    const checkboxList = [
        {
            name: t("ACTIVE"),
            key: 'active',
            checked: active,
        },
        {
            name: t("INACTIVE"),
            key: 'inactive',
            checked: inactive,
        }
    ]

    // Fetch data of social secretary for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = SocialSecretaryApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data
                        let data = {
                            "name": response.name
                        }
                        setSocialSecretaryData(data);
                        if (response.status) { setActive(true) } else { setInactive(true); setActive(false) }
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
    const socialSecretaryFields = [
        { title: t("SOCIAL_SECRETARY_NAME"), name: 'name', required: true, type: 'text', style: 'col-md-12 mt-4 float-left' },
        { title: t("STATUS_TEXT"), required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
    ];

    // Function to set values of social secretary
    const setValues = (index, name, value, field) => {
        const ss_data = { ...socialSecretaryData };
        ss_data[name] = value
        setSocialSecretaryData(ss_data);
    }

    // On submit function for create and update social secretary
    const OnSave = () => {
        if (socialSecretaryData.name) {
            let status = 1
            if (inactive) { status = 0 }

            socialSecretaryData['status'] = status

            // Creation url and method
            let url = SocialSecretaryApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = SocialSecretaryApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of social secretary
            AXIOS.service(url, method, socialSecretaryData)
                .then((result) => {
                    if (result?.success) {
                        navigate('/manage-configurations/social_secretary');
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
                view="social secretary"
                formTitle={t("ADD_SOCIAL_SECRETARY")}
                redirectURL={'/manage-configurations/social_secretary'}
                formattedData={socialSecretaryData}
                data={socialSecretaryFields}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew>
        </div>
    );
}