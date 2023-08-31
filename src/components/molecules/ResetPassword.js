import React, { useEffect, useState } from "react";
import TextInput from "../../components/atoms/formFields/TextInput";
import PasswordInput from "../../components/atoms/formFields/PasswordInput";
import CustomButton from "../../components/atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices";


export default function ResetPassword() {

    // const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState("");
    const [messageColour, setColour] = useState("");


    // Function to validate strong password
    function validatePasswordStrength(password) {
        // At least 8 characters, including uppercase, lowercase, digit, and special character
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#?$%^&*]).{8,}$/;
        return strongRegex.test(password);
    }

    useEffect(() => {
        if (newPassword === '') {
            setValidationError("Password should contain minimum 8 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &");
            setColour("default");
        } else if (validatePasswordStrength(newPassword)) {
            setValidationError('Strong password');
            setColour("pass");
        } else {
            setValidationError('Weak passoword');
            setColour("fail");
        }

        if (confirmPassword !== newPassword && confirmPassword !== "") {

            setValidationError('confirm password not matching with new password');
            setColour("fail");
        }
    }, [newPassword, confirmPassword]);


    // Function to call login Api
    const sendRequest = () => {

        // let data = {
        //     'old_password':oldPassword,
        //     'new_password': newPassword,
        //     'confirm_password': confirmPassword,
        // }

        // AXIOS.service(ResetPasswordApiUrl, 'POST', data)
        //     .then((result) => {
        //         if (result.success) {
        //             let response = result.data
        //             navigate('/');
        //         }
        //     })
    }
    return (<>
        <h2 className="col-md-10 p-0 mt-5 mb-5 ml-5" id="text-indii-blue">Reset Password</h2>
        <div className="col-md-8 mx-auto mt-5 h-50 pt-5">
            {validationError && <div className="mb-3 text-center" >
                <span id={messageColour === "default" ? "text-indii-blue" : ""} className={messageColour === "fail" ? "text-red font-weight-bolder" : (messageColour === "pass" ? "text-green font-weight-bolder" : "")}>{validationError}</span>
            </div>}
            <br></br>
            <PasswordInput title={('New Password')} name={"new_password"} setValue={setNewPassword} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true} type="text"></PasswordInput>
            <br></br>
            <PasswordInput title={('Confirm Password')} name={"confirm_password"} setValue={setConfirmPassword} placeholder={""} CustomStyle={"col-md-8 mx-auto"} required={true} type="password" ></PasswordInput>
            <br></br>
            <div className="col-md-8 mx-auto">
                <CustomButton buttonName={'Save'} ActionFunction={() => sendRequest()} CustomStyle={"col-md-12 mx-auto"}></CustomButton>
            </div>
        </div>
    </>
    )
}
