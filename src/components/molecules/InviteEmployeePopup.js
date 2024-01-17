import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EmployeeInviteApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { t } from "../../translations/Translation";
import CustomButton from "../atoms/CustomButton";
import { toast } from 'react-toastify';
import FormsNew from "./FormsNew";

export default function InviteEmployeePopup(props) {

    const navigate = useNavigate()
    const [inviteData, setInviteData] = useState(
        {
            "first_name": '',
            "last_name": "",
            "email": "",
        }
    )

    const setValues = (index, name, value, type) => {
        setInviteData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const onConfirm = () => {
        // localStorage.setItem("auth", false)
        // navigate('/invite-employee/sjdsjdbfhds')
        // window.open('/invite-employee/jhjhdffg', '_blank')
        // let url = EmployeeContractApiUrl

        AXIOS.service(EmployeeInviteApiUrl, "POST", inviteData)
            .then((result) => {
                if (result?.success) {
                    props.setOpenPopup(false)
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
    }

    const fieldsArray = [
        { title: t("FIRST_NAME"), name: "first_name", type: "text", required: true, style: "col-md-12 mx-auto d-block mt-3" },
        { title: t("LAST_NAME"), name: "last_name", type: "text", required: true, style: "col-md-12 mx-auto d-block mt-3" },
        { title: t("EMAIL"), name: "email", type: "text", required: true, style: "col-md-12 d-block mx-auto mt-3" },
    ]


    return (
        <Modal
            show={true}
            onHide={props.onHide}
            size="md"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {('Invite employee')}
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <h2 className="col-md-10 p-0 mt-4 mb-3 ml-5 text-center border-bottom pb-3" id="text-indii-blue">{t("INVITE_EMPLOYEE")}</h2>
                <FormsNew
                    view="invite_employee"
                    data={fieldsArray}
                    // formTitle={'Invite employee'}
                    SetValues={setValues}
                    formattedData={inviteData}
                    redirectURL={"/manage-employees"}
                    OnSave={onConfirm}
                ></FormsNew>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-style float-left' onClick={() => onConfirm()}>
                    {t("SEND")}
                </Button>
                <Button className='button-style' onClick={props.onHide}>
                    {props.buttonName ? (props.buttonName) : t("CANCEL")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
