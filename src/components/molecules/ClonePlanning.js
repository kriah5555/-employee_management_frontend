import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import BackIcon from "../../static/icons/BackIcon.png"
import { getWeeksInYear } from "../../utilities/CommonFunctions";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import { t } from "../../translations/Translation";
import { ClonePlanningApiUrl, FilterOptionsApiUrl } from '../../routes/ApiEndPoints';
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { toast, ToastContainer } from "react-toastify";
import ErrorPopup from "../../utilities/popup/ErrorPopup";

export default function ClonePlanning() {

    const navigate = useNavigate();
    const params = useParams();
    const locationId = params.id;
    const currentYear = new Date().getFullYear();
    let weeksInYear = getWeeksInYear(currentYear);
    let weeksArr = []
    let count = 1
    while (count <= weeksInYear) {
        weeksArr.push({ value: count, label: count })
        count = count + 1
    }

    const years = [
        { value: currentYear - 1, label: currentYear - 1 },
        { value: currentYear, label: currentYear },
        { value: currentYear + 1, label: currentYear + 1 },
    ]


    const [fromWeeks, setFromWeeks] = useState(weeksArr);
    const [toWeeks, setToWeeks] = useState(weeksArr);

    const [selectedFromWeeks, setSelectedFromWeeks] = useState([]);
    const [selectedFromYear, setSelectedFromYear] = useState({ value: currentYear, label: currentYear });

    const [selectedToWeeks, setSelectedToWeeks] = useState([]);
    const [selectedToYear, setSelectedToYear] = useState({ value: currentYear, label: currentYear });

    const [selectedEmpTypes, setSelectedEmpTypes] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [employeeTypeOptions, setEmployeeTypeOptions] = useState([]);
    const [employeesList, setEmployeeslist] = useState([]);
    const [data, setData] = useState({
        'from_year': currentYear,
        'from_week': [],
        'to_year': currentYear,
        'to_week': [],
        'employee_names': [],
        'employee_types': [],
        'location_id': locationId,
    })
    const [selectAllEmployees, setSelectAllEmployees] = useState(false);
    const [errors, setErrors] = useState([]);

    const checkboxList = [
        {
            key: 1,
            name: t("SELECT_ALL_EMPLOYEES"),
        }
    ]

    const employeeOptions = [
        { value: 5, label: t("TESTER") },
        { value: 6, label: t("TESTER") },
        { value: 7, label: t("TESTER") },
        { value: 8, label: t("TESTER") }

    ]

    const handleCheckbox = () => {
        setSelectAllEmployees(!selectAllEmployees);
        if (!selectAllEmployees) {
            setSelectedEmployee(employeeOptions);
            let allemployeeIds = []
            employeeOptions.map((item, index) => {
                allemployeeIds.push(item.value)
            })
            setData((prev) => ({
                ...prev, employee_names: allemployeeIds
            }));

        } else {
            setSelectedEmployee([]);
            setData((prev) => ({
                ...prev, employee_names: []
            }));
        }
    }

    useEffect(() => {
        AXIOS.service(FilterOptionsApiUrl, "POST", "")
            .then((result) => {
                if (result?.success) {
                    setEmployeeTypeOptions(result?.data?.employee_types);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        weeksInYear = getWeeksInYear(selectedFromYear.value);
        let weeksArr = []
        let count = 1
        while (count <= weeksInYear) {
            weeksArr.push({ value: count, label: count })
            count = count + 1
        }
        setFromWeeks(weeksArr)
    }, [selectedFromYear])

    useEffect(() => {
        weeksInYear = getWeeksInYear(selectedToYear.value);
        let weeksArr = []
        let count = 1
        while (count <= weeksInYear) {
            weeksArr.push({ value: count, label: count })
            count = count + 1
        }
        setToWeeks(weeksArr)
    }, [selectedToYear])


    const FromClonePlanFields = [
        // Clone planning fields
        { title: t("FROM_YEAR"), name: 'from_year', required: true, options: years, selectedOptions: selectedFromYear, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("FROM_WEEK"), name: 'from_week', required: true, options: fromWeeks, selectedOptions: selectedFromWeeks, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("EMPLOYEE_TYPES"), name: 'employee_types', required: false, options: employeeTypeOptions, selectedOptions: selectedEmpTypes, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
    ]

    const ToClonePlanFields = [
        { title: t("TO_YEAR"), name: 'to_year', required: true, options: years, selectedOptions: selectedToYear, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("TO_WEEK"), name: 'to_week', required: true, options: toWeeks, selectedOptions: selectedToWeeks, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("EMPLOYEE_NAMES"), name: 'employee_names', required: true, options: employeeOptions, selectedOptions: selectedEmployee, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: "", name: '', type: "checkbox", checkboxList: checkboxList, style: "mt-5 col-12 ml-1 float-left d-flex justify-content-center", changeCheckbox: handleCheckbox, checker: selectAllEmployees }
    ]

    const setFromValues = (index, name, value, field) => {
        let requestData = { ...data }
        if (name === 'from_year') {
            requestData[name] = value.value
            setSelectedFromYear(value)
        } else {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            requestData[name] = arr

            if (name === 'from_week') {
                setSelectedFromWeeks(value);
            } else {
                setSelectedEmpTypes(value);
            }
        }
        setData(requestData);
    }

    const setToValues = (index, name, value, field) => {

        let requestData = { ...data }
        if (name === 'to_year') {
            requestData[name] = value.value
            setSelectedToYear(value)
        } else {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            requestData[name] = arr

            if (name === 'to_week') {
                setSelectedToWeeks(value);
            } else {
                setSelectedEmployee(value);
            }
        }
        setData(requestData);
    }


    const OnSave = () => {
        AXIOS.service(ClonePlanningApiUrl, 'POST', data)
            .then((result) => {
                if (result?.success) {
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
        <div className="right-container" >
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ('!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="col-md-12 my-3 ">
                <h2 id="text-indii-blue" className=" px-3 py-3 bg-white mb-0 d-flex align-items-center">
                    <img className="shortcut-icon mr-2 pointer" onClick={() => navigate('/manage-plannings')} src={BackIcon} alt="Back" />
                    {t("CLONE_PLANNINGS")}
                </h2>
                <div className="mt-3 py-3 bg-white">
                    <h4 className="font-weight-bold text-color mt-3 pt-3 text-center">{t("SELECT_WEEK_TO_COPY")}</h4>
                    <FormsNew
                        formattedData={[]}
                        data={FromClonePlanFields}
                        SetValues={setFromValues}
                    ></FormsNew>
                    <h4 className="font-weight-bold text-color mt-4 text-center">{t("SELECT_WEEK_TO_CLONE")}</h4>
                    <FormsNew
                        formattedData={[]}
                        data={ToClonePlanFields}
                        SetValues={setToValues}
                    ></FormsNew>

                    <div className="text-right my-5 pr-5 mr-3">
                        <CustomButton buttonName={t("CLONE")} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>
                    </div>
                </div>
            </div>

        </div>
    )
}
