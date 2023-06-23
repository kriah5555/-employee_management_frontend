import React, { useEffect, useState } from "react";
import TextInput from "../components/atoms/formFields/TextInput";
import { t } from "../translations/Translation";
import Logo from "../static/icons/Logo.png"
import CustomButton from "../components/atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import IndiiBanner from "../static/icons/indii.jpeg";


export default function Login() {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    const Authenticate = () => {
        setAuth(true)
        localStorage.setItem('auth', true)
        navigate('/')
    }
    useEffect(() => {
        localStorage.setItem('auth', auth);
    }, [auth])


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
                <TextInput title={('Username')} name={"username"} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                <br></br>
                <TextInput title={('Password')} name={"password"} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true}></TextInput>
                <p className="mt-3 font-weight-bold text-right col-md-8 mx-auto">Forgot password?</p>
                <div className="col-md-8 mx-auto">
                    <CustomButton buttonName={'Login'} ActionFunction={() => Authenticate()} CustomStyle={"col-md-12 mx-auto"}></CustomButton>
                </div>
            </div>
        </div>
    )
}
