import React, { useState, useEffect } from "react";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import FormsNew from "../molecules/FormsNew";
import CustomButton from "../atoms/CustomButton";

export default function AddEmailTemplate() {

    const navigate = useNavigate();
    const params = useParams();
    const [errors, setErrors] = useState("")
    const [formData, setFormdata] = useState({
        "subject": "",
        "preview": ""
    })

    //function to set values
    const SetValues = (index, name, value) => {
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    //form fields array
    const fieldData = [
        { title: "Subject", name: "subject", required: true, type: "text", style: "col-md-12 mt-4" },
        { title: "Preview", name: "preview", required: true, type: "editor", style: "col-md-12 mt-4" },
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

    //function to save data
    const OnSave = () => {
        navigate('/manage-communication-configurations/email');
    }

    return (
        <>
            <div className="right-creation-container ">
                <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                    <h4 className="mb-0 text-color">
                        <img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-communication-configurations/email')} src={BackIcon}></img>
                        Add Email template
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
                        formattedData={formData}
                        data={fieldData}
                        SetValues={SetValues}
                        OnSave={OnSave}
                    />
                </div>
            </div>
        </>
    );
};