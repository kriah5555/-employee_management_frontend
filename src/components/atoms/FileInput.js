import React, { useState } from "react";
import RequiredIcon from "../../static/icons/exclamation-mark1.png"

export default function FileInput({ title, CustomStyle, index, name, value, setValue, error, required, styleMargin }) {

  const [selectedFile, setSelectedFile] = useState(value)
  const handleFileInput = (e) => {
    let file = e.target.files[0]
    setValue(index, name, file);
    if (file) {
      const selectedFileName = e.target.files[0].name;
      const fileNameLabel = document.getElementById("file-name-label");
      fileNameLabel.textContent = selectedFileName;
    }
  };

  return (
    <div className={" font-weight-bold " + CustomStyle}>
      <div className={"d-flex justify-content-between " + (error ? '' : styleMargin)} >
        <label className="row mx-0 my-auto ">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
        {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
          <img className="box mr-1 mb-1" src={RequiredIcon}></img>
          {error}
        </p>}
      </div>
      <div className="col-md-12 file-input-container ">
        <span id="file-name-label" className="">Choose a file</span>
        <input name={name} type="file" className="file-input" onChange={handleFileInput} value={value} />
      </div>
    </div>)

};