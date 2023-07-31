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

    const [titleError, SetTitleError] = useState('');


    const navigate = useNavigate();
    const params = useParams();

    // Status checkbox data
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

    // Form field data
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

    // Fetch data of employee type for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = EmployeeTypeApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    setEmployeeType(result.name);
                    setDescription(result.description);
                    if (result.status) { setActive(true) } else { setInactive(true); setActive(false) }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])


    // Type:
    // 1: Employee type name
    // 5: Employee type description
    // 6: Active status

    // OnChange set field values
    const SetValues = (value, type) => {
        if (type === 1) {
            setEmployeeType(value)
            if (value) { SetTitleError(''); } else { SetTitleError('Required'); }
        } else {
            setDescription(value)
        }
    }

    // On submit function for create and update employee type
    const OnSave = () => {

        if (employeeType === '') {
            SetTitleError('Required');
        } else {
            SetTitleError('');
        }

        if (employeeType) {
            let status = 1
            if (inactive) { status = 0 }
            // Request data
            let data = {
                'name': employeeType,
                'description': description,
                'status': status
            }

            // Creation url and method
            let url = EmployeeTypeApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = EmployeeTypeApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of employee types
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
                field5={employee_type_desc}
                field6={employee_type_status}
                error1={titleError}
                SetValues={SetValues}
                onSave={OnSave}
                view={'employee_types'}
            ></Forms>
        </div>
    )
}