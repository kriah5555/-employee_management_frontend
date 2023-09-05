import React, { useState, useRef, } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import EditIcon from "../../static/icons/edit-white.png"
import "../../static/common.css";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugin
registerPlugin(FilePondPluginFileValidateType);

export default function ProfileImage() {

    const [files, setFiles] = useState([]);
    const fileInput = useRef();

    return (
        <div className='photo-update-container m-4 mx-auto'>
            <img className="photo-icon rounded-circle mx-auto" src={files.length > 0 ? URL.createObjectURL(files[0].file) : EmployeeIcon}></img>
            <FilePond
                className="hide"
                files={files}
                allowReorder={true}
                allowDrop={false}
                allowMultiple={false}
                maxFiles={1}
                onupdatefiles={setFiles}
                labelIdle=''
                acceptedFileTypes={['image/png', 'image/jpeg']}
                ref={fileInput}
            />
            <img className="photo-update-icon" src={EditIcon} onClick={() => { fileInput.current.browse(); }}></img>
        </div>
    );

}