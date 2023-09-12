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
import { LogoutApiUrl } from "../routes/ApiEndPoints";

export default function MyAccount({ setAuth }) {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("Employee 01 super admin");
    const [editStatus, setEditStatus] = useState(false);
    const [myProfileURL, setMyProfileURL] = useState("");

    const MenuData = [
        { title: 'My profile', icon: '', url: myProfileURL },
        { title: 'My address', icon: '', url: '#address' },
        { title: 'Change password', icon: '', url: '#changePassword' },
        { title: 'My bank account', icon: '', url: '#bankAccountDetails' },
        { title: 'Notifications', icon: '', url: '#enableNotification' },
    ];

    useEffect(() => {
        setEditStatus(false);
        if (window.location.hash !== "") {
            setMyProfileURL("#myProfile")
        }
    }, [window.location.hash])

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
                <a href="/" className="text-decoration-none p-2 text-color"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate("/")} src={BackIcon}></img><u>{'Back to Dashboard'}</u></a>
                <div className="m-5">
                    <MenuContent className="bg-primary" content={MenuData} type="myAccountMenu" />
                </div>
                <CustomButton buttonName={'Logout'} CustomStyle={"mx-auto"} ActionFunction={Logout} ></CustomButton>
            </div>
            <div className="col-md-8 mt-3 ml-4 border bg-white">
                {(window.location.hash !== "#changePassword" && window.location.hash !== "#enableNotification") && !editStatus && <img className="float-right  pt-2 mt-4 mr-3" src={EditIcon} onClick={() => setEditStatus(true)}></img>}
                {(window.location.hash == "#myProfile" || window.location.hash == "") && <ProfileData title="My Profile" edit={editStatus} setEditStatus={setEditStatus} />}
                {window.location.hash == "#address" && <ProfileData title="My Address" edit={editStatus} setEditStatus={setEditStatus} type="address" />}
                {window.location.hash == "#changePassword" && <ResetPassword />}
                {window.location.hash == "#bankAccountDetails" && <BankAccount edit={editStatus} setEditStatus={setEditStatus} />}
                {window.location.hash == "#enableNotification" && <EnableNotification edit={editStatus} setEditStatus={setEditStatus} />}
            </div>
        </div>
    );
}