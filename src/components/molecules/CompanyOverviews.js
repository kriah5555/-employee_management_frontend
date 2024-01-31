import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { CompanyApiUrl, LocationApiUrl, WorkstationApiUrl, WorkstationListApiUrl, CostCenterApiUrl, CompanyContractTemplateApiUrl, ResponsiblePersonApiUrl, EmployeeTypeDimonaConfigurationApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import { t } from "../../translations/Translation";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import CustomButton from "../atoms/CustomButton";

export default function CompanyOverviews({ overviewContent, setCompanySelected, setCompany, isArchived, showAllCompanies }) {

    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');
    const [temp, setTemp] = useState([])
    const [dimonaConfigurationData, setDimonaConfigurationData] = useState({
        "employee_type_ids": []
    })

    // Header data for company overview
    const Company_headers = [
        {
            title: t("COMPANY"),
            field: 'company_name',
            size: 200,
        },
        {
            title: t("EMAIL_ADDRESS"),
            field: 'email',
            size: 200,
        },
        {
            title: t("PHONE_NUMBER"),
            field: 'phone',
            size: 200,
        },
    ];

    // Header data for location overview
    const Location_headers = [
        {
            title: t("LOCATION_TITLE"),
            field: "location",
            size: 200,
        },
        {
            title: t("ADDRESS_TITLE"),
            field: "address",
            size: 300,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        },
    ];

    // Header data for workstation overview
    const Workstation_headers = [
        {
            title: t("WORK_STATION"),
            field: 'workstation_name',
            size: 200, dimonaConfigurationData
        },
        {
            title: t("SEQUENCE_NUMBER"),
            field: 'sequence_number',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 250,
        }
    ];

    const Resp_person_headers = [
        {
            title: t("NAME_TEXT"),
            field: 'full_name',
            size: 200,
        },
        {
            title: t("SSN"),
            field: 'social_security_number',
            size: 200,
        },
        {
            title: t("ROLE"),
            field: 'role',
            size: 250,
        }

    ]

    //cost center headers
    const cost_center_headers = [
        {
            title: t("TITLE_TEXT"),
            field: 'name',
            size: 200,
        },
        {
            title: t("LOCATION_TITLE"),
            field: 'location.location_name',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        },
    ];

    //contract headers
    const contracts_template_headers = [
        {
            title: t("EMPLOYEE_TYPE"),
            field: 'employee_type.name',
            size: '200',
        },
    ]

    useEffect(() => {
        let ApiUrl;
        if (overviewContent === 'company') {
            setHeaders(Company_headers);
            ApiUrl = CompanyApiUrl
        } else if (overviewContent === 'location') {
            setHeaders(Location_headers);
            ApiUrl = LocationApiUrl
        } else if (overviewContent === 'workstation') {
            setHeaders(Workstation_headers);
            ApiUrl = WorkstationApiUrl
        } else if (overviewContent === 'responsible_person') {
            setHeaders(Resp_person_headers)
            ApiUrl = ResponsiblePersonApiUrl
        } else if (overviewContent === 'cost center') {
            setHeaders(cost_center_headers)
            ApiUrl = CostCenterApiUrl
        } else if (overviewContent === 'contracts') {
            setHeaders(contracts_template_headers)
            ApiUrl = CompanyContractTemplateApiUrl
        } else if (overviewContent === 'dimona') {
            ApiUrl = EmployeeTypeDimonaConfigurationApiUrl + "/" + localStorage.getItem("company_id")
        }
        AXIOS.service(ApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === 'company' || overviewContent === 'workstation' || overviewContent === 'cost center' || overviewContent === 'responsible_person') {

                        if (overviewContent === 'responsible_person') {
                            let arr = []
                            result.data.map((val) => {
                                let obj = { ...val, "fullname": val.full_name }
                                arr.push(obj)
                            })
                            setListData(arr)
                        } else if (overviewContent === 'company') {
                            let active_companies = result.data?.active
                            if (result.data?.active.length > 1) {
                                result.data?.active?.map((comp, i) => {
                                    if (!showAllCompanies && comp.id === parseInt(localStorage.getItem('company_id'))) {
                                        active_companies = [comp]
                                    }
                                })
                            }
                            setListData(isArchived ? result.data?.archived : showAllCompanies ? result.data?.active : active_companies)
                        } else {
                            setListData(result.data)
                        }
                    } else if (overviewContent === 'location') {
                        let arr = []
                        result.data.map((resp, index) => {
                            let obj = {
                                id: resp.id,
                                location: resp.location_name,
                                address: resp.address.street_house_no,
                                status: resp.status,
                            }
                            arr.push(obj)
                        })
                        setListData(arr)
                    } else if (overviewContent === 'contracts') {
                        let data = result.data
                        //filtering data for given company and also for null
                        const filteredData = data.filter(item => item.company_id == null || item.company_id == 1);
                        filteredData.forEach(element => {
                            if (element.language) {
                                element.language = element.language.toUpperCase();
                            }
                        });

                        setListData(filteredData)
                    } else if (overviewContent == 'dimona') {

                        let data = result.data
                        setTemp(data)
                        setListData(data)


                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [overviewContent, dataRefresh, isArchived, showAllCompanies])

    // Api call to delete item from table
    const DeleteApiCall = () => {

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
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const viewAction = (data, action) => {
        if (action === 'delete') {
            setWarningMessage(t("DELETE_CONFIRMATION_COMPANY") + ("?"))
        }
        if (overviewContent === 'company') {
            if (action === 'edit') {
                navigate('/manage-companies/company-single/' + data.id)
            } else if (action === 'view') {
                navigate('/manage-companies/company-view/' + data.id)
            } else if (action === 'details') {
                setCompanySelected(true);
                localStorage.setItem('company_id', data.id)
                setCompany(data.id);
            } else {
                setDeleteUrl(CompanyApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'location') {
            if (action === 'edit') {
                navigate('/manage-companies/location/' + data.id)
            } else {
                setDeleteUrl(LocationApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'workstation') {
            if (action === 'edit') {
                navigate('/manage-companies/workstation/' + data.id)
            } else {
                setDeleteUrl(WorkstationApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'responsible_person') {
            if (action === 'edit') {
                navigate('/manage-companies/responsible_person/' + data.id)
            } else {
                setDeleteUrl(ResponsiblePersonApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'cost center') {
            if (action === 'edit') {
                navigate('/manage-companies/cost_center/' + data.id)
            } else {
                setDeleteUrl(CostCenterApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'contracts') {
            if (action === 'edit') {
                navigate('/add-contracts-template/company/' + data.id)
            } else {
                setDeleteUrl(CompanyContractTemplateApiUrl + '/' + data.id)
            }
        }
    }

    const handleCheckBox = (val) => {

        setTemp((prevTemp) => {
            let arr = [];
            prevTemp.forEach((value) => {
                if (value.employee_type_id === val.employee_type_id) {
                    let data = { ...value, status: !value.status };
                    arr.push(data);
                } else {
                    arr.push(value);
                }
            });
            setListData(arr)

            //setting employee type ids array for payload
            let arr1 = []
            arr.map((val) => {

                if (val.status == true) {
                    arr1.push(val.employee_type_id)
                }
            })
            setDimonaConfigurationData((prev) => ({
                ...prev, "employee_type_ids": arr1
            }))
            return arr
        })

    }

    const onSave = () => {
        AXIOS.service(EmployeeTypeDimonaConfigurationApiUrl + "/" + localStorage.getItem("company_id"), "PUT", dimonaConfigurationData)
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

    return (
        <>
            {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {overviewContent !== 'dimona' && <Table columns={headers} rows={listData} tableName={overviewContent} viewAction={viewAction} multiPurpose={true} isArchived={isArchived}></Table>}
            {overviewContent === 'dimona' && <> <div className="col-md-12 p-0"> <table className="col-md-12 table border" >
                <thead>
                    <tr className="table-head-bg py-3 mb-2">
                        <th className="py-3 col-6">{t("EMPLOYEE_TYPE")}</th>
                        <th className="py-3 col-6">{t("ENABLE_DISABLE")}</th>
                    </tr>
                </thead>
                {listData.map((val, index) => {
                    return (
                        <tr key={val.id} className="my-2">
                            <td className="col-md-6 "><h6 className="my-auto text-center pl-5">{val.employee_type_name}</h6></td>
                            <td className="col-md-6 "> <CustomCheckBox key={val.id} checkboxList={[{ key: val.employee_type_id, value: val.employee_type_name }]} changeCheckbox={() => handleCheckBox(val)} checked={val.status == true ? true : false}></CustomCheckBox> </td>
                        </tr>)
                })}
            </table >
            </div>
                <div className="mt-2 mb-3 mx-auto bg-white p-5">
                    <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()} CustomStyle="my-3 float-right"></CustomButton>
                    <CustomButton buttonName={t("CANCEL")} ActionFunction={() => navigate("/manage-companies")} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                </div>
            </>
            }
        </>
    )
}
