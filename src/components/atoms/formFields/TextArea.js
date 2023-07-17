import React from "react";

export default function TextArea({ title, name, required , CustomStyle, value, setValue}) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <label className="row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>
            <textarea className="form-control" name={name} rows={4} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}