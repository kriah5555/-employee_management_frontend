import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { ToastContainer } from 'react-toastify';
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { toast } from 'react-toastify';
import { t } from "../../translations/Translation";
import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "../../static/icons/BackIcon.png"
import Popup from "../../utilities/popup/Popup"
import FileInput from "../atoms/FileInput";
import { GetImportedEmployeesApiUrl, UploadEmployeeFileApiUrl } from "../../routes/ApiEndPoints";

export default function ImportStatusOverView() {

    const navigate = useNavigate();
    const params = useParams();
    const [openPopup, setOpenPopup] = useState(false)
    const [formData, setFormData] = useState({ "file": "" })
    const [message, setMessage] = useState("")
    const [dataRefresh, setDataRefresh] = useState(false);

    //dummy data
    const [listData, setListData] = useState([]);

    //function to validate file type
    const validateFileType = (file) => {
        const acceptableFileTypes = [
            'application/vnd.ms-excel', // For .xls files
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // For .xlsx files
        ]
        if (file) {
            return acceptableFileTypes.includes(file.type) ? true : false
        }
        return false
    }


    const setValues = (index, name, value, field) => {
        const newData = { ...formData };
        newData[name] = value
        if (validateFileType(value)) {
            setFormData(newData)
        }
    }


    // Header data for import overview
    const importOverviewHeaders = [
        {
            title: "File",
            field: 'file_url',
            render: rows => <a href={rows.file_url} download={true}>{rows.file_url}</a>,
            sorting: false  // onclick file should download
        },
        {
            title: "IMPORTED_DATE",
            field: 'imported_date',
            sorting: true
        },
        {
            title: "STATUS",
            field: 'import_status',
            sorting: false
        },
        {
            title: "RESULT",
            field: 'feedback_file_url',
            render: rows => <a href={rows.feedback_file_url} download={true}>{rows.feedback_file_url}</a>,
            sorting: false // onclick file should download
        },
    ];



    useEffect(() => {

        AXIOS.service(GetImportedEmployeesApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setListData(result.data)
                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [dataRefresh])


    const onConfirm = () => {
        const fileData = new FormData();
        fileData.append("file", formData['file'])

        AXIOS.service(UploadEmployeeFileApiUrl, 'POST', fileData, true)
            .then((result) => {
                if (result?.success) {
                    toast.success(result.message[0], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setDataRefresh(!dataRefresh);
                    onHide();
                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onHide = () => {
        setOpenPopup(false)
        setFormData((prev) => (
            { ...prev, "file": "" }
        ))
        setMessage("")
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {/* {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>} */}
            <div className="right-container">
                {openPopup && <Popup title={t("IMPORT_EMPLOYEES")} onConfirm={onConfirm} size={"lg"} onHide={onHide} startplanButton={"Upload"} body={
                    <div className="company-tab-width">
                        <a className="mr-3 d-flex justify-content-end" href="/images/myw3schoolsimage.jpg" download>Download sample file</a>
                        <FileInput
                            key={"File"}
                            name={'file'}
                            setValue={setValues}
                            CustomStyle={"col-12 ml-0 mt-3"}
                            value={formData !== undefined ? formData['file'] : {}}
                            accept={".xls,.xlsx"}
                        ></FileInput>
                        {message && <p className="d-flex justify-content-center">{message}</p>}
                    </div>
                } />}
                <div className="company-tab-width mt-3 border bg-white">
                    <div className="col-md-12 row mt-3 mx-0 px-0 ">
                        <div className="col-md-6 float-left">
                            <h4 className="d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate('/manage-employees')} src={BackIcon}></img>{t("IMPORT_EMPLOYEES")}</h4>
                        </div>
                        <div className="col-md-6 float-right">
                            <ul className="float-right">
                                <li className="list-group d-inline add_btn" onClick={() => setOpenPopup(true)}>
                                    <span className="">{t("IMPORT_EMPLOYEES")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Table columns={importOverviewHeaders} rows={listData} tableName="import_overview" setRows={setListData}></Table>
                </div>
            </div>

        </>
    )
}
