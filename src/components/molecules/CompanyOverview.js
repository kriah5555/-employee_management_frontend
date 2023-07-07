import React from "react";
import Table from "../atoms/Table";

export default function CompanyOverview() {

    // Header data for company overview
    const headers = [
        {
            title: 'Company',
            field:'company',
            size: 200,
        },
        {
            title: 'Address',
            field:'address',
            size: 250,
        },
        {
            title: 'Customer type',
            field:'type',
            size: 200,
        },
        {
            title: 'Incharge name',
            field:'name',
            size: 200,
        },
        {
            title: 'Email address',
            field:'email',
            size: 200,
        },
        {
            title: 'Phone number',
            field:'number',
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
        { company: 'Company - 06', address: 'Heislagsebaan 38 Braschaat', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '6' },

        { company: 'Company - 01', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'laxmiparwati.infanion123@gmail.com', number: '8648827364', id: '1' },
        { company: 'Company - 02', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '2' },
        { company: 'Company - 03', address: 'AMarathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '3' },
        { company: 'Company - 04', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '4' },
        { company: 'Company - 05', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '5' },
        { company: 'Company - 06', address: 'Heislagsebaan 38 Braschaat', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '6' },

        { company: 'Company - 01', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'laxmiparwati.infanion123@gmail.com', number: '8648827364', id: '1' },
        { company: 'Company - 02', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '2' },
        { company: 'Company - 03', address: 'AMarathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '3' },
        { company: 'Company - 04', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '4' },
        { company: 'Company - 05', address: 'Marathahalli', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '5' },
        { company: 'Company - 06', address: 'Heislagsebaan 38 Braschaat', type: 'Indii', name: 'Name-01', email: 'company@gmail.com', number: '8648827364', id: '6' },
    ];

    const viewAction = (val) => {
        console.log(val);
    }


    return (
        <Table columns={headers} rows={listData} tableName="company" viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
    )
}
