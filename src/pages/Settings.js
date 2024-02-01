import React, { useEffect, useState } from "react";
import GenderIcon from "../static/icons/Gender.svg";
import MaritalStatusIcon from "../static/icons/MaritalStatus.svg";
import MealVoucherIcon from "../static/icons/MealVoucher.svg";
import CommuteTypeIcon from "../static/icons/commute.png";
import DimonaErrorCodeIcon from "../static/icons/DimonaErrorCode.svg";
import { t } from "../translations/Translation";
import { ToastContainer } from 'react-toastify';
import ErrorPopup from "../utilities/popup/ErrorPopup";
import SettingsOverview from "../components/organisms/SettingsOverview";

export default function Settings() {

    const subTabStyle = "col-md-3 my-3 mx-3 shadow text-center border-0";

    const [overviewContent, setOverviewContent] = useState('gender')
    const [title, setTitle] = useState(t("MANAGE_GENDERS"));
    const [type, setType] = useState("");

    const [errors, setErrors] = useState([]);
    const [reRender, setReRender] = useState(false)

    // to rerender page to set addrow to false when tabs change
    useEffect(() => {
        setReRender(true);
    }, [reRender])

    // settings page data
    const settingTabs = [
        { title: t('GENDER'), icon: GenderIcon, styleClass: subTabStyle, url: '', type: 'gender' },
        { title: t('MARITAL_STATUS'), icon: MaritalStatusIcon, styleClass: subTabStyle, url: '', type: 'marital_status' },
        { title: t('MEAL_VOUCHERS'), icon: MealVoucherIcon, styleClass: subTabStyle, url: '', type: 'meal_vouchers' },
        { title: t('COMMUTE_TYPES'), icon: CommuteTypeIcon, styleClass: subTabStyle, url: '', type: 'commute_types' },
        { title: t('DIMONA_ERROR_CODES'), icon: DimonaErrorCodeIcon, styleClass: subTabStyle, url: '', type: 'dimona_error_codes' },
    ]

    const handleTabClick = (val) => {
        setOverviewContent(val.type);
        setTitle('Manage ' + val.title)
        setType(val.type);
        setReRender(false);
    }

    return (
        <div className="right-container p-3" >
            <div className="col-md-3 bg-white border-right">
                <h2 className="text-center my-4 text-color">{t("SETTINGS")}</h2>
                <ul className="p-0 mt-2">
                    {
                        settingTabs.map((val) => {
                            return (
                                <li
                                    key={val.title}
                                    className="list-group-item border-bottom-only"
                                    id={overviewContent === val.type ? "text-indii-dark-blue" : ''}
                                    onClick={() => handleTabClick(val)}>
                                    <img className="shortcut-icon mr-3" src={val.icon}></img>
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
                    title={t("VALIDATION_ERROR") + ("!")}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                {reRender && <SettingsOverview type={type} title={title} overviewContent={overviewContent} setErrors={setErrors} ></SettingsOverview>}
            </div>
        </div>
    )
}
