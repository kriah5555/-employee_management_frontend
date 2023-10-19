import React, { useState, useEffect } from "react";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import FormsNew from "../molecules/FormsNew";
import { EmailTemplateApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from '../../services/AxiosServices';
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
    const [formData, setFormdata] = useState({
        "template_type": "",
        "status":true,
        "subject": {},
        "body": {}
    })
    const [langauge, setLanguage] = useState('en');

    useEffect(() => {
        if (params.id) {
            let editApiUrl = EmailTemplateApiUrl + "/" + params.id + "/edit"
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result.data) {
                        let response = result.data
                        setBody(response.details.body);
                        setSubject(response.details.subject);
                        let data = {
                            "subject": response.details.subject.en,
                            "body": response.details.body.en,
                        }
                        setFormattedData(data);
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
        setSubject((prevSubject) => ({ ...prevSubject, [langauge]: formattedData.subject }));
        setBody((prevBody) => ({ ...prevBody, [langauge]: formattedData.body }));
    };

    //form fields array
    const fieldData = [
        { title: "Subject", name: "subject", required: true, type: "text", style: "col-md-12 mt-4" },
        { title: "Preview", name: "body", required: true, type: "editor", style: "col-md-12 mt-4" },
    ];

    //token table headers
    const TableHeader = [
        {
            title: "Name",
            field: "name",
            size: 20.
        },
        {
            title: "Description",
            field: "value",
            size: 20.
        }
    ]

    // langauge array
    const langaugeArray = [{ label: "EN", value: "en" }, { label: "NL", value: "nl", }, { label: "FR", value: "fr" }];

    const onLangaugeSelect = (lang) => {
        setLanguage(lang)
        let data = {
            "subject": subject[lang],
            "body": body[lang]
        }
        //setting data display previous data
        setFormattedData(data)
    }


    //function to save data
    const OnSave = () => {
        
        setFormdata((prevData) => ({
            ...prevData,
            'body': body,
            'subject': subject
        }))

        navigate('/manage-communication-configurations/email');
    }

    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color d-flex ">
                    <div className="col-md-6 float-left">
                        <img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-communication-configurations/email')} src={BackIcon}></img>
                        Add Email template
                    </div>
                    <div className="col-md-6 float-right">
                        <ul className="d-flex float-right mr-5">
                            {langaugeArray.map((lang) => (
                                <li key={lang.value} className={"nav nav-item mx-2" + ((langauge == lang.value) ? " ui-state-active bordered" : "")} onClick={() => onLangaugeSelect(lang.value)}>{lang.label}</li>
                            ))}
                        </ul>
                    </div>
                </h4>
            </div>
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">
                <FormsNew
                    formTitle="email_template"
                    view='email template'
                    redirectURL={'/manage-communication-configurations/email'}
                    formattedData={formattedData}
                    data={fieldData}
                    SetValues={SetValues}
                    OnSave={OnSave}
                />
            </div>
        </div>
    );
};