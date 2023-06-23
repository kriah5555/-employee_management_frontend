import React from "react";

export default function TextInput({title, name, placeholder, required, CustomStyle}) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <label className="row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>
            <input type="text" className="form-control" placeholder={placeholder} name={name} />
        </div>
    )
}
