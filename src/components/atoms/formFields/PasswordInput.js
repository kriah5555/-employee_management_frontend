import React, { useState } from "react";
// import RequiredIcon from "../../../static/icons/exclamation.png"
import RequiredIcon from "../../../static/icons/exclamation-mark1.png"
import { t } from "../../../translations/Translation";

export default function PasswordInput({ title, name, placeholder, required, CustomStyle, value, setValue, customError, styleMargin, type }) {
    const [error, setError] = useState(false);

    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <div className={"d-flex justify-content-between " + (error ? '' : styleMargin)} >
                <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {required && error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon} alt="Required"></img>
                    {t("REQUIRED")}
                </p>}
                {customError && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon} alt="Required"></img>
                    {customError}
                </p>}
            </div>
            <div className="input-group ">
                <input type={type} className="form-control" placeholder={placeholder} name={name} value={value} onChange={(e) => { setValue(e.target.value); }} /> {/* (e.target.value)==""?setError(true):setError(false) */}
            </div>
        </div>
    )
}
