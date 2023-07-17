import React, { useState } from "react";
import Forms from "../molecules/Forms";

export default function AddFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [functionTitle, setFunctionTitle] = useState('');
    const [functionCode, setFunctionCode] = useState('');
    const [functionDesc, setFunctionDesc] = useState('');


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
        console.log(value, type);
        if (type === 1) {
            setFunctionTitle(value)
        } else if (type === 2) {
            setFunctionCode(value)
        } else {
            setFunctionDesc(value)
        }
    }


    const OnSave = () => {
        let status = true
        if (inactive){ status = false }

        let data = {
            'function_title': functionTitle,
            'function_code': functionCode,
            'function_description': functionDesc,
            'status':status
        }
        console.log(data);
    }

    return (
        <div className="right-container">
            <Forms 
                formTitle={'Add Function'}
                redirectURL={'/manage-configurations/functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={function_title}
                field2={function_code}
                field3={function_desc}
                field4={function_status}
                SetValues={SetValues}
                onSave={OnSave}
                view={'functions'}
            ></Forms>
        </div>
    )
}