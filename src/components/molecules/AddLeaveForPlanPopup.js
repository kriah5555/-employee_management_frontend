import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import FormsNew from './FormsNew';
import { APICALL as AXIOS } from '../../services/AxiosServices';
import { AddLeaveApiUrl, GetLeaveOptionsApiUrl, AddShiftLeaveApiUrl } from "../../routes/ApiEndPoints";
import { getFormattedDropdownOptions } from '../../utilities/CommonFunctions';
import ErrorPopup from '../../utilities/popup/ErrorPopup';
import { toast } from "react-toastify"

const AddLeaveForPlanPopup = (props) => {
    const [holidayCode, setHolidayCode] = useState([]);
    const [holidayCodeList, setHolidayCodeList] = useState([])
    const [formData, setFormData] = useState({
        "plan_id": props.planIdForLeave,
        "reason": "",
        "holiday_code_id": ''
    })
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        AXIOS.service(GetLeaveOptionsApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setHolidayCodeList(getFormattedDropdownOptions(result.data.leave_codes, 'id', 'holiday_code_name'))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const setValue = (index, name, value, type) => {
        let form_data = { ...formData }

        if (type !== 'dropdown') {
            form_data[name] = value
        } else {
            setHolidayCode(value)
            form_data['holiday_code_id'] = value.value
        }
        setFormData(form_data);
    }

    const onHide = () => {
        props.setLeavePopup(false)
        props.setPlanPopup(true)
    }
    const onSave = () => {

        AXIOS.service(AddShiftLeaveApiUrl, 'POST', formData)
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
                }
            })
            .catch((error) => {
                console.log(error);
            })
        props.setLeavePopup(false)
        // props.setPlanPopup(true)
    }

    const fieldsArray = [
        { title: t("HOLIDAY_CODE"), name: "holiday_code_id", required: true, type: "dropdown", options: holidayCodeList, selectedOptions: holidayCode, style: " col-md-6 mt-2 float-left" },
        { title: t("REASON"), name: "reason", required: false, type: "text-area", style: " col-md-12 mt-4 float-left" },
    ]

    return (
        <Modal
            show={props.leavePopup}
            onHide={onHide}
            size="lg"
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
                        data={fieldsArray}
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

export default AddLeaveForPlanPopup
