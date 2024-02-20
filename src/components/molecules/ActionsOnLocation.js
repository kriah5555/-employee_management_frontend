import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "../../utilities/popup/popup.css";
import { APICALL as AXIOS } from '../../services/AxiosServices';
import { ValidateLocationDashboardAccessTokenForLocation, GetDashboardAccessTokenForLocation, DeactivateLocationOnAllDeviceApiUrl } from '../../routes/ApiEndPoints';
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import LoadingIcon from "../../utilities/LoadingIcon"

export default function ActionsOnLocation(props) {

    const [errors, setErrors] = useState([]);
    const [isActive, setIsActive] = useState("")

    useEffect(() => {
        let token = localStorage.getItem("dashboard_access_token")
        AXIOS.service(ValidateLocationDashboardAccessTokenForLocation + "/" + token, 'GET')
            .then((result) => {
                if (result?.success) {
                    setIsActive(result.data?.access)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleAction = (key) => {
        let url = ""
        let method = ''

        if (key === 'activate') {
            url = GetDashboardAccessTokenForLocation + "/" + props.data.id
            method = "GET"
            AXIOS.service(url, method)
                .then((result) => {
                    if (result?.success) {
                        localStorage.setItem('dashboard_access_token', result.data.access_key)
                        props.setOpenPopUp(false)
                        toast.success(t('LOCATION_ACTIVATED_MESSAGE'), {
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
        } else if (key === 'de_activate') {

            localStorage.removeItem("dashboard_access_token")
            props.setOpenPopUp(false)
            toast.success(t("LOCATION_DEACTIVATED_MESSAGE"), {
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
            url = DeactivateLocationOnAllDeviceApiUrl + '/' + localStorage.getItem('dashboard_access_token')
            method = "DELETE"
            AXIOS.service(url, method)
                .then((result) => {
                    if (result?.success) {
                        props.setOpenPopUp(false)
                        toast.success(t("LOCATION_DEACTIVATED_ON_ALL_DEVICE"), {
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
                    {isActive === "" && <LoadingIcon></LoadingIcon>}
                    {(!isActive && isActive !== "") && <Button className='button-style float-left mt-2 mr-2 mb-2' onClick={() => handleAction("activate")}>{t("ACTIVATE_ON_THIS_DEVICE")}</Button>}
                    {isActive && <Button className='button-style float-left mt-2 mr-2 mb-2' onClick={() => handleAction("de_activate")}>{t("DE_ACTIVATE_ON_THIS_DEVICE")}</Button>}
                    {isActive && <Button className='button-style float-left mt-2 mr-2 mb-2' onClick={() => handleAction("de_activate_on_all")}>{t("DE_ACTIVATE_ON_ALL_DEVICES")}</Button>}
                </div>
            </Modal.Body>
        </Modal>
    );
}