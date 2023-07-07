import React from "react";
import Table from "../atoms/Table";

export default function WorkstationOverview() {

    // Header data for workstation overview
    const headers = [
        {
            title: 'Workstation',
            field: 'workstation',
            size: 200,
        },
        {
            title: 'Blocked?',
            field: 'blocked_workstation',
            size: 150,
        },
        {
            title: 'Sequence',
            field: 'sequence',
            size: 200,
        },
        {
            title: 'Added functions',
            field: 'function',
            size: 250,
        }
    ];

    const getFunctions = (key) => {
        // This functions will get from API
        const functions = ['Function-01', 'Function-02', 'Function-03']
        return (
            functions.map((val, index) => {
                return (
                    <p key={val} className="mb-0">{val}</p>
                )
            })
        )
    }

    // List of Workstations (Api will be called later)
    const listData = [
        { workstation: 'Workstation - 01', blocked_workstation: 'Yes', sequence: 'Sequence-01', function: getFunctions(1), id: '1' },
        { workstation: 'Workstation - 02', blocked_workstation: 'No',  sequence: 'Sequence-01', function: getFunctions(2), id: '2' },
        { workstation: 'Workstation - 03', blocked_workstation: 'No',  sequence: 'Sequence-01', function: getFunctions(3), id: '3' },
        { workstation: 'Workstation - 04', blocked_workstation: 'Yes', sequence: 'Sequence-01', function: getFunctions(4), id: '4' },
        { workstation: 'Workstation - 05', blocked_workstation: 'No',  sequence: 'Sequence-01', function: getFunctions(5), id: '5' },
        { workstation: 'Workstation - 06', blocked_workstation: 'No',  sequence: 'Sequence-01', function: getFunctions(6), id: '6' },
    ];

    const viewAction = (data) => {
        console.log(data);
    }


    return (
        <Table columns={headers} rows={listData} tableName="workstation" viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
    )
}
