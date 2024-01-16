import React, { useState, useEffect } from "react";
import Table from "../atoms/Table";
import { APICALL as axios } from "../../services/AxiosServices";
import { t } from "../../translations/Translation";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { GetEmployeeDocumentsApiUrl } from "../../routes/ApiEndPoints";

export default function EmployeeDocumentsOverview({ eid }) {

    const [documentsData, setDocumentsData] = useState([])

    const tableHeaders = [
        {
            title: t("DOCUMENT_NAME"),
            field: "file_name",
            status: "200",
        },
        {
            title: t("TYPE"),
            field: "type",
            status: "200",
        },
    ]

    useEffect(() => {
        AXIOS.service(GetEmployeeDocumentsApiUrl + "/" + eid, 'GET')
            .then((result) => {
                if (result?.success) {
                    let arr = []
                    result.data.map((item, index) => {
                        item.id = item.file_id
                        arr.push(item)
                    })
                    setDocumentsData(arr)
                } else {
                    // setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const viewAction = (data, action) => {

        if (action === 'view') {
            window.open(data.file_url, '_blank')
        }

    }

    return (
        <Table columns={tableHeaders} rows={documentsData} tableName={"documents_overview"} viewAction={viewAction} ></Table>
    )
}