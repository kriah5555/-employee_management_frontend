import React, { useState, useEffect } from "react";
import FormsNew from "./FormsNew";
import { HolidayCodeApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';

export default function HolidayCodeCreation() {
    //to show selected options in dropdown
    const [holidayType, setHolidayType] = useState("");
    const [countType, setCountType] = useState("");
    const [employeeCategory, setEmployeeCategory] = useState([]);
    const [iconType, setIconType] = useState("");
    const [contractType, setContractType] = useState("");
    const [weeklyHours, setWeeklyHours] = useState(1);
    const [carryForward, setCarryForward] = useState("");

    const [active, setActive] = useState(1);
    const [inactive, setInactive] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    // to store fetched dropdown options
    const [dropdownOptions, setDropdownOptions] = useState({});
    const [holidayCodeFormData, setHolidayCodeFormData] = useState({
        "holiday_code_name": "",
        "internal_code": "",
        "holiday_type": "",
        "count_type": "",
        "employee_category": "",
        "icon_type": "",
        "contract_type": "",
        "consider_plan_hours_in_week_hours": 1,
        "carry_forword": "",
        "description": "",
        "status": 1,
    });

    //checkbox list
    const statusCheckBoxList = [
        {
            key: "active",
            name: "Active",
            checked: active
        },
        {
            key: "inactive",
            name: "Inactive",
            checked: inactive
        }
    ];

    // Checkbox status data
    const changeCheckbox = (type) => {
        if (type === 'active') {
            setActive(1);
            setInactive(0);
        } else {
            setActive(0);
            setInactive(1);
        }
    }

    // Fetch data for options of dropdowns
    useEffect(() => {
        AXIOS.service(HolidayCodeApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    let resp = result.data
                    setDropdownOptions(resp);
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
            let editApiUrl = HolidayCodeApiUrl + '/' + params.id + '/edit'
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data.details
                        //setting selected options
                        setHolidayType(response.holiday_type);
                        setCountType(response.count_type);
                        setEmployeeCategory(response.employee_category);
                        setIconType(response.icon_type);
                        setContractType(response.contract_type);
                        setWeeklyHours(response.consider_plan_hours_in_week_hours);
                        setCarryForward(response.carry_forword);
                        //creating selected employee category id array
                        // let employee_category_ids = []
                        // response.employee_category.map((val, i) => {
                        //     employee_category_ids.push(val.value)
                        // })
                        let data = {
                            "holiday_code_name": response.holiday_code_name,
                            "internal_code": response.internal_code,
                            "holiday_type": response.holiday_type.value,
                            "count_type": response.count_type.value,
                            "employee_category": response.employee_category.value, /* need to set array employee_category_ids  */
                            "icon_type": response.icon_type.value,
                            "contract_type": response.contract_type.value,
                            "consider_plan_hours_in_week_hours": response.consider_plan_hours_in_week_hours.value,
                            "carry_forword": response.carry_forword.value,
                            "description": response.description,
                            "status": response.status,
                        }
                        setHolidayCodeFormData(data);
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
    // Holiday code field data
    const fieldData = [
        { title: "Holiday code name", name: "holiday_code_name", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Internal code", name: "internal_code", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Holiday type", name: "holiday_type", required: true, options: dropdownOptions.holiday_type, isMulti: false, selectedOptions: holidayType, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Count type", name: "count_type", required: true, options: dropdownOptions.count_type, isMulti: false, selectedOptions: countType, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Employee category", name: "employee_category", required: true, options: dropdownOptions.employee_category, isMulti: false, selectedOptions: employeeCategory, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Contract type", name: "contract_type", required: true, options: dropdownOptions.contract_type, isMulti: false, selectedOptions: contractType, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Icon type", name: "icon_type", required: true, options: dropdownOptions.icon_type, isMulti: false, selectedOptions: iconType, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Carry forward", name: "carry_forword", required: true, options: dropdownOptions.carry_forword, isMulti: false, selectedOptions: carryForward, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Consider the plan hours in weekly hours ?", name: "consider_plan_hours_in_week_hours", options: dropdownOptions.consider_plan_hours_in_week_hours, isMulti: false, selectedOptions: weeklyHours, type: "dropdown", style:"col-md-6 mt-2 float-left" },
        { title: "Description", name: "description", type: "text-area", style:"col-md-12 mt-4 mb-5 float-left" },
        { title: "Status", checkboxList: statusCheckBoxList, changeCheckbox: changeCheckbox, type: "checkbox", style:"col-md-12 mt-4 mb-2 float-left" },

    ];
    // Function to set values of add holiday code fields
    const SetValues = (index, name, value, field) => {
        const form_data = { ...holidayCodeFormData }
        if (field !== 'dropdown') {
            form_data[name] = value;
        } else {
            if (name === 'need to amodify') { /* modify after multi select is enabled*/
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                setEmployeeCategory(value);
                form_data[name] = arr
            } else {
                if (name === 'holiday_type') {
                    setHolidayType(value);
                } else if (name === 'count_type') {
                    setCountType(value);
                } else if (name === 'contract_type') {
                    setContractType(value);
                } else if (name === 'icon_type') {
                    setIconType(value);
                } else if (name === "carry_forword") {
                    setCarryForward(value);
                } else if (name === 'consider_plan_hours_in_week_hours') {
                    setWeeklyHours(value);
                } else if (name === 'employee_category') {
                    setEmployeeCategory(value);
                }
                form_data[name] = value.value
            }
        }
        setHolidayCodeFormData(form_data);
    }
    const onSave = () => {

        let status = 1
        if (inactive) { status = 0 }

        holidayCodeFormData['status'] = status

        // Creation url and method
        let url = HolidayCodeApiUrl
        let method = 'POST'

        // Updation url and method
        if (params.id !== undefined) {
            url = HolidayCodeApiUrl + '/' + params.id
            method = 'PUT'
        }
        // APICall for create and updation of holiday code
        AXIOS.service(url, method, holidayCodeFormData)
            .then((result) => {
                if (result?.success) {
                    navigate('/manage-configurations/holiday_code');
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

    }
    return (
        <div className="right-container">
            {/* {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/holiday_code')}
            ></ModalPopup>} */}
            {errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                formTitle={"Add Holiday Code"}
                data={fieldData}
                SetValues={SetValues}
                formattedData={holidayCodeFormData}
                redirectURL={"/manage-configurations/holiday_code"}
                OnSave={onSave}
            ></FormsNew>
        </div>
    );
}   