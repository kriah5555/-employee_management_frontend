import React from "react";
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Switch from "./Switch";
export default function EnableNotification() {

    return (
        <>
            <h2 className="col-md-10 p-0 mt-5 mb-5 ml-5" id="text-indii-blue">Notifications</h2>
            <div className="col-md-12 p-5">
                <Switch label="Enable Notification" id="switch1" margin="mb-5" />
                <Switch label="Enable Email Notification" id="switch4" margin="mt-5" />
            </div>
        </>
    );
}           