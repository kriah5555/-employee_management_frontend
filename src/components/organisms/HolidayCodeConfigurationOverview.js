import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { useNavigate, useParams } from "react-router-dom";
import { HolidayCodeApiUrl, CompanyApiUrl, HolidayCodeConfigurationApiUrl, PublicHolidayCodeApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import FormsNew from "../molecules/FormsNew";
import CustomButton from "../atoms/CustomButton";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import { t } from "../../translations/Translation";
import Add from "../../static/icons/Add";
export default function HolidayCodeConfigurationOverview() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');
    const [companyList, setCompanyList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [temp, setTemp] = useState([]);

    // Header data for Holiday code
    const holiday_code_headers = [
        {
            title: t("TITLE_TEXT"),
            field: 'holiday_code_name',
            size: 200,
        },
        {
            title: t("DESCRIPTION"),
            field: 'description',
            size: 200,
        },
        {
            title: t("INETRNAL_CODE"),
            field: 'internal_code',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        },
    ]


    const holiday_code_configuration_header = [
        {
            title: t("HOLIDAY_CODE"),
            field: 'holiday_code_name',
            size: 200,
        },
        {
            title: t("COMPANY_TEXT"),
            field: 'checkbox',
            size: 200,
        },
    ]

    const public_holiday_header = [

        {
            title: t("HOLIDAY_NAME"),
            field: 'name',
            size: 200,
        },
        {
            title: t("DATE"),
            field: 'date',
            size: 200,
        },

    ]

    const [company, setCompany] = useState({
        "company_id": "",
        "holiday_code_ids": []
    })


    const [headers, setHeaders] = useState(holiday_code_headers);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState('Manage holiday code');
    const [addTitle, setAddTitle] = useState('Add holiday code');
    const [addUrl, setAddUrl] = useState('/add-holiday-code');

    useEffect(() => {
        let apiUrl;
        // Header data for Function overview
        if (overviewContent === 'holiday_code') {
            apiUrl = HolidayCodeApiUrl
            setHeaders(holiday_code_headers); setTitle(t("MANAGE_HOLIDAY_CODE")); setAddTitle(t("ADD_HOLIDAY_CODE")); setAddUrl('/add-holiday-code');
        } else if (overviewContent === 'holiday_code_configuration') {
            apiUrl = CompanyApiUrl
            setHeaders(holiday_code_configuration_header); setTitle(t("MANAGE_HOLIDAY_CODE_CONFIGURATION")); setAddTitle(''); setAddUrl('/add-holiday-code');
        } else if (overviewContent === 'public_holiday_configuration') {
            apiUrl = PublicHolidayCodeApiUrl
            setHeaders(public_holiday_header); setTitle(t("MANAGE_PUBLIC_HOLIDAY")); setAddTitle(t("ADD_PUBLIC_HOLIDAY")); setAddUrl('/add-public-holiday');
        }

        // Api call to get list data
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === "holiday_code_configuration") {
                        setCompanyList(getFormattedDropdownOptions(result.data?.active, "id", "company_name"))
                    } else {
                        setListData(result.data);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [overviewContent, dataRefresh])


    // Api call to delete item from table
    const DeleteApiCall = () => {
        // APICall for create and updation of employee types
        AXIOS.service(deleteUrl, 'DELETE')
            .then((result) => {
                if (result?.success) {
                    setDataRefresh(!dataRefresh);
                    setWarningMessage('')
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
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function for onclick of actions in the overview tables
    const viewAction = (data, action) => {
        if (action === 'delete') {
            setWarningMessage(t("DELETE_CONFIRMATION_COMPANY") + ("?"))
        }
        if (overviewContent === 'holiday_code') {
            if (action === 'edit') {
                navigate('/add-holiday-code/' + data.id)
            } else {
                setDeleteUrl(HolidayCodeApiUrl + '/' + data.id)
            }

        } else if (overviewContent === 'public_holiday_configuration') {
            if (action === 'edit') {
                navigate('/add-public-holiday/' + data.id)
            } else {
                setDeleteUrl(PublicHolidayCodeApiUrl + '/' + data.id)
            }
        }
    }
    // function to call linked holiday codes of selected company
    const getCompanyHolidayCodeData = () => {
        AXIOS.service(HolidayCodeConfigurationApiUrl + "/" + selectedCompany.value, 'GET')
            .then((result) => {
                if (result?.success) {
                    //here temp act as previous state to compare status on when check box changed, its used in handle checkbox
                    setTemp(result.data);
                    let arr = []
                    result.data.map((val, index) => {
                        arr.push({ "holiday_code_name": val.holiday_code_name, "holiday_code_id": val.holiday_code_id, "id": index, "checkbox": <CustomCheckBox key={index} checkboxList={[{ key: val.holiday_code_id, value: val.holiday_code_id }]} changeCheckbox={handleCheckBox} checked={val.status === true ? true : false}></CustomCheckBox> })
                    });
                    setListData(arr);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCheckBox = (id) => {
        setTemp((prevTemp) => {
            let arr = [];
            prevTemp.forEach((value) => {
                if (value.holiday_code_id === id) {
                    let data = { ...value, status: !value.status };
                    arr.push(data);
                } else {
                    arr.push(value);
                }
            });

            // Rest of your code to update the listData and setCompany...
            let formattedArray = []
            arr.map((val, index) => {
                formattedArray.push({ "holiday_code_name": val.holiday_code_name, "holiday_code_id": val.holiday_code_id, "id": index, "checkbox": <CustomCheckBox key={index} checkboxList={[{ key: val.holiday_code_id, value: val.holiday_code_id }]} changeCheckbox={handleCheckBox} checked={val.status === true ? true : false}></CustomCheckBox> })
            })
            setListData(formattedArray);
            //setting holiday code ids array for payload
            let arr1 = []
            arr.map((val) => {

                if (val.status === true) {
                    arr1.push(val.holiday_code_id)
                }
            })
            setCompany((prev) => ({
                ...prev, ["holiday_code_ids"]: arr1
            }))
            return arr;
        });
    };


    const setValues = (index, name, value, field) => {
        setCompany((prev) => ({ ...prev, ["company_id"]: value.value }))
        setSelectedCompany(value)
    }

    const onSave = () => {
        let url = HolidayCodeConfigurationApiUrl + "/" + selectedCompany.value
        AXIOS.service(url, "PUT", company)
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
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //
    const companyDropdownFields = [
        { title: t("SELECT_COMPANY"), name: "company_id", placeholder: t("SELECT"), required: true, type: "dropdown", options: companyList, selectedOptions: selectedCompany, style: "col-md-12 float-left" },
    ]

    return (
        <div className="right-container">
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
            {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {/* All configurations */}
            <div className="company-tab-width mt-3 border bg-white d-flex flex-column">
                <div className={"d-flex px-3 justify-content-between py-2 border-thick align-items-center"}>
                    <h4 className="text-color mb-0 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate("/configurations")} src={BackIcon} alt="Back"></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer d-flex align-items-center add_btn" onClick={() => navigate(addUrl)}>
                            <Add />
                            <span>{addTitle}</span>
                        </p>}
                    </div>
                </div>
                <div className="tablescroll flex-1 d-flex flex-column">
                    {overviewContent === "holiday_code_configuration" && <div className="">
                        <div className="mb-2 d-flex border-top pt-1 container-fluid pt-3">
                            <div className="col-md-6">
                                <FormsNew
                                    view="filters"
                                    formTitle={''}
                                    formattedData={company}
                                    data={companyDropdownFields}
                                    SetValues={setValues}
                                ></FormsNew>
                            </div>
                            <div className="col-md-3 mt-3">
                                <CustomButton buttonName={t("SELECT_COMPANY")} ActionFunction={() => getCompanyHolidayCodeData()} CustomStyle="my-4 mr-2"></CustomButton>
                            </div>
                        </div>
                    </div>}
                    <div className="flex-1">
                        <Table columns={headers} rows={listData} setRows={setListData} tableName={overviewContent === "holiday_code_configuration" ? "tokens" : 'function'} viewAction={viewAction} height={overviewContent === "holiday_code_configuration" ? '100%' : '100%'} ></Table>
                    </div>
                    {overviewContent === "holiday_code_configuration" && <div className={" mb-3 text-right pr-3 mt-2"}>
                        <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                        <CustomButton buttonName={t("BACK_LINK")} ActionFunction={() => navigate("/configurations")} CustomStyle="mr-3"></CustomButton>
                    </div>}
                </div>
            </div>
        </div>
    )
}
