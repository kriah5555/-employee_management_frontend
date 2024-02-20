import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import FormsNew from './FormsNew';
import { APICALL as AXIOS } from '../../services/AxiosServices';
import AcceptIcon from "../../static/icons/Available.svg"
import RejectIcon from "../../static/icons/Notavailable.svg"
import RequestCancelIcon from "../../static/icons/RequestCancel.svg"
import ChangeReportingManagerIcon from "../../static/icons/ChangeReportingManager.svg"
import { UpdateHolidayStatusApiUrl, ResponsiblePersonApiUrl, ChangeReportingManagerForHOliday } from '../../routes/ApiEndPoints';
import { getFormattedDropdownOptions } from '../../utilities/CommonFunctions';
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";

// import FormsNew from './FormsNew';
export default function ActionsPopup(props) {

    const [showDropDown, setShowDropDown] = useState(false)
    const [managersList, setManagersList] = useState([])
    const [selectedManager, setSelectedManager] = useState("")
    const [formData, setFormData] = useState({
        "absence_id": props.data?.id,
        "manager_id": ""
    })
    const [errors, setErrors] = useState([]);
    // const [holidayId, setHolidayId] = useState("")

    useEffect(() => {

        AXIOS.service(ResponsiblePersonApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setManagersList(getFormattedDropdownOptions(result.data, "id", "full_name"))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])



    const setValues = (index, name, value, type) => {
        let newdata = { ...formData }
        newdata.manager_id = value.value
        setFormData(newdata)
        setSelectedManager(value)
    }

    const handleChangeManager = () => {
        setShowDropDown(true)
    }

    const saveManager = () => {
        AXIOS.service(ChangeReportingManagerForHOliday, 'POST', formData)//api url need to change
            .then((result) => {
                if (result?.success) {
                    props.setOpenPopUp(false)
                    props.setRefresh(!props.refresh)
                    props.onHide()
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

    const handleAction = (holidayId, status) => {

        let data = {
            'holiday_id': holidayId,
            'status': status,
            'reason': "",
        }

        AXIOS.service(UpdateHolidayStatusApiUrl, 'POST', data)
            .then((result) => {
                if (result?.success) {
                    props.setOpenPopUp(false)
                    props.setRefresh(!props.refresh)
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

    const formFields = [
        { title: t("REPORTING_MANAGER"), name: "manager_id", required: true, type: "dropdown", options: managersList, selectedOptions: selectedManager, style: "col-md-12 mt-2 ml-5" }
    ]

    return (
        <Modal
            show={props.openPopUp}
            onHide={props.onHide}
            size="lg"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={true}
            backdrop="static"
        >
            <Modal.Header closeButton>
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={t("VALIDATION_ERROR") + ("!")}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                <Modal.Title id="contained-modal-title-vcenter" className='container' >
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <p>{props.body}</p> */}
                <div className='d-flex justify-content-center '>
                    {props.actions?.approve && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "2")} src={AcceptIcon} alt={t("APPROVE")}></img><p className='mr-5'>{t("APPROVE")}</p></>} {/* 'APPROVE'=> 2, 'REJECT'=> 3, 'CANCEL' => 4, 'REQUEST_CANCEL' => 5,*/}
                    {props.actions?.reject && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "3")} src={RejectIcon} alt={t("REJECT")}></img><p className='mr-5'>{t("REJECT")}</p></>}
                    {props.actions?.cancel && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "4")} src={RejectIcon} alt={t("CANCEL")}></img><p className='mr-5'>{t("CANCEL")}</p></>}
                    {props.actions?.change_manager && <><img className="shortcut-icon mr-2" onClick={() => handleChangeManager()} src={ChangeReportingManagerIcon} alt={t("CHANGE_MANAGER")}></img><p className='mr-5'>{t("CHANGE_MANAGER")}</p></>}
                    {props.actions?.request_cancel && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "5")} src={RequestCancelIcon} alt={t("REQUEST_CANCEL")}></img><p className='mr-5'>{t("REQUEST_CANCEL")}</p></>}
                </div>
                {showDropDown &&
                    <div className='text-center row border-top mt-2'>
                        <div className='col-md-8'>
                            <FormsNew data={formFields} formattedData={formData} view="contracts" SetValues={setValues}></FormsNew>
                        </div>
                        <div className='col-md-4 pt-2'>
                            <Button className='button-style float-left mt-5 pt-2' onClick={() => saveManager()}>{t("SAVE")}</Button>
                        </div>
                    </div>}
            </Modal.Body>
        </Modal>
    );
}