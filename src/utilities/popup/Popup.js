import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "./popup.css";


const ModalPopup = (props) => {

    return (
        <Modal
            show={true}
            onHide={props.onHide}
            size={props.size ? props.size : "sm"}
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={props.backdrop}
        >
            <Modal.Header closeButton={props.close}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {(props.title)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>
            <Modal.Footer>
                {/* {props.deleteTableRows && <Button className='button-style float-left' onClick={() => props.deleteTableRows(0,0,1,0)}>
                    {t('YES_DELETE')}
                </Button>} */}
                {props.onConfirm && <Button className='button-style float-left' onClick={() => props.onConfirm()}>
                    {props.startplanButton ? props.startplanButton : t('YES')}
                </Button>}
                {(props.title !== t("RESPONSIBLE_COMPANY") || props.title !== t("PLAN_DETAILS")) && <Button className='button-style' onClick={props.onHide}>
                    {props.buttonName ? (props.buttonName) : t('CLOSE')}
                </Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPopup
