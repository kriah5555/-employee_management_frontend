import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { FunctionApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function AddFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [functionTitle, setFunctionTitle] = useState('');
    const [functionCode, setFunctionCode] = useState('');
    const [functionDesc, setFunctionDesc] = useState('');
    const [functionCategory, setFunctionCategory] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
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

    const [FunctionsList, setFunctionsList] = useState([])

    //Fetch dropdown data of group functions
    useEffect(() => {
        let addApiUrl = FunctionApiUrl + '/create';
        AXIOS.service(addApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setFunctionsList(getFormattedDropdownOptions(result.data.function_categories));
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch sector data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = FunctionApiUrl + '/' + params.id;
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (!result.error && result?.success) {
                        setFunctionTitle(result.data.name);
                        setFunctionCode(result.data.function_code);
                        setFunctionDesc(result.data.description);
                        setFunctionCategory(getFormattedDropdownOptions(result.data.function_category));
                        if (result.data.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])



    // Field data
    const function_title = {
        title: t("FUNCTION_TEXT"),
        name: 'function_title',
        placeholder: t("ENTER_FUNCTION_TITLE"),
        required: true,
        value: functionTitle,
    }

    const function_code = {
        title: t("FUNCTION_CODE"),
        name: 'function_code',
        placeholder: t("ENTER_FUNCTION_CODE"),
        required: true,
        value: functionCode
    }

    const function_group = {
        title: t("FUNCTION_CATEGORIES"),
        name: 'function_group',
        required: true,
        options: FunctionsList,
        value: functionCategory,
        isMulti: false
    }

    const function_desc = {
        title: t("FUNCTION_DESCRIPTION"),
        name: 'function_desc',
        required: false,
        value: functionDesc
    }

    const function_status = {
        title: t("STATUS_TEXT"),
        required: true
    }


    // Type:
    // 1: Function title
    // 2: Function code
    // 3: Function group
    // 5: Function description
    // 6: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setFunctionTitle(value)
        } else if (type === 2) {
            setFunctionCode(value)
        } else if (type === 3) {
            setFunctionCategory(value)
        } else {
            setFunctionDesc(value)
        }
    }


    const OnSave = () => {
        if (functionTitle && functionCode && functionCategory) {
            let status = 1
            if (inactive) { status = 0 }

            let data = {
                'name': functionTitle,
                'function_code': functionCode,
                'function_category_id': functionCategory.value,
                'description': functionDesc,
                'status': status
            }

            // Creation url and method
            let url = FunctionApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = FunctionApiUrl + '/' + params.id
                method = 'PUT'
            }

            AXIOS.service(url, method, data)
                .then((result) => {
                    if (result?.success) {
                        // setSuccessMessage(result.message);
                        navigate('/manage-configurations/functions');
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
        }  else {
            setErrors([t("PLEASE_FILL_REQUIRED_FIELDS")])
        }
    }


    return (
        <div className="right-container">
            {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/functions')}
            ></ModalPopup>}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <Forms
                formTitle={t("ADD_FUNCTION")}
                redirectURL={'/manage-configurations/functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={function_title}
                field2={function_code}
                field3={function_group}
                field5={function_desc}
                field6={function_status}
                SetValues={SetValues}
                onSave={OnSave}
                view={'functions'}
            ></Forms>
        </div>
    )
}