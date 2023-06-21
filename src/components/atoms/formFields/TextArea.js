import React from "react";

export default function TextArea({ title, name, required }) {
    return (
        <div className="col font-weight-bold">
            <label className="row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>
            <textarea className="form-control" name={name} rows={4} />
        </div>
    )
}