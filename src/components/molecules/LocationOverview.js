import React from "react";
import Table from "../atoms/Table";

export default function LocationOverview() {

    // Header data for location overview
    const headers = [
        {
            header: 'Location',
            accessorKey: "location",
            size: 200,
        },
        {
            header: 'Address',
            accessorKey: "address",
            size: 300,
        },
        {
            header: 'Incharge name',
            accessorKey: "name",
            size: 200,
        },
        {
            header: 'Email address',
            accessorKey: "email",
            size: 200,
        },
        {
            header: 'Phone number',
            accessorKey: "number",
            size: 200,
        },
    ];

    const GetLocationWithLeagalEntity = (data) => {
        return (
            <>
                <p className="mb-0">{data.location}</p>
                <small>{data.legal_entity}</small>
            </>
        )
    }


    // List of companies (Api will be called later)
    const listData = [
        { location: GetLocationWithLeagalEntity({ location: 'Location - 01', legal_entity: 'Legal entity' }), address: 'Marathahalli', name: 'Name-01', email: 'laxmiparwati.infanion123@gmail.com', number: '8648827364', id: '1' },
        { location: GetLocationWithLeagalEntity({ location: 'Location - 02', legal_entity: 'Legal entity' }), address: 'Marathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '2' },
        { location: GetLocationWithLeagalEntity({ location: 'Location - 03', legal_entity: 'Legal entity' }), address: 'AMarathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '3' },
        { location: GetLocationWithLeagalEntity({ location: 'Location - 04', legal_entity: 'Legal entity' }), address: 'Marathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '4' },
        { location: GetLocationWithLeagalEntity({ location: 'Location - 05', legal_entity: 'Legal entity' }), address: 'Marathahalli', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '5' },
        { location: GetLocationWithLeagalEntity({ location: 'Location - 06', legal_entity: 'Legal entity' }), address: 'Heislagsebaan 38 Braschaat 2930 Heislagsebaan 38 Braschaat 2930', name: 'Name-01', email: 'location@gmail.com', number: '8648827364', id: '6' },
    ];


    return (
        <Table columns={headers} rows={listData} tableName="location"></Table>
    )
}
