import React from "react";

export default function DateInput({ title, name, required, CustomStyle, value, setValue, disabled }) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <div className="" >
                <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                <input type="date" className="form-control" name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled} />
            </div>
        </div>
    )
}
