import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import FormsNew from './FormsNew';
import { APICALL as AXIOS } from '../../services/AxiosServices';

const AddLeavePopup = (props) => {
    const [employee, setEmployee] = useState("");
    const [employeeList, setEmployeeList] = useState([]);
    const [holidayCode, setHolidayCode] = useState([]);
    const [holidayCodeList, setHolidayCodeList] = useState([])
    const [reason, setReason] = useState("")
    const [formData, setFormData] = useState({
        "employee": "",
        "dates": "",
        "holiday_code": "",
        "reason": "",
        "half_day_holiday_codes": { "morning": "", "evening": "" },
        "multiple_holiday_codes": { "hour": "", "holiday_code": "" }
    })

    const [halfDay, setHalfDay] = useState(false);
    const [multipleDays, SetMultipleDays] = useState(false);
    const [multipleHolidayCode, setMultipleHOlidayCode] = useState(false)
    const [morning, setMorning] = useState(false)
    const [evening, setEvening] = useState(false)

    let checkboxList = [
        {
            name: 'Half day',
            key: 'half_day',
            checked: halfDay,
        },
        {
            name: 'Multiple days',
            key: 'multiple_days',
            checked: multipleDays,
        },
        {
            name: 'Multiple holiday codes',
            key: 'multiple_holiday_codes',
            checked: multipleHolidayCode,
        },

    ]
    let halfDayCheckboxList = [
        {
            name: 'Half day',
            key: 'half_day',
            checked: halfDay,
            customStyle: " mr-2"
        },
        {
            name: 'Morning',
            key: 'morning',
            checked: morning,
            customStyle: " mr-2"
        },
        {
            name: 'Evening',
            key: 'evening',
            checked: evening,
            customStyle: " mr-2"
        },
    ]

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
                name: 'Multiple holiday codes',
                key: 'multiple_holiday_codes',
                checked: multipleHolidayCode,
            },
        ]
    } else if (multipleHolidayCode) {
        checkboxList = [
            {
                name: 'Half day',
                key: 'half_day',
                checked: halfDay,
            },
            {
                name: 'Multiple holiday codes',
                key: 'multiple_holiday_codes',
                checked: multipleHolidayCode,
            },
        ]

    } else if (multipleDays) {
        checkboxList = [
            {
                name: 'Multiple days',
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
    const formFields = halfDay ? [
        { title: "Employee", name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: "Multiple dates", name: "dates", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        (morning ? { title: "Holiday code for morning shift", name: "morning_holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" }
            : {}),
        (evening ? { title: "Holiday code for evening shift", name: "evening_holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" }
            : {}),
        { title: '', required: false, type: 'checkbox', checkboxList: halfDayCheckboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left d-flex' },
        (halfDay && morning && evening ? {}
            : { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 float-left' }),
        (multipleHolidayCode ? { type: "arry_of_values" } : {}),
        { title: "Reason", name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" }
    ] : multipleDays ? [
        { title: "Employee", name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: "From date", name: "from_date", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: "To date", name: "to_date", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: "Holiday code", name: "holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
        { title: "Reason", name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" },
    ] : multipleHolidayCode ? [
        { title: "Employee", name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: "Multiple dates", name: "dates", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
        { type: "arry_of_values" },
        { title: "Reason", name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" },
        (halfDay ? { title: '', required: false, type: 'checkbox', checkboxList: halfDayCheckboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left d-flex' } : {})
    ] : [
        { title: "Employee", name: "employee", required: true, type: "dropdown", options: employeeList, selectedOptions: employee, style: "col-md-4 mt-2" },
        { title: "Multiple dates", name: "dates", required: true, type: "date", style: "col-md-4 mt-4 float-left" },
        { title: "Holiday code", name: "holiday_code", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: "col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
        { title: "Reason", name: "reason", required: false, type: "text-area", style: "col-md-12 mt-4 float-left" },
    ]

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
    }

    const onHide = () => {
        props.setAddLeave(false)
    }
    const onSave = () => {
        props.setAddLeave(false)
    }

    return (<>
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
                            ADD LEAVE
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
                    {'Save'}
                </Button>
                <Button className='button-style' onClick={() => onHide()}>
                    {props.buttonName ? (props.buttonName) : t('CLOSE')}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default AddLeavePopup
