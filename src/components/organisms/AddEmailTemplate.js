import React, { useState, useEffect } from "react";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import FormsNew from "../molecules/FormsNew";
import { EmailTemplateApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from '../../services/AxiosServices';
import Table from "../atoms/Table"
import { t } from "../../translations/Translation";

export default function AddEmailTemplate() {

    const navigate = useNavigate();
    const params = useParams();
    const [errors, setErrors] = useState("")
    const [formattedData, setFormattedData] = useState({})
    const [subject, setSubject] = useState({
        "en": "",
        "nl": "",
        'fr': "",
    })
    const [body, setBody] = useState({
        "en": "",
        "nl": "",
        'fr': "",
    })
    const [langauge, setLanguage] = useState('en');
    const [tokensList, setTokensList] = useState([])
    const [templateType, setTemplateType] = useState("")
    
    //api call to get email template details
    useEffect(() => {
        if (params.id) {
            let editApiUrl = EmailTemplateApiUrl + "/" + params.id + "/edit"
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result.data) {
                        let response = result.data
                        setBody(response.details.body);
                        setSubject(response.details.subject);
                        setTemplateType(response.details.template_type.value)
                        let data = {
                            "subject": response.details.subject.en,
                            "body": response.details.body.en,
                        }
                        setFormattedData(data)
                        //converting tokens to required form
                        const tokensData = Object.keys(response.tokens).map((key, i) => ({
                            name: key,
                            value: response.tokens[key],
                            id: i
                        }));

                        setTokensList(tokensData)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    //function to set values
    const SetValues = (index, name, value) => {
        setFormattedData((prevData) => ({ ...prevData, [name]: value }));
    };
    // to avoid delay in rendering current state values
    useEffect(() => {
        setSubject((prevSubject) => ({ ...prevSubject, [langauge]: formattedData.subject }));
        setBody((prevBody) => ({ ...prevBody, [langauge]: formattedData.body }));
    }, [formattedData.body, formattedData.subject])

    //form fields array
    const fieldData = [
        { title: t("SUBJECT"), name: "subject", required: true, type: "text", style: "col-md-12 mt-4" },
        { title: t("PREVIEW"), name: "body", required: true, type: "editor", style: "col-md-12 mt-4" },
    ];

    //token table headers
    const TableHeader = [
        {
            title: t("NAME_TEXT"),
            field: "name",
            size: 20.
        },
        {
            title: t("DESCRIPTION"),
            field: "value",
            size: 20.
        }
    ]

    // langauge array
    const langaugeArray = [{ label: "EN", value: "en" }, { label: "NL", value: "nl", }, { label: "FR", value: "fr" }];

    const onLangaugeSelect = (lang) => {
        setLanguage(lang)
        let data = {
            "subject": subject[lang] ? subject[lang] : "",
            "body": body[lang] ? body[lang] : ""
        }
        //setting data display previous data
        setFormattedData(data)
    }

    //function to save data
    const OnSave = () => {

        if (params.id !== undefined) {
            let data = {
                "template_type": templateType,
                "status": true,
                "body": body,
                "subject": subject
            }

            let apiUrl = EmailTemplateApiUrl + "/" + params.id


            AXIOS.service(apiUrl, "PUT", data)
                .then((result) => {
                    if (result?.success) {
                        navigate('/manage-communication-configurations/email');
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

    }

    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color d-flex ">
                    <div className="col-md-6 float-left d-flex align-items-center">
                        <img className="shortcut-icon mr-2 pointer " onClick={() => navigate('/manage-communication-configurations/email')} src={BackIcon} alt="Back"></img>
                        {t("ADD_EMAIL_TEMPLATE")}
                    </div>
                    <div className="col-md-6 float-right">
                        <ul className="d-flex float-right mr-5">
                            {langaugeArray.map((lang) => (
                                <li key={lang.value} className={"nav nav-item mx-2 " + ((langauge === lang.value) ? " font-weight-bolder underline" : "")} id={(langauge === lang.value) ? "text-indii-blue" : ""} onClick={() => onLangaugeSelect(lang.value)}>{lang.label}</li>
                            ))}
                        </ul>
                    </div>
                </h4>
            </div>
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white add_contracts_body ">
                <FormsNew
                    formTitle="email_template"
                    view='email template'
                    redirectURL={'/manage-communication-configurations/email'}
                    formattedData={formattedData}
                    data={fieldData}
                    SetValues={SetValues}
                    OnSave={OnSave}
                />
                <div className="px-5 pb-4">
                    <h4 className="mb-3">{t("TOKENS") + (":")}</h4>
                    <Table columns={TableHeader} rows={tokensList} tableName="tokens" />
                </div>
            </div>
        </div>
    );
};