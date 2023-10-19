import React, { useEffect, useState } from "react";
import TextInput from "../components/atoms/formFields/TextInput";
import { t } from "../translations/Translation";
import Logo from "../static/icons/Logo.png"
import CustomButton from "../components/atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import IndiiBanner from "../static/icons/indii.jpeg";
import { APICALL as AXIOS } from "../services/AxiosServices";
import { LoginApiUrl } from "../routes/ApiEndPoints";


export default function Login({ setAuth }) {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('Enter username below to get reset password link');
    // Function to call login Api
    const Authenticate = () => {

        let data = {
            'username': userName,
            'password': password
        }

        AXIOS.service(LoginApiUrl, 'POST', data)
            .then((result) => {
                if (result.success) {
                    let response = result.data
                    localStorage.setItem('token', 'Bearer ' + response.token.access_token);
                    localStorage.setItem('refresh_token', response.token.refresh_token);
                    localStorage.setItem('userId', response.uid);
                    localStorage.setItem('name', response.username);
                    setAuth(true)
                    localStorage.setItem('auth', true)
                    navigate('/');
                }
            })
    }


    // Function to call login Api
    const getLink = () => {
        setMessage('Mail sent successfully. Please check your mail for reset password link');

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


    localStorage.setItem('auth', false);

    return (
        <div className="col-md-12 d-flex full-page-height align-items-center p-0">
            <div className="col-md-6 p-0 border-right full-page-height">
                <img className="banner-style" src={IndiiBanner}></img>
            </div>
            <div className="col-md-5 mx-auto float-right">
                <div className="mb-5 text-center">
                    <img alt={t("LOGO")} className="login-logo" src={Logo}></img>
                </div>
                <br></br>

                {/* LOGIN */}
                {window.location.hash === '' && <>
                    <TextInput title={('Username')} name={"username"} setValue={setUserName} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                    <br></br>
                    <TextInput title={('Password')} name={"password"} setValue={setPassword} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                    <p className="mt-3 font-weight-bold text-right col-md-8 mx-auto" >
                        <a className="text-color" href="#forgot-password">Forgot your password?</a>
                    </p>
                    <div className="col-md-8 mx-auto">
                        <CustomButton buttonName={'Login'} ActionFunction={() => Authenticate()} CustomStyle={"col-md-12 mx-auto"}></CustomButton>
                    </div>
                </>}

                {/* FORGOT PASSWORD */}
                {window.location.hash === '#forgot-password' && <>
                    <div className="mb-3 text-center">
                        <h5><span id="text-indii-blue">{message}</span></h5>
                    </div>
                    <br></br>
                    <TextInput title={('Username')} name={"username"} setValue={setUserName} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                    <br></br>
                    <div className="col-md-8 mx-auto pt-3 d-flex justify-content-end">
                        <CustomButton buttonName={'Get Link'} ActionFunction={() => getLink()} CustomStyle={"col-md-3"}></CustomButton>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/login')} CustomStyle={"col-md-3"}></CustomButton>
                    </div>
                </>}

                {/* RESET PASSWORD */}
            </div>
        </div>
    )
}
