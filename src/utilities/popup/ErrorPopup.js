import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from '../../translations/Translation';
import "./popup.css";


const ErrorPopup = (props) => {

    return (
        <Modal
            show={true}
            onHide={props.onHide}
            size="md"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="text-danger">
                    {(props.title)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body.length === 1 ? <p className='text-danger'>{props.body[0]}</p> :
                    <ul>
                        {props.body.map((error, index) => (
                            <li className='text-danger my-1' key={index}>{error}</li>
                        ))}
                    </ul>
                }
            </Modal.Body>
        </Modal>
    );
}

export default ErrorPopup
