import React from "react";
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Switch from "./Switch";
export default function EnableNotification() {

    return (
        <>
            <h2 className="col-md-10 p-0 mt-4 mb-3 ml-5" id="text-indii-blue">Notifications</h2>
            <div className="col-md-12 p-5">
                <Switch label="Enable Notification" id="switch1" styleClass="pt-2 pb-3 col-md-11 d-flex px-0 mb-5" />
                <Switch label="Enable Email Notification" id="switch4" styleClass="pt-2 pb-3 col-md-11 d-flex px-0 mt-5" />
            </div>
        </>
    );
}           