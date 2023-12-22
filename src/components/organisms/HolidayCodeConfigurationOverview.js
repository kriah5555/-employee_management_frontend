import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import { useNavigate, useParams } from "react-router-dom";
import { HolidayCodeApiUrl, CompanyApiUrl, HolidayCodeConfigurationApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import ManageSalaries from "../molecules/ManageSalaries";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import FormsNew from "../molecules/FormsNew";
import CustomButton from "../atoms/CustomButton";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
export default function HolidayCodeConfigurationOverview() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');
    const [companyList, setCompanyList] = useState([])
    const [selectedCompany, setSelectedCompany] = useState("")

    // Header data for Holiday code
    const holiday_code_headers = [
        {
            title: 'title',
            field: 'holiday_code_name',
            size: 200,
        },
        {
            title: 'Description',
            field: 'description',
            size: 200,
        },
        {
            title: 'Internal Code',
            field: 'internal_code',
            size: 200,
        },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ]


    const holiday_code_configuration_header = [
        {
            title: 'Holiday code',
            field: 'holiday_code_name',
            size: 200,
        },
        {
            title: 'company',
            field: 'checkbox',
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
            setHeaders(holiday_code_headers); setTitle('Manage holiday code'); setAddTitle('Add holiday code'); setAddUrl('/add-holiday-code');
        } else if (overviewContent === 'holiday_code_configuration') {
            apiUrl = CompanyApiUrl
            setHeaders(holiday_code_configuration_header); setTitle('Manage holiday code configuration'); setAddTitle(''); setAddUrl('/add-holiday-code');
        }

        // Api call to get list data
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === "holiday_code_configuration") {
                        setCompanyList(getFormattedDropdownOptions(result.data, "id", "company_name"))
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
            setWarningMessage('Are you sure you want to delete this item?')
        }
        if (overviewContent === 'holiday_code') {
            if (action === 'edit') {
                navigate('/add-holiday-code/' + data.id)
            } else {
                setDeleteUrl(HolidayCodeApiUrl + '/' + data.id)
            }

        }
    }

    const handleCheckBox = (id) => {

        let arr = { ...company }
        arr.holiday_code_ids.map((val, index) => {

            if (val !== id) {
                arr.holiday_code_ids.push(val)
            } else {
                arr.holiday_code_ids = arr.holiday_code_ids.filter((item) => {
                    if (id !== item) {
                        return item
                    }
                })
            }

        })

        setCompany((prev) => ({
            ...prev, ["holiday_code_ids"]: arr
        }))

        // listData.map((val, index)=>{
        //     if(val.checked)
        // })

        console.log(arr);
    }

    const getCompanyHolidayCodeData = () => {

        AXIOS.service(HolidayCodeConfigurationApiUrl + "/" + selectedCompany.value, 'GET')
            .then((result) => {
                if (result?.success) {

                    console.log(result.data);
                    let arr = []
                    result.data.map((val, index) => {
                        arr.push({ "holiday_code_name": val.holiday_code_name, "holiday_code_id": val.holiday_code_id, "id": index, "checkbox": <CustomCheckBox checkboxList={[{ key: val.holiday_code_id, value: val.holiday_code_id }]} changeCheckbox={handleCheckBox} checked={val.status == true ? true : false}></CustomCheckBox> })
                    })
                    setListData(arr);

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const setValues = (index, name, value, field) => {
        setCompany((prev) => ({ ...prev, ["company_id"]: value.value }))
        setSelectedCompany(value)
    }

    const onSave = () => {

    }




    const filterDataFields = [
        { title: "Select company", name: "company_id", placeholder: "Select..", required: true, type: "dropdown", options: companyList, selectedOptions: selectedCompany, style: "col-md-12 float-left" },
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
                title={('WARNING')}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {/* All configurations */}
            <div className="company-tab-width mt-3 border bg-white">
                <div className={"d-flex col-md-12 justify-content-between py-3 border-thick"}>
                    <h4 className="text-color mb-0"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate("/configurations")} src={BackIcon}></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer" onClick={() => navigate(addUrl)}>
                            <img src={AddIcon} className="header-icon mr-1"></img>{addTitle}
                        </p>}
                    </div>
                </div>
                <div className="tablescroll">
                    {overviewContent === "holiday_code_configuration" && <div className="col-md-12">
                        <div className="mb-2 d-flex border-top pt-1 container-fluid pt-3">
                            <div className="col-md-6">
                                <FormsNew
                                    view="filters"
                                    formTitle={''}
                                    formattedData={company}
                                    data={filterDataFields}
                                    SetValues={setValues}
                                ></FormsNew>
                            </div>
                            <div className="col-md-3 mt-3">
                                <CustomButton buttonName={"Select company"} ActionFunction={() => getCompanyHolidayCodeData()} CustomStyle="my-4 mr-2"></CustomButton>
                            </div>
                        </div>
                    </div>}
                    <Table columns={headers} rows={listData} setRows={setListData} tableName={overviewContent == "holiday_code_configuration" ? "tokens" : 'function'} viewAction={"viewAction"} height={overviewContent == "holiday_code_configuration" ? 'calc(100vh - 362px)' : 'calc(100vh - 162px)'} ></Table>
                    {overviewContent === "holiday_code_configuration" && <div className={"col-md-12 mb-3 text-right pr-5 mt-2"}>
                        <CustomButton buttonName={'Save'} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate("/configurations")} CustomStyle="mr-3"></CustomButton>
                    </div>}
                </div>
            </div>
        </div>
    )
}
