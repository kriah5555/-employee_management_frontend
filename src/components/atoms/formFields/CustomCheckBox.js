import React from "react";

export default function CustomCheckBox({ title, checkboxList, required, changeCheckbox, CustomStyle, SecondaryCustomStyle, checked }) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <label className="row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>

            {checkboxList.map((val, index) => {
                return (
                    <div key={val.key} className={"custom-control custom-checkbox mt-2" + val.customStyle}>
                        <input type="checkbox" className="custom-control-input" id={val.key} name={val.key} checked={checked ? checked : val.checked} onChange={() => changeCheckbox(val.key)} />
                        <label className="custom-control-label font-weight-normal" htmlFor={val.key}>{val.name} </label>
                    </div>
                )
            })}

        </div>
    )
}