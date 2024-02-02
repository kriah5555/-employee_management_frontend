import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Table from "../atoms/Table";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import CustomButton from "../atoms/CustomButton";
import { t } from "../../translations/Translation";
import Add from "../../static/icons/Add";
import { EmployeeHolidayCountsOverViewApiUrl, EmployeeHolidayCountsApiUrl } from "../../routes/ApiEndPoints";
import EditIcon from "../../static/icons/edit-dark.svg"
import TextInput from "../atoms/formFields/TextInput";
import TextArea from "../atoms/formFields/TextArea"
import ErrorPopup from "../../utilities/popup/ErrorPopup";

export default function CountersOverview({ type, eid }) {

    const params = useParams()
    const navigate = useNavigate()
    let countersType = type
    let employeeId = eid
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');

    const [headers, setHeaders] = useState([]);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState('');
    const [addTitle, setAddTitle] = useState('');
    const [addUrl, setAddUrl] = useState('');
    const [editStatus, setEditStatus] = useState(false);
    const [editData, setEditData] = useState([])
    const [formData, setFormData] = useState([]);
    const [errors, setErrors] = useState([]);

    const holiday_counter_headers = [
        { title: t('HOLIDAY_CODE') },
        { title: t('TOTAL_COUNT') },
        { title: t('USED_HOLIDAYS') },
        { title: t('REMAINING_HOLIDAYS') },
    ]

    const update_holiday_counter_headers = [
        { title: t('HOLIDAY_CODE') },
        { title: t('AVAILABLE_COUNT') },
        { title: t('EMPLOYEE_COUNT') },
        { title: t('REASON') },
    ]

    useEffect(() => {

        AXIOS.service(EmployeeHolidayCountsOverViewApiUrl + "/" + employeeId, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (countersType === "holiday") {
                        let data = [
                            { count: "4", holiday_code_name: "wqer", used_count: "7", available_count: "5" },
                            { count: "4", holsetDataRefreshliday_code_name: "wqer", used_count: "7", available_count: "5" },
                        ]
                        setListData(result.data?.employee_holiday_counts);
                        // setListData(data)

                    } else {

                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })



        AXIOS.service(EmployeeHolidayCountsApiUrl + "/" + employeeId + "/edit", 'GET')
            .then((result) => {
                if (result?.success) {
                    let data = [
                        { count: "4", holiday_code_name: "wqer", used_count: "7", available_count: "5" },
                        { count: "4", holiday_code_name: "wqer", used_count: "7", available_count: "5" },
                        { count: "4", holiday_code_name: "wqer", used_count: "7", available_count: "5" },
                        { count: "4", holiday_code_name: "wqer", used_count: "7", available_count: "5" },
                        { count: "4", holiday_code_name: "wqer", used_count: "7", available_count: "5" },
                    ]
                    setEditData(result.data?.employee_holiday_counts);
                    setFormData(result.data?.employee_holiday_counts);
                    // setEditData(data)
                    // setFormData(data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [dataRefresh, eid])

    const setValue = (index, value, name) => {
        let newData = [...formData]
        newData[index][name] = value
        setFormData(newData)
    }

    const onSave = () => {

        let data = {
            company_id: localStorage.getItem("company_id"),
            employee_id: employeeId,
            holiday_code_counts: formData
        }

        AXIOS.service(EmployeeHolidayCountsApiUrl, 'POST', data)
            .then((result) => {
                if (result?.success) {
                    setEditStatus(false)
                    setDataRefresh(!dataRefresh)
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
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="mb-2">
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
            <div className="mt-3 border bg-white d-flex flex-column">
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={t("VALIDATION_ERROR") + ("!")}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                <div className="tablescroll flex-1 d-flex flex-column">
                    <div className="flex-1">
                        {!editStatus && <><img className="float-right pr-5 pt-2 pointer" src={EditIcon} onClick={() => setEditStatus(true)} alt={t("EDIT")} title={t("EDIT")} /></>}
                        {!editStatus && <div className="mt-5">
                            <table className="mx-auto col-md-12">
                                <tr className="table-head-bg">
                                    {holiday_counter_headers.map((value, index) => {
                                        return (<th className={"px-3"} key={index}>{value.title}</th>)
                                    })}
                                </tr>
                                {listData.map((value, index) => {
                                    return (<tr className={""} key={index} >
                                        <td className="pb-2 pt-2 px-2">
                                            {value.holiday_code_name}
                                        </td>
                                        <td className="pb-2 px-2">
                                            {value.count}
                                        </td> <td className="pb-2 px-2">
                                            {value.used_count}
                                        </td>
                                        <td className="pb-2 px-2">
                                            {value.available_count}
                                        </td>
                                    </tr>)
                                })}
                            </table>
                        </div>}
                        {editStatus && <div className="">
                            <table className="mx-auto col-md-12 ">
                                <tr className="table-head-bg">
                                    {update_holiday_counter_headers.map((value, index) => {
                                        return (<th className={"px-3"} key={index} >{value.title}</th>)
                                    })}
                                </tr>
                                {editData.map((value, index) => {
                                    return (<tr className={"mb-4"} key={index} >
                                        <td className="pl-2 px-2">
                                            {value.holiday_code_name}
                                        </td>
                                        <td className="px-3">
                                            {value.holiday_code_count}
                                        </td> <td className="me-4">
                                            <TextInput name={"count"} value={value.count} setValue={(e) => { setValue(index, e, "count") }}></TextInput>
                                        </td>
                                        <td>
                                            <TextArea name={"reason"} value={value.reason} rows={1} setValue={(e) => { setValue(index, e, "reason") }}></TextArea>
                                        </td>
                                    </tr>)
                                })}
                            </table>
                            <div className=" mt-2 col-md-12 mb-2 text-right mb-2">
                                <CustomButton buttonName={t("CANCEL")} ActionFunction={() => { setEditStatus(false); setDataRefresh(!dataRefresh) }} CustomStyle=""></CustomButton>
                                <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}