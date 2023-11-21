import React, { useState, useEffect } from "react";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import FormsNew from "../molecules/FormsNew";
import { ContractTemplateApiUrl, CompanyContractTemplateApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from '../../services/AxiosServices';
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import Table from "../atoms/Table"
export default function AddEmailTemplate() {

    const navigate = useNavigate();
    const params = useParams();
    const [errors, setErrors] = useState("")
    const [langauge, setLanguage] = useState('en');
    const [formData, setFormdata] = useState({
        "body": "",
        "status": "",
        "employee_type_id": "",
        "social_secretary_id": params.addType == 'company' ? 1 : 1,
        "company_id": params.addType == 'company' ? 1 : "",
        "language": langauge
    })
    const [employeeType, setEmployeeType] = useState("");
    const [employeeTypeList, setEmployeeTypeList] = useState([]);
    const [socialSecretary, setSocialSecretary] = useState([]);
    const [socialSecretaryList, setSocialSecretaryList] = useState([])
    const [tokensList, setTokensList] = useState([])

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');

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
            name: 'Active',
            key: 'active',
            checked: active,
        },
        {
            name: 'Inactive',
            key: 'inactive',
            checked: inactive,
        }
    ]


    // langauge array
    const langaugeArray = [{ label: "EN", value: "en" }, { label: "NL", value: "nl", }, { label: "FR", value: "fr" }];

    const onLangaugeSelect = (lang) => {
        setLanguage(lang)
        formData['language'] = lang
    }

    // api call to get options to create
    useEffect(() => {
        let editApiUrl = ContractTemplateApiUrl + "/create"
        AXIOS.service(editApiUrl, 'GET')
            .then((result) => {
                if (result.data) {
                    let response = result.data
                    setEmployeeTypeList(getFormattedDropdownOptions(response.employee_types))
                    setSocialSecretaryList(getFormattedDropdownOptions(response.social_secretaries))
                    //converting tokens object to array of object of tokens
                    const data = Object.keys(response.tokens).map((key, i) => ({
                        name: key,
                        value: response.tokens[key],
                        id: i
                    }));
                    setTokensList(data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    //api call to get email template details for edit
    useEffect(() => {

        if (params.id) {
            let editApiUrl = (params.addType === 'company' ? CompanyContractTemplateApiUrl : ContractTemplateApiUrl) + "/" + params.id
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result.data) {
                        let response = result.data
                        setLanguage(response.language)
                        setEmployeeType(getFormattedDropdownOptions(response.employee_type))

                        if (params.addType == 'template') {

                            setSocialSecretary(getFormattedDropdownOptions(response.social_secretary ? response.social_secretary : []))
                        }

                        let arr = [];
                        getFormattedDropdownOptions(response.social_secretary ? response.social_secretary : []).map((value) => {
                            arr.push(value.value);
                        })

                        let data = {
                            "body": response.body,
                            "employee_type_id": response.employee_type_id,
                            "social_secretary_id": arr,
                            "company_id": response.company_id ? response.company_id : "",
                            "language": response.language,
                        }
                        setFormdata(data);
                        if (response.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    //function to set values
    const SetValues = (index, name, value, type) => {

        if (type !== 'dropdown') {

            setFormdata((prevData) => ({ ...prevData, [name]: value }))

        } else {

            if (name == 'employee_type_id') {
                setEmployeeType(value)
                setFormdata((prevData) => ({ ...prevData, [name]: value.value }))
            } else if (name == 'social_secretary_id') {
                // let arr = []
                // value.map((val, i) => {
                //     arr.push(val.value)
                // })
                setSocialSecretary(value)
                // setFormdata((prevData) => ({ ...prevData, [name]: arr }))
                setFormdata((prevData) => ({ ...prevData, [name]: value.value }))
            }

        }
    }

    //form fields array
    const fieldData = (params.addType === 'company') ? [
        { title: "Employee type", name: "employee_type_id", required: true, type: "dropdown", options: employeeTypeList, selectedOptions: employeeType, style: "col-md-6 mt-2 float-left" },
        // { title: "Upload file", name: "file", required: true, type: "file", style: "col-md-12 mt-2 float-left" },
        { title: "Preview", name: "body", required: true, type: "editor", style: "col-md-12 mt-4 float-left" },
        { title: 'Status', required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
    ] : [
        { title: "Employee type", name: "employee_type_id", required: true, type: "dropdown", options: employeeTypeList, selectedOptions: employeeType, style: "col-md-6 mt-2 float-left" },
        { title: 'Social secretary', name: 'social_secretary_id', required: false, options: socialSecretaryList, selectedOptions: socialSecretary, isMulti: true, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: "Preview", name: "body", required: true, type: "editor", style: "col-md-12 mt-4 float-left" },
        { title: 'Status', required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
    ];

    //token table headers
    const TableHeader = [
        {
            title: "Name",
            field: "name",
            size: 200.
        },
        {
            title: "Description",
            field: "value",
            size: 200.
        }
    ]

    let navigateUrl = params.addType == 'template' ? "/manage-communication-configurations/contracts_template" : "/manage-companies"

    //function to save data
    const OnSave = () => {
        if (formData.body) {
            let status = 1
            if (inactive) { status = 0 }

            formData['status'] = status

            // Creation url and method
            let url = params.addType == 'template' ? ContractTemplateApiUrl : CompanyContractTemplateApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = ContractTemplateApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of social secretary
            AXIOS.service(url, method, formData)
                .then((result) => {
                    if (result?.success) {
                        setSuccessMessage(result.message);
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
                        navigate(navigateUrl);
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {

            setErrors(['Please fill required fields'])
        }
    }

    return (
        <>
            <div className="right-creation-container ">
                <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                    <h4 className="mb-0 text-color d-flex ">
                        <div className="col-md-6 float-left">
                            <img className="shortcut-icon mr-2 mb-1 " onClick={() => navigate(navigateUrl)} src={BackIcon}></img>
                            Add contract template
                        </div>
                        <div className="col-md-6 float-right">
                            <ul className="d-flex float-right mr-5">
                                {langaugeArray.map((lang) => (
                                    <li key={lang.value} className={"nav nav-item mx-2 " + ((langauge == lang.value) ? " font-weight-bolder underline" : "")} onClick={() => onLangaugeSelect(lang.value)} id={(langauge == lang.value) ? "text-indii-blue" : ""}>{lang.label}</li>
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
                        formTitle="contracts template"
                        view='contracts template'
                        redirectURL={navigateUrl}
                        formattedData={formData}
                        data={fieldData}
                        SetValues={SetValues}
                        OnSave={OnSave}
                    />
                    <div className="px-5 pb-4">
                        <h4 className="mb-3">Tokens:</h4>
                        <Table columns={TableHeader} rows={tokensList} tableName="tokens" />
                    </div>
                </div>
            </div>
        </>
    );
};