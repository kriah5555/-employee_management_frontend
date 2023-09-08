import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { CompanyApiUrl, LocationApiUrl, LocationListApiUrl, WorkstationApiUrl, WorkstationListApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate } from "react-router-dom";


export default function CompanyOverviews({overviewContent}) {

    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [dataRefresh, setDataRefresh] = useState(false);

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

    useEffect(() => {
        let ApiUrl;
        if (overviewContent === 'company') {
            setHeaders(Company_headers);
            ApiUrl = CompanyApiUrl
        } else if (overviewContent === 'location') {
            setHeaders(Location_headers);
            ApiUrl = LocationApiUrl + '/1/1'
        } else if (overviewContent === 'workstation') {
            setHeaders(Workstation_headers);
            ApiUrl = WorkstationListApiUrl + '/1/1'
        }
        AXIOS.service(ApiUrl, 'GET')
            .then((result) => {
                if (result?.success && result.data.length !== listData.length) {
                    if (overviewContent === 'company' || overviewContent === 'workstation') {
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
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [overviewContent, dataRefresh])

    // Api call to delete item from table
    const DeleteApiCall = (url) => {
        // APICall for create and updation of employee types
        AXIOS.service(url, 'DELETE')
            .then((result) => {
                if (result?.success) {
                    setDataRefresh(!dataRefresh);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const viewAction = (data, action) => {
        if (overviewContent === 'company') {
            if (action === 'edit') {
                navigate('/manage-companies/company-single/' + data.id)
            } else if (action === 'view') {
                console.log(data);
            } else {
                DeleteApiCall(CompanyApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'location') {
            if (action === 'edit') {
                navigate('/manage-companies/location/' + data.id)
            } else {
                DeleteApiCall(LocationApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'workstation') {
            if (action === 'edit') {
                navigate('/manage-companies/workstation/' + data.id)
            } else {
                DeleteApiCall(WorkstationApiUrl + '/' + data.id)
            }
        }
    }

    return (
        <Table columns={headers} rows={listData} tableName={overviewContent} viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
    )
}
