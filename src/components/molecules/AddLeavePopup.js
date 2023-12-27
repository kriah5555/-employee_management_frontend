import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import FormsNew from './FormsNew';
import { APICALL as AXIOS } from '../../services/AxiosServices';
import { ResponsiblePersonApiUrl } from "../../routes/ApiEndPoints";

const AddLeavePopup = (props) => {
    const [employee, setEmployee] = useState("");
    const [employeeList, setEmployeeList] = useState([{ value: 2, label: 'Test user' }]);
    const [holidayCode, setHolidayCode] = useState([]);
    const [holidayCodeList, setHolidayCodeList] = useState([{ value: 2, label: 'dummy holiday code' }])
    const [formData, setFormData] = useState({
        "employee_profile_id": "",
        "manager_id": "",
        "duration_type": '8',
        "dates": "",
        "holiday_code_counts": [],
        "reason": "",
        // "half_day_holiday_codes": { "morning": "", "evening": "" },
        // "multiple_holiday_codes": { "hour": "", "holiday_code": "" }
    })

    let holiday_code_format = {
        "holiday_code": "",
        "hours": 0,
        "duration_type": '',
    }

    const [halfDay, setHalfDay] = useState(false);
    const [multipleDays, SetMultipleDays] = useState(false);
    const [multipleHolidayCode, setMultipleHOlidayCode] = useState(false)
    const [morning, setMorning] = useState(false)
    const [evening, setEvening] = useState(false)
    const [formFields, setFormFields] = useState([])

    let checkboxList = [
        {
            name: t("HALF_DAY"),
            key: 'half_day',
            checked: halfDay,
        },
        {
            name: t("MULTIPLE_DAYS"),
            key: 'multiple_days',
            checked: multipleDays,
        },
        {
            name: t("MULTIPLE_HOLIDAY_CODES"),
            key: 'multiple_holiday_codes',
            checked: multipleHolidayCode,
        },

    ]
    let halfDayCheckboxList = [
        {
            name: t("HALF_DAY"),
            key: 'half_day',
            checked: halfDay,
            customStyle: " mr-2"
        },
        {
            name: t("MORNING"),
            key: 'morning',
            checked: morning,
            customStyle: " mr-2"
        },
        {
            name: t("EVENING"),
            key: 'evening',
            checked: evening,
            customStyle: " mr-2"
        },
    ]

    // useEffect(() => {
    //     AXIOS.service(ResponsiblePersonApiUrl, 'GET')
    //         .then((result) => {
    //             if (result?.success) {
    //                 setEmployeeList(result.data)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }, [])

    const changeCheckbox = (type) => {

        if (type === 'half_day') {
            setHalfDay(!halfDay)
            SetMultipleDays(false)
            //check multiple holiday code is already selected. if selected then we will not set it to false
            if (multipleHolidayCode == false) {
                setMultipleHOlidayCode(false)
            }
            setMorning(false)
            setEvening(false)

        } else if (type === "multiple_days") {
            setHalfDay(false)
            SetMultipleDays(!multipleDays)
            setMultipleHOlidayCode(false)

        } else if (type === 'multiple_holiday_codes') {
            //check if half day is already selected then set it true, 
            //becuse we rendering it again it will be unselected,
            if (halfDay) {
                setHalfDay(true)
            } else {
                setHalfDay(false)
            }
            setMultipleHOlidayCode(!multipleHolidayCode)

        } else if (type === 'morning') {
            setMorning(!morning)
            //this is for to prevent rendering of hours and holiday_codes codes if evening is already selected
            if (evening) {
                setMultipleHOlidayCode(false)
            }

        } else if (type === 'evening') {
            setEvening(!evening)
            //this is for to prevent rendering of hours and holiday_codes codes if morning is already selected
            if (morning) {
                setMultipleHOlidayCode(false)
            }
        }
    }

    //based on selected checkbox altering the checkbox list to keep only required checkbox
    if (halfDay) {
        checkboxList = [
            {
                name: t("MULTIPLE_HOLIDAY_CODES"),
                key: 'multiple_holiday_codes',
                checked: multipleHolidayCode,
            },
        ]
    } else if (multipleHolidayCode) {
        checkboxList = [
            {
                name: t("HALF_DAY"),
                key: 'half_day',
                checked: halfDay,
            },
            {
                name: t("MULTIPLE_HOLIDAY_CODES"),
                key: 'multiple_holiday_codes',
                checked: multipleHolidayCode,
            },
        ]

    } else if (multipleDays) {
        checkboxList = [
            {
                name: t("MULTIPLE_DAYS"),
                key: 'multiple_days',
                checked: multipleDays,
            }
        ]
    }



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

        if (halfDay) {
            newFormFields = halfDayFieldsArray;
        } else if (multipleHolidayCode) {
            newFormFields = multipleHolidayCodeFieldsArray;
        } else if (multipleDays) {
            newFormFields = multipleDaysArrayField;
        } else {
            newFormFields = defaultFieldsArray;
        }

        setFormFields(newFormFields);
    }, [halfDay, multipleDays, multipleHolidayCode, morning, evening]);



    const setValue = (index, name, value, type) => {
        if (type !== 'dropdown') {
            setFormData((prev) => ({ ...prev, [name]: value }))
        } else {
            if (name === 'employee') {
                setEmployee(value);
                setFormData((prev) => ({ ...prev, [name]: value.value }))
            } else if (name === 'holiday_code') {
                setHolidayCode(value)
                setFormData((prev) => ({ ...prev, [name]: value.value }))
            }
        }
        setFormData(formData)
    }

    const onHide = () => {
        props.setAddLeave(false)
    }
    const onSave = () => {
        props.setAddLeave(false)
    }

    // field arrays
    const halfDayFieldsArray = [
        { title: t("EMPLOYEE_TITLE"), name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: t("MULTIPLE_DATES"), name: "dates", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        (morning ? { title: t("HOLIDAY_CODE_FOR_MORNING_SHIFT"), name: "morning_holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" }
            : {}),
        (evening ? { title: t("HOLIDAY_CODE_FOR_EVENING_SHIFT"), name: "evening_holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" }
            : {}),
        { title: '', required: false, type: 'checkbox', checkboxList: halfDayCheckboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left d-flex' },
        (halfDay && morning && evening ? {}
            : { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 float-left' }),
        (multipleHolidayCode ? { type: "arry_of_values" } : {}),
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" }
    ]

    const multipleDaysArrayField = [
        { title: t("EMPLOYEE_TITLE"), name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: t("FROM_DATE"), name: "from_date", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: t("TO_DATE"), name: "to_date", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: t("HOLIDAY_CODE"), name: "holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" },
    ]

    const multipleHolidayCodeFieldsArray = [
        { title: t("EMPLOYEE_TITLE"), name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: t("MULTIPLE_DATES"), name: "dates", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
        { type: "arry_of_values" },
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" },
        (halfDay ? { title: '', required: false, type: 'checkbox', checkboxList: halfDayCheckboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left d-flex' } : {})
    ]

    const defaultFieldsArray = [
        { title: t("EMPLOYEE_TITLE"), name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: t("MULTIPLE_DATES"), name: "dates", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: t("HOLIDAY_CODE"), name: "holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" },
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
                        <div className='col-md-12 text-center'>
                            {t("ADD_LEAVE")}
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <p>{props.body}</p> */}
                <FormsNew
                    data={formFields}
                    SetValues={setValue}
                    formattedData={formData}
                />
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
