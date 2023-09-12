import React, { useState, useEffect } from "react";
import TextInput from "./formFields/TextInput";
import CustomButton from "./CustomButton";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"
import FileUpload from "./FileUpload";
import "../../static/common.css";
// Register the plugin

export default function BankAccount({ edit, setEditStatus }) {

    const [bankAccountNumber, setBankAccountNumber] = useState("BE01 1234 4567 7812");
    const [updatedBankAccountNumber, setUpdatedBankAccountNumber] = useState("BE01 1234 4567 7812");
    const [files, setFiles] = useState([]);

    const removeFile = () => {
        setFiles([])
        setUpdatedBankAccountNumber(bankAccountNumber)
        setEditStatus(false)
    }

    return (
        <>
            <h2 className="col-md-10 p-0 mt-4 mb-3 ml-5" id="text-indii-blue">My bank account</h2>
            <div className="col-md-10 ml-4 d-flex justify-content-center m-5">
                <label className="col-md-3 mb-1 pr-0 text-secondary font-weight-bold h-25">Bank account number:</label>
                {edit && <TextInput CustomStyle={"col-md-9 mb-3 font-weight-bold pt-0"} name="bankAccountNumber" value={updatedBankAccountNumber} setValue={setUpdatedBankAccountNumber} />}
                {!edit && <p className="mb-0 col-md-9">{"BE01 1234 4567 7812"}</p>}
            </div>
            {edit && <div className="col-md-10 ml-4 m-5">
                <label className="col-md-3 mb-1 pr-0 font-weight-bold">upload photo:</label>
                <FileUpload
                    className="col-md-12"
                    files={files}
                    allowDrop={true}
                    allowBrowse={true}
                    allowMultiple={true}
                    allowRemove={true}
                    maxFiles={1}
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/png', 'image/jpeg']}
                    onupdatefiles={setFiles}
                />
            </div>}
            <div className='col-md-10  m-5'>
                <label className="col-md-3 mb-4 mb-1 pr-0 text-secondary font-weight-bold d-block">Photo of bank account:</label>
                <img className="photo-icon mx-2" src={files.length > 0 ? URL.createObjectURL(files[0].file) : EmployeeIcon}></img>
            </div>
            {edit && <div className="float-right col-md-12 text-right mt-3">
                <CustomButton buttonName={'Save'} ActionFunction={() => setEditStatus(false)}></CustomButton>
                <CustomButton buttonName={'Cancel'} ActionFunction={() => removeFile()}></CustomButton>
            </div>}
        </>
    );
}