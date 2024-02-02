import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import FormsNew from './FormsNew';
import { APICALL as AXIOS } from '../../services/AxiosServices';
import { AddLeaveApiUrl, GetLeaveOptionsApiUrl, GetPlansForLeavesApiUrl } from "../../routes/ApiEndPoints";
import { getFormattedDropdownOptions } from '../../utilities/CommonFunctions';
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";

const AddLeavePopup = (props) => {
    const [employee, setEmployee] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    const [holidayCode, setHolidayCode] = useState([]);
    const [holidayCodeList, setHolidayCodeList] = useState([])
    const [formData, setFormData] = useState({
        "employee_profile_id": "5",
        "duration_type": '1',
        "dates": [],
        "reason": "",
        "holiday_code_id": '',
        "plan_ids": []
    })
    const [PlanCheckboxList, setPlanCheckboxList] = useState([]);


    const [multipleDays, SetMultipleDays] = useState(false);
    const [multipleHolidayCode, setMultipleHOlidayCode] = useState(false)
    const [formFields, setFormFields] = useState([])
    const [planIds, setPlanIds] = useState([])
    const [errors, setErrors] = useState([]);

    let checkboxList = [
        {
            name: t("MULTIPLE_DAYS"),
            key: 'multiple_days',
            checked: multipleDays,
        },
    ]


    useEffect(() => {
        AXIOS.service(GetLeaveOptionsApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setEmployeeList(getFormattedDropdownOptions(result.data.employees, 'employee_profile_id', 'full_name'))
                    setHolidayCodeList(getFormattedDropdownOptions(result.data.leave_codes, 'id', 'holiday_code_name'))

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const changeCheckbox = () => {
        SetMultipleDays(!multipleDays)
        setMultipleHOlidayCode(false)
    }

    const PlanCheckboxChange = (key) => {

        let arr_plans = [...PlanCheckboxList]
        let plan_ids_array = []

        arr_plans.map((val, i) => {
            // if (val[key] === key) {
            //     val.shift_leave = true
            // }
            if (val["key"] === key) {
                val["checked"] = !(val["checked"])
                val.shift_leave = true
            }
            if (val["checked"] === true) {
                plan_ids_array.push(val["key"])
            }
        })
        setPlanIds(plan_ids_array)
        setPlanCheckboxList(arr_plans)


    }

    //based on selected checkbox altering the checkbox list to keep only required checkbox
    checkboxList = [
        {
            name: t("MULTIPLE_DAYS"),
            key: 'multiple_days',
            checked: multipleDays,
        }
    ]




    // useEffect(() => {
    //     //api call to get options to dropdown
    //     AXIOS.service()
    //         .then((result) => {

    //         })
    //         .catch()
    // }, [halfDay, multipleDays, multipleHolidayCode])

    // setting form fields based on selected checkbox 
    useEffect(() => {
        let newFormFields

        if (multipleDays) {
            newFormFields = multipleDaysArrayField;
        } else {
            newFormFields = defaultFieldsArray;
        }

        setFormFields(newFormFields);
    }, [multipleDays, multipleHolidayCode]);


    useEffect(() => {
        let request_Data = {
            "employee_profile_id": employee?.value, //employee?.value,
            "dates": formData['dates'],
            "from_data": formData['from_date'],
            "to_date": formData['to_date']
        }

        AXIOS.service(GetPlansForLeavesApiUrl, 'POST', request_Data)
            .then((result) => {
                let arr = []
                if (result?.success) {
                    result.data.map((item) => {
                        arr.push(
                            {
                                name: item.plan_time,
                                key: item.plan_id,
                                checked: multipleDays,
                            }
                        )
                    })
                    setPlanCheckboxList(arr)
                }
            })
            .catch()
    }, [employee, formData])


    const setValue = (index, name, value, type) => {
        let form_data = { ...formData }

        if (name === 'dates') {
            let arr = form_data['dates']
            value.map((date, i) => {
                if (!arr.includes(date?.format("DD-MM-YYYY"))) {
                    arr.push(date?.format("DD-MM-YYYY"))
                }
            })
            form_data['dates'] = arr
        } else if (type !== 'dropdown') {
            form_data[name] = value
            if (name === 'from_date' || name === 'to_date') {
                form_data['duration_type'] = 2
            } else if (name === 'dates') {
                form_data['duration_type'] = 1
            }
        } else {
            if (name === 'employee') {
                setEmployee(value);
                form_data['employee_profile_id'] = value.value
            } else if (name === 'holiday_code_id') {
                setHolidayCode(value)
                form_data['holiday_code_id'] = value.value
            }
        }
        setFormData(form_data);
    }

    const onHide = () => {
        props.setAddLeave(false)
    }
    const onSave = () => {
        let newData = { ...formData }
        newData["plan_ids"] = planIds
        setFormData(newData)
        AXIOS.service(AddLeaveApiUrl, 'POST', newData)
            .then((result) => {
                if (result?.success) {
                    // console.log(result.data)
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
                    props.setAddLeave(false)
                } else {
                    setErrors(result?.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
       
    }

    const multipleDaysArrayField = [
        { title: t("EMPLOYEE_TITLE"), name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, isMulti: false, style: " col-md-4 mt-2" },
        { title: t("FROM_DATE"), name: "from_date", required: true, type: "date", style: " col-md-4 mt-2 float-left" },
        { title: t("TO_DATE"), name: "to_date", required: true, type: "date", style: " col-md-4 mt-2 float-left" },
        { title: t("HOLIDAY_CODE"), name: "holiday_code_id", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: " col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: ' col-md-12 mt-4 float-left' },
        { title: 'Select shifts to add leave', required: false, type: 'checkbox', checkboxList: PlanCheckboxList, changeCheckbox: PlanCheckboxChange, style: ' col-md-12 mt-2 float-left' },
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: " col-md-12 mt-2 float-left" },
    ]

    const defaultFieldsArray = [
        { title: t("EMPLOYEE_TITLE"), name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, isMulti: false, style: " col-md-4 mt-2" },
        { title: t("MULTIPLE_DATES"), name: "dates", required: true, type: "date", style: " col-md-4 mt-2 float-left", isMulti: true },
        { title: t("HOLIDAY_CODE"), name: "holiday_code_id", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: " col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: ' col-md-12 mt-4 float-left' },
        { title: 'Select shifts to add leave', required: false, type: 'checkbox', checkboxList: PlanCheckboxList, changeCheckbox: PlanCheckboxChange, style: ' col-md-12 mt-2 float-left' },
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: " col-md-12 mt-2 float-left" },
    ]


    return (
        <Modal
            show={props.addLeave}
            onHide={onHide}
            size="xl"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={true}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='container' >
                    <div className="row">
                    {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={t("VALIDATION_ERROR") + ("!")}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                        <div className='col-md-12 text-center'>
                            {t("ADD_LEAVE")}
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <p>{props.body}</p> */}
                <div className='add_leave_popup'>
                    <FormsNew
                        data={multipleDays ? multipleDaysArrayField : defaultFieldsArray}
                        SetValues={setValue}
                        formattedData={formData}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-style float-left' onClick={() => onSave()}>
                    {t("SAVE")}
                </Button>
                <Button className='button-style' onClick={() => onHide()}>
                    {props.buttonName ? (props.buttonName) : t('CLOSE')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddLeavePopup
