import React from "react";
import RequiredIcon from "../../../static/icons/exclamation-mark1.png";
import { t } from "../../../translations/Translation";

export default function TextArea({ title, name, required, CustomStyle, value, setValue, error }) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <div className="d-flex justify-content-between">
                <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {t("REQUIRED")}
                </p>}
            </div>
            <textarea className="form-control" name={name} rows={4} value={value == null ? '' : value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}