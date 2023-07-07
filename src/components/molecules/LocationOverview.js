import React from "react";
import Table from "../atoms/Table";

export default function LocationOverview() {

    // Header data for location overview
    const headers = [
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
            title: 'Incharge name',
            field: "name",
            size: 200,
        },
        {
            title: 'Email address',
            field: "email",
            size: 200,
        },
        {
            title: 'Phone number',
            field: "number",
            size: 200,
        },
    ];


    // List of companies (Api will be called later)
    const listData = [
        { location: 'Location - 01', address: 'Marathahalli', name: 'Name-01', email: 'laxmiparwati.infanion123@gmail.com', number: '8648827364', id: '1' },
        { location: 'Location - 02', address: 'Marathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '2' },
        { location: 'Location - 03', address: 'AMarathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '3' },
        { location: 'Location - 04', address: 'Marathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '4' },
        { location: 'Location - 05', address: 'Marathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '5' },
        { location: 'Location - 06', address: 'Heislagsebaan 38 Braschaat 2930', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '6' },
    ];

    const viewAction = (data) => {
        console.log(data);
    }


    return (
        <Table columns={headers} rows={listData} tableName="location" viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
    )
}
