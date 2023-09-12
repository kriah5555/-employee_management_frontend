import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { FunctionApiUrl, GroupFunctionApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";

export default function AddFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [functionTitle, setFunctionTitle] = useState('');
    const [functionCode, setFunctionCode] = useState('');
    const [functionDesc, setFunctionDesc] = useState('');
    const [functionCategory, setFunctionCategory] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const [titleError, SetTitleError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [CategoryError, setCategoryError] = useState('');

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

    const [FunctionsList, setFunctionsList] = useState([])

    //Fetch dropdown data of group functions
    useEffect(() => {
        if (!params.id) {
            let addApiUrl = FunctionApiUrl + '/create';
            AXIOS.service(addApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setFunctionsList(result.data.function_categories);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    // Fetch sector data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = FunctionApiUrl + '/' + params.id + '/edit';
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (!result.error && result?.success) {
                        setFunctionTitle(result.data.details.name);
                        setFunctionCode(result.data.details.function_code);
                        setFunctionDesc(result.data.details.description ? result.data.details.description : '');
                        setFunctionsList(result.data.function_categories);
                        setFunctionCategory(result.data.details.function_category_value);
                        if (result.data.details.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        console.log(result.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])



    // Field data
    const function_title = {
        title: 'Function title',
        name: 'function_title',
        placeholder: 'Enter function title',
        required: true,
        value: functionTitle,
    }

    const function_code = {
        title: 'Function code',
        name: 'function_code',
        placeholder: 'Enter function code',
        required: true,
        value: functionCode
    }

    const function_group = {
        title: 'Function categories',
        name: 'function_group',
        required: true,
        options: FunctionsList,
        value: functionCategory,
        isMulti: false
    }

    const function_desc = {
        title: 'Function description',
        name: 'function_desc',
        required: false,
        value: functionDesc
    }

    const function_status = {
        title: 'Status',
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
            if (value) { SetTitleError(''); } else { SetTitleError('Required'); }
        } else if (type === 2) {
            setFunctionCode(value)
            if (value) { setCodeError(''); } else { setCodeError('Required'); }
        } else if (type === 3) {
            setFunctionCategory(value)
            if (value) { setCategoryError(''); } else { setCategoryError('Required'); }
        } else {
            setFunctionDesc(value)
        }
    }


    const OnSave = () => {
        if (functionTitle === '') {
            SetTitleError('Required');
        }
        if (functionCode === '') {
            setCodeError('Required');
        }
        if (functionCategory === '') {
            setCategoryError('Required');
        }

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
                        setSuccessMessage(result.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    return (
        <div className="right-container">
            {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/functions')}
            ></ModalPopup>}
            {errorMessage && <ModalPopup
                title={('ERROR')}
                body={(errorMessage)}
                onHide={() => setErrorMessage('')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Function'}
                redirectURL={'/manage-configurations/functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={function_title}
                field2={function_code}
                field3={function_group}
                field5={function_desc}
                field6={function_status}
                error1={titleError}
                error2={codeError}
                error3={CategoryError}
                SetValues={SetValues}
                onSave={OnSave}
                view={'functions'}
            ></Forms>
        </div>
    )
}