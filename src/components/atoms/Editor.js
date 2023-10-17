
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import RequiredIcon from "../../static/icons/exclamation-mark1.png";
import "../../static/common.css";

export default function Editor({ index, title, name, required, CustomStyle, value, setValue, error, styleMargin }) {
    const handleChange = (event, editor) => {
        const data = editor.getData();
        setValue(index, name, data);
    }
    return (
        <div className={CustomStyle}>
            <div className={"d-flex justify-content-between " + (error ? '' : styleMargin)} >
                <label className="row mx-0 my-auto font-weight-bold">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {error}
                </p>}
            </div>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => handleChange(event, editor)}
            />
        </div>
    );
}