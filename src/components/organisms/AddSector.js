import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { EmployeeTypeApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate } from "react-router-dom";

export default function AddSector() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sectorName, setSectorName] = useState('');
    const [paritairCommittee, setParitairCommittee] = useState('');
    const [description, setDescription] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [categoryNumber, setCategoryNumber] = useState('');
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

    const employeeTypeList = []

    useEffect(() => {
        AXIOS.service(EmployeeTypeApiUrl, 'GET')
            .then((result) => {
                console.log(result);
                if (result.length !== employeeTypeList.length){
                    result.map((val, index) => {
                        employeeTypeList.push({ value: val.id, label: val.name })
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
        categoriesList.push({value: count , label: count})
        count = count + 1
    }
    
    

    const sector_name = {
        title: 'Sector name',
        name: 'sector_name',
        placeholder: 'Enter sector name',
        required: true,
        value: sectorName,
    }

    const paritair_committee = {
        title: 'Paritair committee',
        name: 'paritair_committee',
        placeholder: 'Enter paritair committee',
        required: true,
        value: paritairCommittee
    }

    const sector_desc = {
        title: 'Description',
        name: 'sector_desc',
        required: false,
        value: description
    }

    const employee_type = {
        title: 'Employee type',
        name: 'emp_type',
        required: true,
        options: employeeTypeList,
        value: employeeType,
        isMulti: true
    }

    const category_number = {
        title: 'Number of categories',
        name: 'cat_num',
        required: true,
        options: categoriesList,
        value: categoryNumber,
        isMulti: false
    }

    const sector_status = {
        title: 'Status',
        required: true
    }


    // Type:
    // 1: Sector name
    // 2: Paritair committee
    // 3: sector description
    // 4: employee type
    // 5: category number
    // 6: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setSectorName(value)
        } else if (type === 2) {
            setParitairCommittee(value)
        } else if (type === 3) {
            setDescription(value)
        } else if (type === 4) {
            setEmployeeType(value)
        } else {
            setCategoryNumber(value)
        }
    }


    const OnSave = () => {
        let status = 1
        if (inactive){ status = 0 }
        let emp_type = []
        employeeType.map((val, index) => {
            emp_type.push(val.value)
        })
        

        let data = {
            'name': sectorName,
            'paritair_committee': paritairCommittee,
            'description': description,
            'employee_types':emp_type,
            'category_number': categoryNumber.value,
            'status':status
        }
        
        AXIOS.service(SectorApiUrl, 'POST', data)
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
                onHide={() => navigate('/manage-configurations/sectors')}
            ></ModalPopup>}
            <Forms 
                formTitle={'Add Sector'}
                redirectURL={'/manage-configurations/sectors'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={sector_name}
                field2={paritair_committee}
                field3={sector_desc}
                field4={sector_status}
                field5={employee_type}
                field6={category_number}
                SetValues={SetValues}
                onSave={OnSave}
                view={'sectors'}
            ></Forms>
        </div>
    )
}