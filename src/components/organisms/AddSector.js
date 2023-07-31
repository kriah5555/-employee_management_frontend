import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { EmployeeTypeApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";

export default function AddSector() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [sectorName, setSectorName] = useState('');
    const [paritairCommittee, setParitairCommittee] = useState('');
    const [description, setDescription] = useState('');
    const [employeeType, setEmployeeType] = useState([]);
    const [categoryNumber, setCategoryNumber] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [titleError, SetTitleError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [CategoryError, setCategoryError] = useState('');
    const [employeeTypeError, setEmployeeTypeError] = useState('');

    const [emp_type_state, setEmpTypeState] = useState(false);
    const [employeeTypeList, setEmployeeTypeList] = useState([])
    const categoriesList = []
    let count = 1
    while (count <= 20) {
        categoriesList.push({ value: count, label: count })
        count = count + 1
    }

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

    //Fetch dropdown data of employee types
    useEffect(() => {
        AXIOS.service(EmployeeTypeApiUrl, 'GET')
            .then((result) => {
                if (result.length !== employeeTypeList.length) {
                    result.map((val, index) => {
                        employeeTypeList.push({ value: val.id, label: val.name })
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch sector data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = SectorApiUrl + '/' + params.id
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result.employee_types.length === 0) { setEmpTypeState(true) }
                    if (result.employee_types.length !== employeeType.length) {
                        result.employee_types.map((val) => {
                            employeeType.push({ value: val.id, label: val.name })
                        })
                    }
                    setSectorName(result.name);
                    setParitairCommittee(result.paritair_committee);
                    setDescription(result.description);
                    setCategoryNumber({ value: result.category, label: result.category })


                    if (result.status) { setActive(true) } else { setInactive(true); setActive(false) }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    // Function to stop the rendering till the data gets updated
    if (params.id && (employeeType.length === 0 && !emp_type_state)) {
        return
    }


    // Field data
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
    // 3: employee type
    // 4: category number 
    // 5: sector description
    // 6: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setSectorName(value);
            if (value === '') { SetTitleError('Required'); } else { SetTitleError(''); }
        } else if (type === 2) {
            setParitairCommittee(value);
            if (value === '') { setCodeError('Required'); } else { setCodeError(''); }
        } else if (type === 3) {
            setEmployeeType(value);
            if (value.length === 0) { setEmployeeTypeError('Required'); } else { setEmployeeTypeError(''); }
        } else if (type === 4) {
            setCategoryNumber(value);
            if (value === '') { setCategoryError('Required'); } else { setCategoryError(''); }
        } else {
            setDescription(value);
        }
    }

    // Function for onSubmit for creating and updating sectors
    const OnSave = () => {

        if (sectorName === '') {
            SetTitleError('Required');
        }
        if (paritairCommittee === '') {
            setCodeError('Required');
        }
        if (employeeType.length === 0) {
            setEmployeeTypeError('Required');
            console.log('www');
        }
        if (categoryNumber === '') {
            setCategoryError('Required');
            console.log('lllllll');
        }


        if (sectorName && paritairCommittee && categoryNumber && employeeType.length !== 0) {
            // Request params
            let status = 1
            if (inactive) { status = 0 }
            let emp_type_ids = []
            employeeType.map((val, index) => {
                emp_type_ids.push(val.value)
            })

            let data = {
                'name': sectorName,
                'paritair_committee': paritairCommittee,
                'description': description,
                'employee_types': emp_type_ids,
                'category': categoryNumber.value,
                'status': status
            }

            // Creation url and method
            let url = SectorApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = SectorApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and update sectors
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
            {/* Success message popup */}
            {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/sectors')}
            ></ModalPopup>}
            {errorMessage && <ModalPopup
                title={('ERROR')}
                body={(errorMessage)}
                onHide={() => setErrorMessage('')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Sector'}
                redirectURL={'/manage-configurations/sectors'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={sector_name}
                field2={paritair_committee}
                field3={employee_type}
                field4={category_number}
                field5={sector_desc}
                field6={sector_status}
                error1={titleError}
                error2={codeError}
                error3={employeeTypeError}
                error4={CategoryError}
                SetValues={SetValues}
                onSave={OnSave}
                view={'sectors'}
            ></Forms>
        </div>
    )
}