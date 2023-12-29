import React, { useState, useRef, } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import EditIcon from "../../static/icons/edit-white.png"
import "../../static/common.css";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import RequiredIcon from "../../static/icons/exclamation-mark1.png";
import { t } from '../../translations/Translation';
// Register the plugin
registerPlugin(FilePondPluginFileValidateType);

export default function FileUpload({ title, className, CustomStyle, files, onupdatefiles, labelIdle, disabled, acceptedFileTypes, allowBrowse, allowDrop, allowMultiple, allowRemove, maxFiles, error, required, styleMargin }) {

    return (
        <div className={"font-weight-bold " + CustomStyle}>
            <div className={"d-flex justify-content-between " + (error ? '' : styleMargin)} >
                <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {error}
                </p>}
            </div>
            <div className="">
                <FilePond
                    className={className}
                    files={files}
                    allowDrop={allowDrop}
                    allowBrowse={allowBrowse}
                    allowMultiple={allowMultiple}
                    allowRemove={allowRemove}
                    maxFiles={maxFiles}
                    allowFileTypeValidation={true}
                    acceptedFileTypes={acceptedFileTypes}//shoulbe array ex: ['image/png', 'image/jpeg']
                    onupdatefiles={onupdatefiles}
                    // labelIdle={labelIdle ? labelIdle : `${t("DRAG") + ("") + t("DROP_YOUR_FILES")}  
                    // or <span class="filepond--label-action" id="text-indii-blue"> {`${t("BROWSE")}`} </span>`}
                    labelIdle={labelIdle ? labelIdle : `${t("DRAG")} ${("&")} ${t("DROP_YOUR_FILES")} ${t("OR")} <span class="filepond--label-action" id="text-indii-blue">${t("BROWSE")}</span>`}



            credits={false}
            disabled={disabled}
                />
        </div>
         </div >

    );

}