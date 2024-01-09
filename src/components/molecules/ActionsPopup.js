import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import FormsNew from './FormsNew';
import { APICALL as AXIOS } from '../../services/AxiosServices';
import BackIcon from "../../static/icons/BackIcon.png";
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

        AXIOS.service(UpdateHolidayStatusApiUrl + "/" + holidayId + "/" + status, 'POST')
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
        { title: "Reporting manager", name: "manager_id", required: true, type: "dropdown", options: managersList, selectedOptions: selectedManager, style: "col-md-12 mt-2 ml-5" }
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
                    {props.actions?.approve && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "approve")} src={AcceptIcon}></img><p className='mr-5'>Approve</p></>}
                    {props.actions?.reject && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "reject")} src={RejectIcon}></img><p className='mr-5'>Reject</p></>}
                    {props.actions?.cancel && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "cancel")} src={RejectIcon}></img><p className='mr-5'>Cancel</p></>}
                    {props.actions?.change_manager && <><img className="shortcut-icon mr-2" onClick={() => handleChangeManager()} src={ChangeReportingManagerIcon}></img><p className='mr-5'>change manager</p></>}
                    {props.actions?.request_cancel && <><img className="shortcut-icon mr-2" onClick={() => handleAction(props.data?.id, "request_cancel")} src={RequestCancelIcon}></img><p className='mr-5'>Request cancel</p></>}
                </div>
                {showDropDown && <div className='text-center d-flex border-top mt-2'>
                    <div className='col-md-8'><FormsNew data={formFields} formattedData={formData} SetValues={setValues}></FormsNew></div><div className='col-md-4'><Button className='button-style float-left mt-5' onClick={() => saveManager()}>Save</Button></div>
                </div>}
            </Modal.Body>
        </Modal>
    );
}