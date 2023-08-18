import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { EmployeeTypeApiUrl, EmployeeTypeOptionsApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";


export default function AddEmployeeTypes() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [employeeType, setEmployeeType] = useState('');
    const [coefficient, setCoefficient] = useState('');
    const [contractType, setContractType] = useState([]);
    const [dimonaType, setDimonaType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [titleError, SetTitleError] = useState('');

    const [contractTypeList, setContractTypeList] = useState([]);
    const [dimonaTypeList, setDimonaTypeList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

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

    useEffect(() => {
        AXIOS.service(EmployeeTypeOptionsApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    let resp = result.data
                    console.log(result.data);
                    setContractTypeList(resp.contract_types);
                    setCategoryList(resp.employee_type_categories);
                    setDimonaTypeList(resp.dimona_types);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch data of employee type for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = EmployeeTypeApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setEmployeeType(result.data.name);
                        setDescription(result.data.description);
                        setCategory({value: result.data.employee_type_category['id'], label: result.data.employee_type_category['name']})
                        if (result.data.contract_types.length !== contractType.length) {
                            result.data.contract_types.map((val) => {
                                contractType.push({ value: val.id, label: val.name })
                            })
                        }
                        if (result.data.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    // Form field data
    const employee_type_name = {
        title: 'Employee type name',
        name: 'emp_type_name',
        placeholder: 'Enter employee type',
        required: true,
        value: employeeType,
    }

    // const Coefficient = {
    //     title: 'Coefficient',
    //     name: 'coefficient',
    //     placeholder: 'Enter coefficient',
    //     required: true,
    //     value: coefficient,
    // }

    const contract_types = {
        title: 'Contract type',
        name: 'contract_type',
        required: true,
        options: contractTypeList,
        value: contractType,
        isMulti: true,
    }
    const dimona_types = {
        title: 'Dimona type',
        name: 'dimona_type',
        required: true,
        options: dimonaTypeList,
        value: dimonaType,
        isMulti: false
    }
    const employee_type_category = {
        title: 'Employee type category',
        name: 'employee_type_category',
        required: true,
        options: categoryList,
        value: category,
        isMulti: false
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
    // 1: Employee type name
    // 2: coefficient
    // 3: contract type
    // 4: dimona type
    // 5: Employee type description
    // 6: Active status
    // 7: category

    // OnChange set field values
    const SetValues = (value, type) => {
        if (type === 1) {
            setEmployeeType(value);
            if (value) { SetTitleError(''); } else { SetTitleError('Required'); }
        } else if (type === 2) {
            setCoefficient(value);
        } else if (type === 3) {
            setContractType(value);
        } else if (type === 4) {
            setDimonaType(value);
        } else if (type === 7) {
            setCategory(value);
        } else {
            setDescription(value);
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

            let contract_types_arr = []
            contractType.map((val, index) => {
                contract_types_arr.push(val.value)
            })
            // Request data
            let data = {
                'name': employeeType,
                'dimona_type_id': dimonaType.value,
                'employee_type_category_id': category.value,
                'contract_types': contract_types_arr,
                'description': description,
                'status': status
            }


            console.log(data);
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
                onHide={() => navigate('/manage-configurations/employee_type')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Employee type'}
                redirectURL={'/manage-configurations/employee_type'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={employee_type_name}
                // field2={Coefficient}
                field3={contract_types}
                field4={dimona_types}
                field5={employee_type_desc}
                field6={employee_type_status}
                field7={employee_type_category}
                error1={titleError}
                SetValues={SetValues}
                onSave={OnSave}
                view={'employee_types'}
            ></Forms>
        </div>
    )
}