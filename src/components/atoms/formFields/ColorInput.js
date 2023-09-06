import React from "react";
// import RequiredIcon from "../../../static/icons/exclamation.png"
import RequiredIcon from "../../../static/icons/exclamation-mark1.png"


export default function ColorInput({ title, name, placeholder, required, CustomStyle, value, setValue, error, styleMargin, disabled }) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <div className={"col-md-3 pl-0 d-flex justify-content-between " + (error ? '' : styleMargin)} >
                <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {error}
                </p>}
            </div>
            <div className="col-md-1">
                <input type="color" className="border-0 bg-transparent shortcut-icon" placeholder={placeholder} name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled} />
            </div>
        </div>
    )
}
