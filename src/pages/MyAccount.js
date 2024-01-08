import React, { useState, useEffect } from "react";
import ProfileImage from "../components/atoms/ProfileImage";
import CustomButton from "../components/atoms/CustomButton";
import MenuContent from "../components/atoms/MenuContent";
import BackIcon from "../static/icons/BackIcon.png";
import { Navigate, useNavigate } from "react-router-dom";
import ResetPassword from "../components/molecules/ResetPassword";
import ProfileData from "../components/molecules/ProfileData";
import EditIcon from "../static/icons/edit-dark.svg";
import BankAccount from "../components/atoms/BankAccount";
import EnableNotification from "../components/atoms/EnableNotification";
import { APICALL as AXIOS } from "../services/AxiosServices";
import { LogoutApiUrl, EmployeeSignApiUrl, UserDetailsApiUrl } from "../routes/ApiEndPoints";
import { t } from '../translations/Translation';
import SignaturePad from '../components/atoms/SignaturePad'
import { toast } from 'react-toastify';

export default function MyAccount({ setAuth }) {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("Employee 01 super admin");
    const [editStatus, setEditStatus] = useState(false);
    const [myProfileURL, setMyProfileURL] = useState("");
    const [sign, setSign] = useState(false);
    const [signData, setSignData] = useState("");

    const MenuData = [
        { title: t("MY_PROFILE"), icon: '', url: myProfileURL },
        { title: t("MY_ADDRESS"), icon: '', url: '#address' },
        { title: t("CHANGE_PASSWORD"), icon: '', url: '#changePassword' },
        { title: t("MY_BANK_ACCOUNT"), icon: '', url: '#bankAccountDetails' },
        { title: t("NOTIFICATIONS"), icon: '', url: '#enableNotification' },
        { title: t("SIGNATURE_DETAILS"), icon: '', url: '#signatureDetails' },
    ];

    useEffect(() => {

        setEditStatus(false);
        if (window.location.hash === "#signatureDetails") {
            AXIOS.service(EmployeeSignApiUrl, "GET")
                .then((result) => {
                    if (result?.success) {
                        setSignData(result.data?.signature_data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else if (window.location.hash !== "") {
            setMyProfileURL("#myProfile")
        }
        setSign(false)

    }, [window.location.hash])

    const sendSignatureData = (signatureData) => {

        AXIOS.service(EmployeeSignApiUrl, "POST", { signature_data: signatureData })
            .then((result) => {
                if (result?.success) {
                    toast.success(result.message[0], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setSign(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // Function to call Logout Api call 
    const Logout = () => {
        AXIOS.service(LogoutApiUrl, 'GET')
            .then((result) => {
                if (result.success) {
                    localStorage.clear();
                    localStorage.setItem('auth', false)
                    setAuth(false);
                    navigate('/login');
                }
            })
    }


    return (
        <div className="right-container">
            <div className="col-md-3 mt-3 border bg-white text-center">
                <ProfileImage />
                <h4 className="text-center mx-auto mb-3 text-color" >{userName}</h4>
                <a href="/" className="text-decoration-none p-2 text-color"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate("/")} src={BackIcon}></img><u>{t("BACK_TO_DASHBOARD")}</u></a>
                <div className="m-5">
                    <MenuContent className="bg-primary" content={MenuData} type="myAccountMenu" />
                </div>
                <CustomButton buttonName={t("LOGOUT")} CustomStyle={"mx-auto"} ActionFunction={Logout} ></CustomButton>
            </div>
            <div className="col-md-8 mt-3 ml-4 border bg-white">
                {(window.location.hash !== "#changePassword" && window.location.hash !== "#enableNotification" && window.location.hash !== "#signatureDetails") && !editStatus && <img className="float-right  pt-2 mt-4 mr-3 pointer" src={EditIcon} onClick={() => setEditStatus(true)} alt={t("EDIT")} title={t("EDIT")}></img>}
                {(window.location.hash == "#myProfile" || window.location.hash == "") && <ProfileData title={t("MY_PROFILE")} edit={editStatus} setEditStatus={setEditStatus} />}
                {window.location.hash == "#address" && <ProfileData title={t("MY_ADDRESS")} edit={editStatus} setEditStatus={setEditStatus} type="address" />}
                {window.location.hash == "#changePassword" && <ResetPassword />}
                {window.location.hash == "#bankAccountDetails" && <BankAccount edit={editStatus} setEditStatus={setEditStatus} />}
                {window.location.hash == "#enableNotification" && <EnableNotification edit={editStatus} setEditStatus={setEditStatus} />}
                {window.location.hash == "#signatureDetails" && <div className="mt-3"><SignaturePad sendSignatureData={sendSignatureData} signData={signData} sign={sign} setSign={setSign} /></div>}
            </div>
        </div>
    );
}