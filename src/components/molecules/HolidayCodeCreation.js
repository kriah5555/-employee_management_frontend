import React, { useState, useEffect } from "react";
import FormsNew from "./FormsNew";
import { HolidayCodeApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BackIcon from "../../static/icons/BackIcon.png";
import CustomButton from "../atoms/CustomButton"
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function HolidayCodeCreation() {
    //to show selected options in dropdown
    const [holidayType, setHolidayType] = useState("");
    const [countType, setCountType] = useState("");
    const [employeeCategory, setEmployeeCategory] = useState([]);
    const [iconType, setIconType] = useState("");
    const [contractType, setContractType] = useState("");
    const [weeklyHours, setWeeklyHours] = useState(1);
    const [active, setActive] = useState(1);
    const [inactive, setInactive] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const [selectedTab, setSelectedTab] = useState();
    const [linkCompanies, setlinkCompanies] = useState("")
    const [companies, setCompanies] = useState([]);
    const [type, setType] = useState("");
    const [hideCompaniesTab, setHideCompaniestab] = useState(false)

    const navigate = useNavigate();
    const params = useParams();
    // to store fetched dropdown options
    const [dropdownOptions, setDropdownOptions] = useState({});
    const [holidayCodeFormData, setHolidayCodeFormData] = useState({
        "holiday_code_name": "",
        "internal_code": "",
        "holiday_type": "",
        "count_type": "",
        "employee_category": [],
        "icon_type": "",
        "contract_type": "",
        "consider_plan_hours_in_week_hours": false,
        "count": "",
        "description": "",
        "status": 1,
        "type": '',
        "link_companies": "",
        "companies": []
    });

    // Holiday codes tabs
    const TabsData = hideCompaniesTab ? [
        { tabHeading: t("INFORMATION"), tabName: 'information' },
    ] : [
        { tabHeading: t("INFORMATION"), tabName: 'information' },
        { tabHeading: t("COMPANIES_TEXT"), tabName: 'companies' },
    ]

    //checkbox list
    const statusCheckBoxList = [
        {
            key: "active",
            name: t("ACTIVE"),
            checked: active
        },
        {
            key: "inactive",
            name: t("INACTIVE"),
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
            setHideCompaniestab(true)
            let editApiUrl = HolidayCodeApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data
                        console.log(response)
                        //setting selected options
                        setHolidayType(response.holiday_type);
                        setCountType(response.count_type);
                        setEmployeeCategory(response.employee_category);
                        setIconType(response.icon_type);
                        setContractType(response.contract_type);
                        setWeeklyHours(response.consider_plan_hours_in_week_hours);
                        setType(response.type)
                        //creating selected employee category id array
                        let employee_category_ids = []
                        response.employee_category.map((val, i) => {
                            employee_category_ids.push(val.value)
                        })
                        let data = {
                            "holiday_code_name": response.holiday_code_name,
                            "internal_code": response.internal_code,
                            "holiday_type": response.holiday_type.value,
                            "count_type": response.count_type.value,
                            "employee_category": employee_category_ids, /* need to set array employee_category_ids  */
                            "icon_type": response.icon_type.value,
                            "contract_type": response.contract_type.value,
                            "consider_plan_hours_in_week_hours": response.consider_plan_hours_in_week_hours,
                            "count": response.count,
                            "description": response.description,
                            "status": response.status,
                            "type": response.type.value,
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
        { title: t("HOLIDAY_CODE_NAME"), name: "holiday_code_name", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("INETRNAL_CODE"), name: "internal_code", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("HOLIDAY_TYPE"), name: "holiday_type", required: true, options: dropdownOptions.holiday_type, isMulti: false, selectedOptions: holidayType, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("COUNT_TYPE"), name: "count_type", required: true, options: dropdownOptions.count_type, isMulti: false, selectedOptions: countType, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("EMPLOYEE_CATEGORY"), name: "employee_category", required: true, options: dropdownOptions.employee_category, isMulti: true, selectedOptions: employeeCategory, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("EMPLOYEE_CONTRACT_TYPES"), name: "contract_type", required: true, options: dropdownOptions.contract_type, isMulti: false, selectedOptions: contractType, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("ICON_TYPE"), name: "icon_type", required: true, options: dropdownOptions.icon_type, isMulti: false, selectedOptions: iconType, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("TYPE"), name: "type", required: true, options: dropdownOptions.type, isMulti: false, selectedOptions: type, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("COUNT"), name: "count", required: type.value == 1 ? true : false, type: "text", style: "col-md-6 mt-4 float-left" },
        // { title: "Consider the plan hours in weekly hours ?", name: "consider_plan_hours_in_week_hours", options: dropdownOptions.consider_plan_hours_in_week_hours, isMulti: false, selectedOptions: weeklyHours, type: "dropdown", style: "col-md-6 mt-2 float-left" },
        { title: t("DESCRIPTION"), name: "description", type: "text-area", style: "col-md-12 mt-4 mb-5 float-left" },
        { title: t("PLAN_HOURS_IN_WEEKLY_HOURS") + ("?"), name: 'consider_plan_hours_in_week_hours', type: 'switch', style: "col-md-12 d-flex mt-4 float-left" },
        { title: t("STATUS_TEXT"), checkboxList: statusCheckBoxList, changeCheckbox: changeCheckbox, type: "checkbox", style: "col-md-12 mt-4 mb-2 float-left" },
    ];

    //companies tab fields for holiday code
    const link_companies_options = [
        {
            value: 'all',
            label: t("ALL")
        },
        {
            value: 'include',
            label: t("INCLUDE")
        },
        {
            value: 'exclude',
            label: t("EXCLUDE")
        }
    ]

    const companies_options = dropdownOptions.companies != undefined ? getFormattedDropdownOptions(dropdownOptions.companies, 'id', 'company_name') : [];
    const companiesTabFields = [
        { title: t("LINK_COMPANIES"), name: "link_companies", required: true, options: link_companies_options, isMulti: false, selectedOptions: linkCompanies, type: "dropdown", style: "col-md-12 mt-2 float-left" },
        { title: t("COMPANIES_TEXT"), name: "companies", required: true, options: companies_options, isMulti: true, selectedOptions: companies, type: "dropdown", style: "col-md-12 mt-2 float-left" },
    ];
    // Function to set values of add holiday code fields
    const SetValues = (index, name, value, field) => {
        const form_data = { ...holidayCodeFormData }
        if (field !== 'dropdown') {
            form_data[name] = value;
        } else {
            if (name === 'employee_category' || name === 'companies') {
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                if (name === 'companies') {
                    setCompanies(value);
                } else {
                    setEmployeeCategory(value);
                }
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
                } else if (name === 'consider_plan_hours_in_week_hours') {
                    setWeeklyHours(value);
                } else if (name === 'link_companies') {
                    setlinkCompanies(value);
                } else if (name === 'type') {
                    setType(value)
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
                    navigate('/manage-holiday-configurations/holiday_code');
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
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="form-container my-5 border bg-white">
                <h2 id="text-indii-blue" className="col-md-12 p-3 mb-0 ml-2 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate("/manage-holiday-configurations/holiday_code")} src={BackIcon}></img>{t("ADD_HOLIDAY_CODE")}</h2>

                <Tabs className={"mx-4 mt-3 border"} onSelect={(index) => setSelectedTab(index)}>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                    </TabList>
                    <TabPanel>
                        <FormsNew
                            view={"holiday codes"}
                            data={fieldData}
                            SetValues={SetValues}
                            formattedData={holidayCodeFormData}
                        ></FormsNew>
                    </TabPanel>
                    {!hideCompaniesTab && <TabPanel>
                        <FormsNew
                            view={"holiday codes"}
                            data={companiesTabFields}
                            SetValues={SetValues}
                            formattedData={companiesTabFields}
                        ></FormsNew>
                    </TabPanel>}
                </Tabs>
                <div className={"col-md-12 my-4 text-right pr-2"}>
                    {(params.id !== undefined || (params.id === undefined && selectedTab === 1)) && <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>}
                    <CustomButton buttonName={t("BACK_LINK")} ActionFunction={() => navigate("/manage-holiday-configurations/holiday_code")} CustomStyle="mr-3"></CustomButton>
                </div>
            </div>
        </div>
    );
}