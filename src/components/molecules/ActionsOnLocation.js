import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import { APICALL as AXIOS } from '../../services/AxiosServices';
import { UpdateHolidayStatusApiUrl } from '../../routes/ApiEndPoints';
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";

export default function ActionsOnLocation(props) {

    const [errors, setErrors] = useState([]);

    const handleAction = (locationId, key) => {
        let url = ""
        // if (key === 'activate') {   
        //     url=""
        //     //you have to set token in local storage

        // } else if ( key === 'de_activate') {
        //     url=""
        // } else {
        //     url=""
        // }

        // AXIOS.service(url , 'POST')
        //     .then((result) => {
        //         if (result?.success) {
        //             props.setOpenPopUp(false)
        //             props.setRefresh(!props.refresh)
        //             toast.success(result.message[0], {
        //                 position: "top-center",
        //                 autoClose: 2000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "colored",
        //             });
        //         } else {
        //             setErrors(result.message)
        //         }

        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

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
                    {!(props.isActive) && <Button className='button-style float-left mt-2 mr-2 mb-2' onClick={() => handleAction(props.data.id, "activate")}>{t("ACTIVATE_ON_THIS_DEVICE")}</Button>}
                    {props.isActive && <Button className='button-style float-left mt-2 mr-2 mb-2' onClick={() => handleAction(props.data.id, "de_activate")}>{t("DE_ACTIVATE_ON_THIS_DEVICE")}</Button>}
                    {<Button className='button-style float-left mt-2 mr-2 mb-2' onClick={() => handleAction(props.data.id, "de_activate_on_all")}>{t("DE_ACTIVATE_ON_ALL_DEVICES")}</Button>}
                </div>
            </Modal.Body>
        </Modal>
    );
}