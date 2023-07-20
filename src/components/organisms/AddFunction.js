import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { FunctionApiUrl, GroupFunctionApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate } from "react-router-dom";

export default function AddFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [functionTitle, setFunctionTitle] = useState('');
    const [functionCode, setFunctionCode] = useState('');
    const [functionDesc, setFunctionDesc] = useState('');
    const [functionCategory, setFunctionCategory] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();


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

    const [FunctionsList, setFunctionList] = useState([])
        

    useEffect(() => {
        AXIOS.service(GroupFunctionApiUrl, 'GET')
            .then((result) => {
                console.log(result);
                result.map((val, index) => {
                    FunctionsList.push({value: val.id, label: val.name})
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

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
        // value: functionTitle,
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
    // 3: Function description
    // 4: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setFunctionTitle(value)
        } else if (type === 2) {
            setFunctionCode(value)
        }else if (type === 5){
            setFunctionCategory(value)
        } else {
            setFunctionDesc(value)
        }
    }


    const OnSave = () => {
        let status = 1
        if (inactive) { status = 0 }

        let data = {
            'name': functionTitle,
            'function_code': functionCode,
            'function_category_id': functionCategory.value,
            'description': functionDesc,
            'status': status
        }

        AXIOS.service(FunctionApiUrl, 'POST', data)
            .then((result) => {
                if (result && result.status === 200) {
                    console.log(result.message);
                } else {
                    setSuccessMessage(result.message);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="right-container">
            {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/functions')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Function'}
                redirectURL={'/manage-configurations/functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={function_title}
                field2={function_code}
                field3={function_desc}
                field4={function_status}
                field6={function_group}
                SetValues={SetValues}
                onSave={OnSave}
                view={'functions'}
            ></Forms>
        </div>
    )
}