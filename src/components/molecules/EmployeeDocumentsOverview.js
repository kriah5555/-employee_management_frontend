import React, { useState, useEffect } from "react";
import Table from "../atoms/Table";
import { APICALL as axios } from "../../services/AxiosServices";
import { t } from "../../translations/Translation";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeDocumentsOverview() {

    const [documents, setDocuments] = useState([])

    const params = useParams();
    const navigate = useNavigate()

    const tableHeaders = [
        {
            title: t("DOCUMENT_NAME"),
            field: "name",
            status: "200",
        },
        {
            title: t("TYPE"),
            field: "type",
            status: "200",
        },
    ]

    const dummyData = [
        { id: 1, name: 'Document-01', type: "Id Card" },
        { id: 2, name: 'Document-02', type: "Contract" },
        { id: 2, name: 'Document-03', type: "Leave" },
        { id: 1, name: 'Document-01', type: "Id Card" },
        { id: 2, name: 'Document-02', type: "Contract" },
    ]

    const viewAction = (data, action) => {

        if (action === 'edit') {
            console.log(data);
        } else if (action === 'view') {
            console.log(data);
        }

    }

    return (
        <Table columns={tableHeaders} rows={dummyData} tableName={"documents_overview"} viewAction={viewAction} ></Table>
    )
}