import React from "react";
import { useLocation } from "react-router-dom";
import { t } from "../../translations/Translation";
import "../../static/common.css";
//allows toggle if clicked on label aso
export default function Switch({ label, id, checked, lableClick, defaultChecked, onChange, onInput, margin }) {

    return (
        <>
            {lableClick && <div className={"pt-2 pb-3 col-md-11 px-0" + margin}>
                <div className="custom-control custom-switch custom-switch-lg">
                    <input type="checkbox" className="custom-control-input" defaultChecked={checked} id={id} onChange={onChange} onInput={onInput}></input>
                    <label className="custom-control-label font-weight-bold" htmlFor={id}><p className="filter-title mb-0">{label}</p></label>
                </div>
            </div>}
            {!lableClick && < div className={"d-flex " + margin}>
                <h5 className="col-md-6 d-flex justify-content-lg-start align-content-center ">{label}:</h5>
                <div className="col-md-6 d-flex justify-content-lg-start align-content-center">
                    <div class="custom-control custom-switch custom-switch-lg">
                        <input type="checkbox" class="custom-control-input" id={id} defaultChecked={defaultChecked} onChange={onChange} onInput={onInput}></input>
                        <label class="custom-control-label" for={id}></label>
                    </div>
                </div>
            </div>}
        </>
    );
}