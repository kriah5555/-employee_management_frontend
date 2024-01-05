import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import BackIcon from "../../static/icons/BackIcon.png"
import { getWeeksInYear } from "../../utilities/CommonFunctions";
import { useNavigate } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import { t } from "../../translations/Translation";

export default function ClonePlanning() {

    const navigate = useNavigate();
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

    const [data, setData] = useState({
        'from_year': currentYear,
        'from_week': [],
        'to_year': currentYear,
        'to_week': [],
        'employee_names': [],
        'employee_types': [],
    })

    const employeeTypeOptions = [
        { value: 1, label: 'normal' }
    ]

    const employeeOptions = [
        { value: 1, label: 'tester' }
    ]


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
        { title: t("EMPLOYEE_TYPES"), name: 'employee_types', required: true, options: employeeTypeOptions, selectedOptions: selectedEmpTypes, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
    ]

    const ToClonePlanFields = [
        { title: t("TO_YEAR"), name: 'to_year', required: true, options: years, selectedOptions: selectedToYear, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("TO_WEEK"), name: 'to_week', required: true, options: toWeeks, selectedOptions: selectedToWeeks, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("EMPLOYEE_NAMES"), name: 'employee_names', required: true, options: employeeOptions, selectedOptions: selectedEmployee, isMulti: true, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
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
        console.log(data);
    }


    return (
        <div className="right-container" >
            <div className="col-md-12 my-3 ">
                <h2 id="text-indii-blue" className=" px-3 py-3 bg-white mb-0 d-flex align-items-center">
                    <img className="shortcut-icon mr-2 pointer" onClick={() => navigate('/manage-plannings')} src={BackIcon} />
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
