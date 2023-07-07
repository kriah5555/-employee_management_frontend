import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import { useNavigate } from "react-router-dom";

export default function ConfigurationOverviews({ overviewContent }) {

    const navigate = useNavigate()

    // Header data for Function overview
    const function_headers = [
        {
            title: 'Title',
            field: 'title',
            size: 200,
        },
        // {
        //     header: 'Function code',
        //     field: 'code',
        //     size: 250,
        // },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ];

    // Header data for employee and sector overview
    const emp_type_sector_headers = [
        {
            title: 'Title',
            field: 'title',
            size: 200,
        },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ];



    // Header data for Group function overview
    const group_function_headers = [
        {
            title: 'Sector',
            field: 'title',
            size: 200,
        },
        // {
        //     header: 'Function title',
        //     field: 'code',
        //     size: 250,
        // },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ];


    // Data to display in overviews
    const emp_type_data = [
        { title: 'Normal employee', status: 'Active', id: '1' },
        { title: 'Interim', status: 'Active', id: '2' },
        { title: 'Student', status: 'Active', id: '3' },
        { title: 'Flex employee', status: 'Active', id: '4' },
        { title: 'Freelancer', status: 'Active', id: '5' },
        { title: 'Intern', status: 'Active', id: '6' },
    ];

    const function_data = [
        { title: 'Function - 01', status: 'Active', id: '1' },
        { title: 'Function - 02', status: 'Active', id: '2' },
        { title: 'Function - 03', status: 'Active', id: '3' },
        { title: 'Function - 04', status: 'Active', id: '4' },
        { title: 'Function - 05', status: 'Active', id: '5' },
        { title: 'Function - 06', status: 'Active', id: '6' },
    ];

    const sector_data = [
        { title: 'Sector - 01', status: 'Active', id: '1' },
        { title: 'Sector - 02', status: 'Active', id: '2' },
        { title: 'Sector - 03', status: 'Active', id: '3' },
    ];
    const group_function_data = [
        { title: 'Sector - 01', code: 'Function - 01', status: 'Active', id: '1' },
        { title: 'Sector - 02', code: 'Function - 02', status: 'Active', id: '2' },
        { title: 'Sector - 03', code: 'Function - 03', status: 'Active', id: '3' },
        { title: 'Sector - 04', code: 'Function - 04', status: 'Active', id: '4' },
    ];



    const [headers, setHeaders] = useState(emp_type_sector_headers);
    const [listData, setListData] = useState(emp_type_data);
    const [title, setTitle] = useState('Manage employee types');
    const [addTitle, setAddTitle] = useState('Add employee type');



    useEffect(() => {
        // Header data for Function overview
        if (overviewContent === 'employee_type' || overviewContent === 'sectors') {
            setHeaders(emp_type_sector_headers);

            if (overviewContent === 'sectors') {
                setListData(sector_data)
                setTitle('Manage sectors');
                setAddTitle('Add sector');
            } else {
                setListData(emp_type_data)
                setTitle('Manage employee types');
                setAddTitle('Add employee type');
            }
        } else if (overviewContent === 'functions') {
            setHeaders(function_headers);
            setListData(function_data);
            setTitle('Manage functions');
            setAddTitle('Add function');
        } else if (overviewContent === 'group_functions') {
            setHeaders(group_function_headers);
            setListData(group_function_data);
            setTitle('Manage group functions')
            setAddTitle('Add group function');
        } else {
            setHeaders([]);
            setListData([]);
            setTitle('')
            setAddTitle('');
        }
    }, [overviewContent])

    
    const viewAction = (data) => {
        console.log(data);
    }


    return (
        <>
            <div className="d-flex col-md-12 p-0 my-2 justify-content-between">
                <h4 className="text-color mb-0">{title}</h4>
                <h5 className="text-color mb-0 pointer" onClick={() => navigate(overviewContent === 'functions' ? '/add-function': '')}>
                    <img src={AddIcon} className="shortcut-icon mr-2"></img>{addTitle}
                </h5>
            </div>
            <Table columns={headers} rows={listData} tableName="function" viewAction={viewAction} height={'calc(100vh - 162px)'}></Table>
        </>

    )
}
