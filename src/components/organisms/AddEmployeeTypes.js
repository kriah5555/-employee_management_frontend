import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { EmployeeTypeApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";


export default function AddEmployeeTypes() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [employeeType, setEmployeeType] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        let editApiUrl = EmployeeTypeApiUrl+ '/' + params.id
        // Api call to get detail data
        AXIOS.service(editApiUrl, 'GET')
            .then((result) => {
                setEmployeeType(result.name);
                setDescription(result.description);
                if (result.status) {setActive(true)} else{setInactive(true)}
                // setListData(result)
            })
            .catch((error) => {
                console.log(error);
            })
    },[])


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

    const employee_type_name = {
        title: 'Employee type name',
        name: 'emp_type_name',
        placeholder: 'Enter employee type',
        required: true,
        value: employeeType,
    }

    const employee_type_desc = {
        title: 'Description',
        name: 'emp_type_desc',
        required: false,
        value: description,
    }

    const employee_type_status = {
        title: 'Status',
        required: true
    }

    // Type:
    // 1: Employee type
    // 2: Employee type description
    // 3: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setEmployeeType(value)
        } else {
            setDescription(value)
        }
    }

    const OnSave = () => {
        let status = 1
        if (inactive) { status = 0 }
        let url = EmployeeTypeApiUrl
        let method = 'POST'

        let data = {
            'name': employeeType,
            'description': description,
            'status': status
        }

        if (params.id !== undefined) {
            url = EmployeeTypeApiUrl + '/' + params.id
            method = 'PUT'
        }

        AXIOS.service(url, method, data)
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
                onHide={() => navigate('/manage-configurations/employee_type')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Employee type'}
                redirectURL={'/manage-configurations/employee_type'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={employee_type_name}
                field3={employee_type_desc}
                field4={employee_type_status}
                SetValues={SetValues}
                onSave={OnSave}
                view={'employee_types'}
            ></Forms>
        </div>
    )
}