import React from "react";
import { useLocation } from "react-router-dom";
import { t } from "../../translations/Translation";
import "../../static/common.css";

//allows toggle if clicked on label aso
export default function Switch({ label, id, checked, lableClick, defaultChecked, onChange, onInput, styleClass, required }) {

    return (
        <>
            {lableClick && <div className={styleClass}>
                <div className="custom-control custom-switch custom-switch-lg py-2">
                    <input type="checkbox" className="custom-control-input" defaultChecked={defaultChecked} id={id} onChange={onChange} onInput={onInput} checked={checked}></input>
                    <label className="custom-control-label font-weight-bold" htmlFor={id}><p className="filter-title mb-0">{label}</p></label>
                </div>
            </div>}
            {!lableClick && < div className={styleClass}>
                <label className="col-md-3 pl-0 font-weight-bold row mx-0 my-auto justify-content-lg-start align-content-center ">{label}{required && <p className="text-danger my-auto">&nbsp;*</p>}</label>
                <div className="col-md-1 d-flex justify-content-lg-start align-content-center">
                    <div className="custom-control custom-switch custom-switch-lg">
                        <input type="checkbox" class="custom-control-input" id={id} defaultChecked={defaultChecked} checked={checked} onChange={onChange} onInput={onInput}></input>
                        <label className="custom-control-label" htmlFor={id}></label>
                    </div>
                </div>
            </div>}
        </>
    );
}