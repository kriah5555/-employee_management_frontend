import React, { useEffect, useState } from "react";
import EmployeeTypeIcon from "../static/icons/EmployeeType.png";
import NotificationIcon from "../static/icons/notifications.png";
import { t } from "../translations/Translation";
import CustomTable from "../components/atoms/CustomTable";
import { GenderApiUrl, MaritalStatusApiUrl, MealVoucherApiUrl } from "../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../services/AxiosServices";
import { ToastContainer, toast } from 'react-toastify';
import ErrorPopup from "../utilities/popup/ErrorPopup";
import voucher from "../static/icons/ID.svg";
import SettingsOverview from "../components/organisms/SettingsOverview";
import Table from "../components/atoms/Table";

export default function Settings() {

    const subTabStyle = "col-md-3 my-3 mx-3 shadow text-center border-0";

    const [overviewContent, setOverviewContent] = useState('gender')
    const [title, setTitle] = useState(('Manage Genders'));
    const [type, setType] = useState("");

    const [errors, setErrors] = useState([]);
    const [reRender, setReRender] = useState(false)

    // to rerender page to set addrow to false when tabs change
    useEffect(() => {
        setReRender(true);
    }, [reRender])

    // settings page data
    const settingTabs = [
        { title: t('GENDER'), icon: EmployeeTypeIcon, styleClass: subTabStyle, url: '', type: 'gender' },
        { title: t('MARITAL_STATUS'), icon: EmployeeTypeIcon, styleClass: subTabStyle, url: '', type: 'marital_status' },
        { title: t('MEAL_VOUCHERS'), icon: voucher, styleClass: subTabStyle, url: '', type: 'meal_vouchers' },
    ]

    return (
        <div className="right-container p-3" >
            <div className="col-md-3 bg-white border-right">
                <h2 className="text-center my-4 text-color">Configurations</h2>
                <ul className="p-0 mt-2">
                    {
                        settingTabs.map((val) => {
                            return (
                                <li
                                    key={val.title}
                                    className="list-group-item border-bottom-only"
                                    id={overviewContent === val.type ? "text-indii-dark-blue" : ''}
                                    onClick={() => { setOverviewContent(val.type); setTitle('Manage ' + val.title); setType(val.type); setReRender(false) }}>
                                    <img className="shortcut-icon" src={val.icon}></img>
                                    {val.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="col-md-9 bg-white">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={('Validation error!')}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                {/* <p>Notification</p> */}
                {/* <div><ConfigurationOverviews overviewContent={overviewContent}></ConfigurationOverviews></div> */}
                {reRender && <SettingsOverview type={type} title={title} overviewContent={overviewContent} setErrors={setErrors} ></SettingsOverview>}
            </div>
        </div>
    )
}
