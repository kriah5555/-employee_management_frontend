import React, { useState } from "react";
import Forms from "../molecules/Forms";

export default function AddEmployeeTypes() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [employeeType, setEmployeeType] = useState('');
    const [description, setDescription] = useState('');

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
        console.log(value, type);
        if (type === 1) {
            setEmployeeType(value)
        } else {
            setDescription(value)
        }
    }

    const OnSave = () => {
        let status = true
        if (inactive){ status = false }

        let data = {
            'employee_type': employeeType,
            'description': description,
            'status':status
        }
        console.log(data);
    }

    return (
        <div className="right-container">
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