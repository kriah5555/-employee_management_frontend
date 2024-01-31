import React, { useEffect, useState } from "react";
import TextInput from "../components/atoms/formFields/TextInput";
import { t } from "../translations/Translation";
import Logo from "../static/icons/Logo.png"
import CustomButton from "../components/atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import IndiiBanner from "../static/icons/indii.jpeg";
import { APICALL as AXIOS } from "../services/AxiosServices";
import { LoginApiUrl } from "../routes/ApiEndPoints";
import Dropdown from "../components/atoms/Dropdown";

export default function Login({ setAuth }) {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(t("FORGOT_PASSWORD_INSTRUCTION"));
    const [activeLanguage, setActiveLanguage] = useState({ value: localStorage.getItem('active_language')==null?"nl": localStorage.getItem('active_language'), label: (localStorage.getItem('active_language')==null?"nl":localStorage.getItem('active_language'))?.toUpperCase() })
    //Language options
    const LanguageOptions = [
        { value: 'en', label: 'EN' },
        { value: 'nl', label: 'NL' },
        { value: 'fr', label: 'FR' },
    ]
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
                    localStorage.setItem('activeIcon', t('DASHBOARD'));
                    setAuth(true)
                    localStorage.setItem('auth', true)
                    navigate('/');
                }
            })
    }


    // Function to call login Api
    const getLink = () => {
        setMessage(t("FORGOT_PASSWORD_SUCCESS_MESSAGE"));

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
            {/* <div className="col-md-5 p-0 full-page-height"> */}
            <div className="col-md-5 mx-auto d-flex align-items-center justify-content-center float-right position-relative h-100 ">
                <div className="position-absolute login_lang_dropdown mt-3">
                    <ul className="navbar-nav">
                        <li className="mx-3 px-2 w-max-content">
                            <Dropdown
                                key={"login_page"}
                                options={LanguageOptions}
                                selectedOptions={activeLanguage}
                                onSelectFunction={(e) => { setActiveLanguage(e); localStorage.setItem('active_language', e?.value); window.location.reload(); }}
                                styleClass="language-dropdown"
                            ></Dropdown>
                        </li>
                    </ul>
                </div>
                <div className="w-75">
                    <div className="mb-5 text-center">
                        <img alt={t("LOGO")} className="login-logo" src={Logo}></img>
                    </div>
                    <br></br>

                    {/* LOGIN */}
                    {window.location.hash === '' && <>
                        <TextInput title={t('USERNAME')} name={"username"} setValue={setUserName} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                        <br></br>
                        <TextInput title={t('PASSWORD')} name={"password"} setValue={setPassword} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                        <p className="mt-3 font-weight-bold text-right col-md-8 mx-auto" >
                            <a className="text-color" href="#forgot-password">{t("FORGOT_YOUR_PASSWORD")}?</a>
                        </p>
                        <div className="col-md-8 mx-auto">
                            <CustomButton buttonName={t("LOGIN")} ActionFunction={() => Authenticate()} CustomStyle={"col-md-12 mx-auto"}></CustomButton>
                        </div>
                    </>}

                    {/* FORGOT PASSWORD */}
                    {window.location.hash === '#forgot-password' && <>
                        <div className="mb-3 text-center">
                            <h5><span id="text-indii-blue">{message}</span></h5>
                        </div>
                        <br></br>
                        <TextInput title={t('USERNAME')} name={"username"} setValue={setUserName} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                        <br></br>
                        <div className="col-md-8 mx-auto pt-3 d-flex justify-content-end">
                            <CustomButton buttonName={t("GET_LINK")} ActionFunction={() => getLink()} CustomStyle={"col-md-3"}></CustomButton>
                            <CustomButton buttonName={t("BACK_LINK")} ActionFunction={() => navigate('/login')} CustomStyle={"col-md-3"}></CustomButton>
                        </div>
                    </>}
                </div>

                {/* RESET PASSWORD */}
            </div>
            {/* </div> */}
        </div>
    )
}
