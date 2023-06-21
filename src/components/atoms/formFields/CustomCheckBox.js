import React from "react";

export default function CustomCheckBox({ title, checkboxList, required, changeCheckbox }) {
    return (
        <div className="col font-weight-bold">
            <label className="row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>

            {checkboxList.map((val, index) => {
                return (
                    <div key={val.key} className={"custom-control custom-checkbox mt-2"}>
                        <input type="checkbox" className="custom-control-input" id={val.key} name={val.key} checked={val.checked} onChange={() => changeCheckbox(val.key)} />
                        <label className="custom-control-label font-weight-normal" for={val.key}>{val.name} </label>
                    </div>
                )
            })}

        </div>
    )
}