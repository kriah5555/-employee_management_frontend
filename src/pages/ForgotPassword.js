import React, { useState } from "react";
import TextInput from "../components/atoms/formFields/TextInput";
import { t } from "../translations/Translation";
import Logo from "../static/icons/Logo.png"
import CustomButton from "../components/atoms/CustomButton";
import IndiiBanner from "../static/icons/indii.jpeg";
import { useNavigate } from "react-router-dom";

// import {GetResetPasswordLinkApiUrl} from '../routes/ApiEndPoints'

export default function ForgotPassword() {

    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    
    // Function to call login Api
     const getLink = () => {

    //     let data = {
    //         'username': userName,
    //     }

    //     AXIOS.service(GetResetPasswordLinkApiUrl, 'POST', data)
    //         .then((result) => {
    //             if (result.success) {
    //                 let response = result.data
    //             }
    //         })
    }

    return (
        <div className="col-md-12 d-flex full-page-height align-items-center p-0">
            <div className="col-md-6 p-0 border-right full-page-height">
                <img className="banner-style" src={IndiiBanner}></img>
            </div>
            <div className="col-md-5 mx-auto float-right">
                <div className="mb-5 text-center">
                    <img alt={t("LOGO")} className="login-logo" src={Logo}></img>
                </div>
                <div className="mb-3 text-center">
                  <h5><span id="text-indii-blue">Enter username below to get reset password link</span></h5>
                </div>
                <br></br>
                <TextInput title={('Username')} name={"username"} setValue={setUserName} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                <br></br>
                <div className="col-md-8 mx-auto pt-3 d-flex justify-content-end">
                <CustomButton buttonName={'Get Link'} ActionFunction={() => getLink()} CustomStyle={"col-md-3"}></CustomButton>
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/login')} CustomStyle={"col-md-3"}></CustomButton>
                </div>
            </div>
        </div>
    )
}
