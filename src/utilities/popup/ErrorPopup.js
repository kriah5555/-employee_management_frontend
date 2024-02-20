import React from 'react';
import Modal from 'react-bootstrap/Modal';
import "./popup.css";


const ErrorPopup = (props) => {

    console.log(props.body)
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
                <Modal.Title id="contained-modal-title-vcenter" className='text-danger'>
                    {(props.title)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {props.body.length === 1 ?
                        <p className='text-danger'>{props.body[0]}</p> :

                        (props.body.map((error, index) => {
                            return (
                                <li className='text-danger'>{error}</li>
                            )

                        }))
                    }
                </ul>
            </Modal.Body>
        </Modal>
    );
}

export default ErrorPopup
