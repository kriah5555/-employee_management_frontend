import React, { useEffect, useState } from "react";
import { EmployeeTypeApiUrl, EmployeeTypeOptionsApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function AddEmployeeTypes() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [contractType, setContractType] = useState([]);
    const [dimonaType, setDimonaType] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [category, setCategory] = useState('');

    const [errors, setErrors] = useState([]);

    const [contractTypeList, setContractTypeList] = useState([]);
    const [dimonaTypeList, setDimonaTypeList] = useState([]);
    const [salaryTypeList, setSalaryTypeList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [dayLimit, setDayLimit] = useState('');

    const DaysList = []
    const MaximumDaysNumber = 7;
    let count = 1
    while (count <= MaximumDaysNumber) {
        DaysList.push({ value: count, label: count })
        count = count + 1
    }

    const navigate = useNavigate();
    const params = useParams();

    const [employeeTypeData, setEmployeeTypeData] = useState({
        "name": "",
        "description": "",
        "status": 1,
        "employee_type_category_id": '',
        "dimona_type_id": '',
        "contract_types": [],
        "consecutive_days_limit": 5,
        "icon_color": "",
        "start_in_past": false,
        "counters": false,
        "contract_hours_split": false,
        "leave_access": false,
        "holiday_access": false,
        "dimona_code": ""
    });

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
            name: t("ACTIVE"),
            key: 'active',
            checked: active,
        },
        {
            name: t("INACTIVE"),
            key: 'inactive',
            checked: inactive,
        }
    ]

    useEffect(() => {
        AXIOS.service(EmployeeTypeOptionsApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    let resp = result.data
                    setContractTypeList(getFormattedDropdownOptions(resp.contract_types));
                    setCategoryList(getFormattedDropdownOptions(resp.employee_type_categories));
                    setDimonaTypeList(getFormattedDropdownOptions(resp.dimona_types));
                    setSalaryTypeList(resp.salary_type);
                } else {
                    setErrors(result.message)
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
                        let response = result.data
                        setCategory(getFormattedDropdownOptions(response.employee_type_category));
                        setDimonaType(getFormattedDropdownOptions(response.dimona_config.dimona_type));
                        setContractType(getFormattedDropdownOptions(response.contract_types));
                        setDayLimit({ value: response.employee_type_config.consecutive_days_limit, label: response.employee_type_config.consecutive_days_limit });
                        setSalaryType(response.salary_type);
                        let contract_type_ids = []
                        response.contract_types.map((val, i) => {
                            contract_type_ids.push(val.id)
                        })
                        let data = {
                            "name": response.name,
                            "description": response.description,
                            "status": response.status,
                            "employee_type_category_id": response.employee_type_category.id,
                            "dimona_type_id": response.dimona_config.dimona_type.id,
                            "contract_types": contract_type_ids,
                            "consecutive_days_limit": response.employee_type_config.consecutive_days_limit,
                            "icon_color": response.employee_type_config.icon_color,
                            "start_in_past": response.employee_type_config.start_in_past,
                            "counters": response.employee_type_config.counters ? response.employee_type_config.counters : false,
                            "contract_hours_split": response.employee_type_config.contract_hours_split,
                            "leave_access": response.employee_type_config.leave_access,
                            "holiday_access": response.employee_type_config.holiday_access,
                            "salary_type": response.salary_type.value,
                            "dimona_code": response.dimona_code,
                        }
                        setEmployeeTypeData(data);
                        if (response.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])


    // Employee type fields data
    const employeeTypeFields = [
        // Employee type fields
        { title: t("EMPLOYEE_TYPE_NAME"), name: 'name', required: true, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: t("EMPLOYEE_TYPE_CATEGORY"), name: 'employee_type_category_id', required: true, options: categoryList, selectedOptions: category, isMulti: false, type: 'dropdown', style: "col-md-6 mt-4 float-left" },
        { title: t("DESCRIPTION"), name: 'description', required: false, type: 'text-area', style: "col-md-12 mt-4 mb-5 float-left" },
        // Employee type configuration fields
        { title: t("EMPLOYEE_CONTRACT_TYPES"), name: 'contract_types', required: false, options: contractTypeList, selectedOptions: contractType, isMulti: true, type: 'dropdown', style: "col-md-6 mt-4 float-left" },
        { title: t("DIMONA_TYPE"), name: 'dimona_type_id', required: true, options: dimonaTypeList, selectedOptions: dimonaType, isMulti: false, type: 'dropdown', style: "col-md-6 mt-4 float-left" },
        { title: t("DIMONA_CODE"), name: 'dimona_code', required: true, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: t("CONSECUTIVE_DAY_LIMIT"), name: 'consecutive_days_limit', required: true, options: DaysList, selectedOptions: dayLimit, isMulti: false, type: 'dropdown', style: "col-md-6 mt-4 float-left" },
        { title: t("SALARY_TYPE"), name: 'salary_type', required: true, options: salaryTypeList, selectedOptions: salaryType, isMulti: false, type: 'dropdown', style: "col-md-6 mt-4 float-left" },
        { title: t("START_IN_PAST"), name: 'start_in_past', required: true, type: 'switch', style: "col-md-6 d-flex mt-4 float-left" },
        // { title: 'Enable counters', name: 'counters', required: true, type: 'switch', style:"col-md-6 d-flex mt-4 float-left" },
        { title: t("CONTRACT_HOURS_SPLIT"), name: 'contract_hours_split', required: true, type: 'switch', style: "col-md-6 d-flex mt-4 float-left" },
        { title: t("LEAVE_ACCESS"), name: 'leave_access', required: true, type: 'switch', style: "col-md-6 d-flex mt-4 float-left" },
        { title: t("HOLIDAY_ACCESS"), name: 'holiday_access', required: true, type: 'switch', style: "col-md-6 d-flex mt-4 float-left" },
        { title: t("ICON_COLOR"), name: 'icon_color', required: true, type: 'color', style: "col-md-6 mt-4 mb-2 d-flex float-left" },
        { title: t("STATUS_TEXT"), required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: "col-md-12 mt-4 mb-2 float-left" },
    ]


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const employee_type = { ...employeeTypeData };
        if (field !== 'dropdown') {
            employee_type[name] = value
        } else {
            if (name === 'contract_types') {
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                setContractType(value);
                employee_type[name] = arr
            } else {
                if (name === 'dimona_type_id') {
                    setDimonaType(value);
                } else if (name === 'employee_type_category_id') {
                    setCategory(value);
                } else if (name === 'salary_type') {
                    setSalaryType(value);
                } else {
                    setDayLimit(value);
                }
                employee_type[name] = value.value
            }
        }
        setEmployeeTypeData(employee_type);
    }

    // On submit function for create and update employee type
    const OnSave = () => {
        if (employeeTypeData.name && employeeTypeData.employee_type_category_id && employeeTypeData.dimona_type_id && employeeTypeData.consecutive_days_limit) {
            let status = 1
            if (inactive) { status = 0 }

            employeeTypeData['status'] = status

            // Creation url and method
            let url = EmployeeTypeApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = EmployeeTypeApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of employee types
            AXIOS.service(url, method, employeeTypeData)
                .then((result) => {
                    if (result?.success) {
                        navigate('/manage-configurations/employee_type');
                        toast.success(result.message[0], {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setErrors([t("PLEASE_FILL_REQUIRED_FIELDS")])
        }
    }

    return (
        <div className="right-container">
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="employee_types"
                formTitle={t("ADD_EMPLOYEE_TYPE")}
                redirectURL={'/manage-configurations/employee_type'}
                formattedData={employeeTypeData}
                data={employeeTypeFields}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew>
        </div>
    )
}