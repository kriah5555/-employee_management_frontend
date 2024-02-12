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
import Uurrooster from "./Uurrooster";
import LoginIcon from "../static/icons/login.png";
import UurroosterIcon from "../static/icons/UurroosterActive.svg";

export default function Login({ setAuth }) {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [uurroosterStatus, setUurroosterStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState([]);

    const [message, setMessage] = useState(t("FORGOT_PASSWORD_INSTRUCTION"));
    const [activeLanguage, setActiveLanguage] = useState({ value: localStorage.getItem('active_language') == null ? "nl" : localStorage.getItem('active_language'), label: (localStorage.getItem('active_language') == null ? "nl" : localStorage.getItem('active_language'))?.toUpperCase() })
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
                    setErrorMessage('')
                    localStorage.setItem('token', 'Bearer ' + response.token.access_token);
                    localStorage.setItem('refresh_token', response.token.refresh_token);
                    localStorage.setItem('userId', response.uid);
                    localStorage.setItem('name', response.username);
                    localStorage.setItem('activeIcon', t('DASHBOARD'));
                    setAuth(true)
                    localStorage.setItem('auth', true)
                    navigate('/');
                } else {
                    setErrorMessage(result.message)
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
        <>
            {localStorage.getItem('dashboard_access_token') !== 'null' &&
                <nav className="navbar navbar-expand-sm bg-white navbar-light px-4 mx-auto shadow-sm border-bottom py-3 justify-content-between">
                    <div className="d-flex col-xl-3 col-lg-4">
                        <div className=" align-items-center">
                            <a className="navbar-brand p-0" href="/"><img alt={t("LOGO")} className="logo" src={Logo}></img></a>
                        </div>
                    </div>
                    <div className="d-flex my-auto">
                        {uurroosterStatus ? <img src={LoginIcon} className="shortcut-icon mt-1 mr-2" onClick={() => setUurroosterStatus(false)}></img> : <img src={UurroosterIcon} className="shortcut-icon mt-1 mr-2" onClick={() => setUurroosterStatus(true)}></img>}
                        <Dropdown
                            key={"login_page"}
                            options={LanguageOptions}
                            selectedOptions={activeLanguage}
                            onSelectFunction={(e) => { setActiveLanguage(e); localStorage.setItem('active_language', e?.value); window.location.reload(); }}
                            styleClass="language-dropdown my-auto"
                        ></Dropdown>
                    </div>
                </nav>
            }
            <div className={"col-md-12 d-flex login_height align-items-center p-0 " + (localStorage.getItem('dashboard_access_token') !== 'null' ? 'login_height' : 'full-page-height')}>
                {(localStorage.getItem('dashboard_access_token') === 'null' || localStorage.getItem('dashboard_access_token') === '' || localStorage.getItem('dashboard_access_token') === null) ?
                    <div className="col-md-6 p-0 border-right full-page-height">
                        <img className="banner-style" src={IndiiBanner}></img>
                    </div>
                    :
                    (!uurroosterStatus && <div className="col-md-6 p-0 border-right login_height d-flex justify-content-center bg-qrcode">
                        <h4 className="text-center scan-text" id="text-indii-dark-blue">{t('SCAN_TEXT')}</h4>
                        <br></br>
                        <Uurrooster view="login" showData="qrcode"></Uurrooster>
                    </div>)
                }

                {localStorage.getItem('dashboard_access_token') !== 'null' && uurroosterStatus &&
                    <div className="col-md-12 p-0"> <Uurrooster view="login"></Uurrooster></div>
                }

                {/* <div className="col-md-5 p-0 login_height"> */}
                {!uurroosterStatus && <div className={"mx-auto d-flex align-items-center justify-content-center float-right position-relative h-100 col-md-5"}>
                    {(localStorage.getItem("dashboard_access_token") === 'null' || localStorage.getItem('dashboard_access_token') === '' || localStorage.getItem('dashboard_access_token') === null) && <div className="position-absolute login_lang_dropdown mt-3">
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
                    </div>}
                    <div className={localStorage.getItem('dashboard_access_token') !== 'null' ? "w-100" : "w-75"}>
                        <div className="mb-5 text-center">
                            <img alt={t("LOGO")} className="login-logo" src={Logo}></img>
                        </div>
                        <br></br>

                        {/* LOGIN */}
                        {errorMessage && errorMessage.map((error, i) => {
                            return (
                                <p class="text-danger mb-1 text-center">{error}</p>
                            )
                        })}
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
                </div>}
                {/* </div> */}
            </div>
        </>
    )
}
