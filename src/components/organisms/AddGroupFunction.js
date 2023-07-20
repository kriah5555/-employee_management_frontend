import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { FunctionApiUrl, GroupFunctionApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate } from "react-router-dom";

export default function AddGroupFunction() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sector, setSector] = useState('');
    const [functionTitle, setFunctionTitle] = useState('');
    const [description, setDescription] = useState('');
    const [functionCategory, setFunctionCategory] = useState('');
    const [groupName, setGroupName] = useState('')
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

    const[sectorList, setSectorList] = useState([])

    useEffect(() => {
        AXIOS.service(SectorApiUrl, 'GET')
            .then((result) => {
                console.log(result);
                if (result.length !== sectorList.length){
                    result.map((val, index) => {
                        sectorList.push({ value: val.id, label: val.name })
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    const categoriesList = []
    let count = 1
    while (count <= 20) {
        categoriesList.push({ value: count, label: count })
        count = count + 1
    }

    // Fields data
    const sector_title = {
        title: 'Sector',
        name: 'sector',
        placeholder: '',
        required: true,
        value: sector,
        options: sectorList,
        isMulti: false
    }

    const group_function_name = {
        title: 'Group function name',
        name: 'function_name',
        placeholder: 'Enter function name',
        required: true,
        value: groupName,
    }

    // const function_title = {
    //     title: 'Function code',
    //     name: 'function_code',
    //     placeholder: 'Enter function code',
    //     required: true,
    //     value: functionTitle,
    // }

    const function_category = {
        title: 'Function category',
        name: 'function_category',
        placeholder: '',
        required: true,
        value: functionCategory,
        options: categoriesList,
        isMulti: false
    }

    // const function_title = {
    //     title: 'Function title',
    //     name: 'function_title',
    //     required: true,
    //     options: FunctionsList,
    //     value: functionTitle,
    //     isMulti: false
    // }

    const group_function_desc = {
        title: 'Description',
        name: 'sector_desc',
        required: false,
        value: description
    }

    const group_function_status = {
        title: 'Status',
        required: true
    }


    // Type:
    // 2: Function
    // 3: Description
    // 4: Sector
    // 5: Function category

    const SetValues = (value, type) => {
        if (type === 1){
            setGroupName(value)
        } else if (type === 3) {
            setDescription(value)
        } else if (type === 4) {
            setSector(value);
        } else {
            setFunctionCategory(value)
        }
    }

    // On submit function
    const OnSave = () => {
        let status = 1
        if (inactive) { status = 0 }

        let data = {
            'name': groupName,
            'category': functionCategory.value,
            'description': description,
            'sector_id': sector.value,
            'status': status
        }
        AXIOS.service(GroupFunctionApiUrl, 'POST', data)
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
                onHide={() => navigate('/manage-configurations/group_functions')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Group Function'}
                redirectURL={'/manage-configurations/group_functions'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={group_function_name}
                // field2={function_title}
                field3={group_function_desc}
                field4={group_function_status}
                field5={sector_title}
                field6={function_category}
                SetValues={SetValues}
                onSave={OnSave}
                view={'group_function'}
            ></Forms>
        </div>
    )
}