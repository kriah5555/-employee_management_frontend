import React from "react";
import Table from "../atoms/Table";

export default function CompanyOverview() {

    // Header data for company overview
    const headers = [
        {
            header: 'Company',
            accessorKey:'company',
            size: 200,
        },
        {
            header: 'Address',
            accessorKey:'address',
            size: 250,
        },
        {
            header: 'Customer type',
            accessorKey:'type',
            size: 200,
        },
        {
            header: 'Incharge name',
            accessorKey:'name',
            size: 200,
        },
        {
            header: 'Email address',
            accessorKey:'email',
            size: 200,
        },
        {
            header: 'Phone number',
            accessorKey:'number',
            size: 200,
        },
    ];

    // List of companies (Api will be called later)
    const listData = [
        { company: 'Company - 01', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'laxmiparwati.infanion123@gmail.com', number: '8648827364', id: '1' },
        { company: 'Company - 02', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '2' },
        { company: 'Company - 03', address: 'AMarathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '3' },
        { company: 'Company - 04', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '4' },
        { company: 'Company - 05', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '5' },
        { company: 'Company - 06', address: 'Heislagsebaan 38 Braschaat 2930 Heislagsebaan 38 Braschaat 2930', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '6' },
    ];


    return (
        <Table columns={headers} rows={listData} tableName="company"></Table>
    )
}
