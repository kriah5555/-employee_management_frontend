import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { CompanyApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"


export default function CompanyOverview() {

    const [listData, setListData] = useState([]);

    useEffect(() => {
        AXIOS.service(CompanyApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (result.data.length !== listData.length)
                    setListData(result.data)
                        // result.data.map((resp, index) => {
                        //     let obj = {
                        //         id: index,
                        //         company: resp.company_name,
                        //         address: resp.address.street_house_no,
                        //         email: resp.email,
                        //         phone: resp.phone,
                        //     }
                        //     listData.push(resp)
                        // })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Header data for company overview
    const headers = [
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

    const viewAction = (val) => {
        console.log(val);
    }

    return (
        <Table columns={headers} rows={listData} tableName="company" viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
    )
}
