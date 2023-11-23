import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { CompanyApiUrl, LocationApiUrl, WorkstationApiUrl, WorkstationListApiUrl, CostCenterApiUrl, CompanyContractTemplateApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";

export default function CompanyOverviews({ overviewContent, setCompanySelected }) {

    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');

    // Header data for company overview
    const Company_headers = [
        {
            title: 'Company',
            field: 'company_name',
            size: 200,
        },
        {
            title: 'Email address',
            field: 'email',
            size: 200,
        },
        {
            title: 'Phone number',
            field: 'phone',
            size: 200,
        },
    ];

    // Header data for location overview
    const Location_headers = [
        {
            title: 'Location',
            field: "location",
            size: 200,
        },
        {
            title: 'Address',
            field: "address",
            size: 300,
        },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ];

    // Header data for workstation overview
    const Workstation_headers = [
        {
            title: 'Workstation',
            field: 'workstation_name',
            size: 200,
        },
        {
            title: 'Sequence number',
            field: 'sequence_number',
            size: 200,
        },
        {
            title: 'Status',
            field: 'status',
            size: 250,
        }
    ];

    //cost center headers
    const cost_center_headers = [
        {
            title: 'Title',
            field: 'name',
            size: 200,
        },
        {
            title: 'Location',
            field: 'location.location_name',
            size: 200,
        },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ];

    //contract headers
    const contracts_template_headers = [
        {
            title: 'Employee Type',
            field: 'employee_type.name',
            size: '200',
        },
        {
            title: 'Language',
            field: 'language',
            size: '200',
        }
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
        } else if (overviewContent === 'cost center') {
            setHeaders(cost_center_headers)
            ApiUrl = CostCenterApiUrl
        } else if (overviewContent === 'contracts') {
            setHeaders(contracts_template_headers)
            ApiUrl = CompanyContractTemplateApiUrl
        }
        AXIOS.service(ApiUrl, 'GET')
            .then((result) => {
                if (result?.success && result.data.length !== listData.length) {
                    if (overviewContent === 'company' || overviewContent === 'workstation' || overviewContent === 'cost center') {
                        setListData(result.data)
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
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [overviewContent, dataRefresh])

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
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const viewAction = (data, action) => {
        if (action === 'delete') {
            setWarningMessage('Are you sure you want to delete this item?')
        }
        if (overviewContent === 'company') {
            if (action === 'edit') {
                navigate('/manage-companies/company-single/' + data.id)
            } else if (action === 'view') {
                navigate('/manage-companies/company-view/' + data.id)
            } else if (action === 'details') {
                setCompanySelected(true);
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

    return (
        <>
            {warningMessage && <ModalPopup
                title={('WARNING')}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            <Table columns={headers} rows={listData} tableName={overviewContent} viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
        </>
    )
}
