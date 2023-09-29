import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import EmployeeIcon from "../../static/icons/Profile1.jpeg"
import { ToastContainer } from 'react-toastify';
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { EmployeeApiUrl } from "../../routes/ApiEndPoints";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function EmployeesOverview({ setShowDetails, showDetails }) {

    const [parentId, setParentId] = useState('');
    const [eid, setEid] = useState('');

    const navigate = useNavigate();

    // Header data for employee overview
    const employeeHeaders = [
        {
            title: 'Employee',
            field: 'employee',
            sorting: false
        },
        {
            title: 'Mobile number',
            field: 'number',
            sorting: false
        },
        {
            title: 'Email address',
            field: 'email',
            sorting: false
        },
        {
            title: 'Social security number',
            field: 'ssn',
            sorting: false
        },
    ];

    //Header for employee list in employee details view
    const hidingHeaders = [
        {
            title: 'Search',
            field: 'employee',
            size: 100,
        }
    ]

    const [headers, setHeaders] = useState(employeeHeaders)

    //Function to redirect to employee details page
    const viewAction = (data) => {
        setParentId(data.parentId);
        setEid(data.id);
        setShowDetails(true);
    }


    useEffect(() => {
        if (showDetails) {
            setHeaders(hidingHeaders);
        } else {
            setHeaders(employeeHeaders);
        }

    }, [showDetails])


    useEffect(() => {
        let ApiUrl = EmployeeApiUrl + '/1'
        let Method = 'GET'

        AXIOS.service(ApiUrl, Method)
        .then((result) => {
            if (result?.success) {
                console.log(result);
            } else {
                // setErrors(result.message)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    })

    //Function to render employee name with image
    const getEmployeeWithIcon = (name, employee_type) => {
        return (
            <div className="row m-0" onClick={() => setShowDetails(true)}>
                {!showDetails && <div><img className="employee-icon mr-2 rounded-circle" src={EmployeeIcon}></img></div>}
                <div><h6 className="mb-0 font-inherit">{name}</h6><p className="mb-0 mt-1 font-12 text-secondary">{employee_type}</p></div>
            </div>
        )
    }

    //Employee list data based on employee types (parent & child format)
    const listData = [
        {
            employee: 'Normal employee',
            id: '1',
            type: 'type',
            parentOnly: "Normal employee",
        },
        { employee: getEmployeeWithIcon('Employee - 01', "employee type"), number: '8648827364', email: 'laxmiparwati.infanion123@gmail.com', ssn: '123498765101', id: '2', parentId: '1' },
        { employee: getEmployeeWithIcon('Employee - 02', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '3', parentId: '1' },
        { employee: getEmployeeWithIcon('Employee - 03', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '4', parentId: '1' },
        { employee: getEmployeeWithIcon('Employee - 04', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '5', parentId: '1' },
        { employee: getEmployeeWithIcon('Employee - 05', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '6', parentId: '1' },
        { employee: getEmployeeWithIcon('Employee - 06', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '7', parentId: '1' },

        {
            employee: 'Flex employee',
            id: '8',
            type: 'type',
            parentOnly: "Flex employee",
        },
        { employee: getEmployeeWithIcon('Employee - 01', "employee type"), number: '8648827364', email: 'laxmiparwati.infanion123@gmail.com', ssn: '123498765101', id: '9', parentId: '8' },
        { employee: getEmployeeWithIcon('Employee - 02', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '10', parentId: '8' },
        { employee: getEmployeeWithIcon('Employee - 03', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '11', parentId: '8' },
        { employee: getEmployeeWithIcon('Employee - 04', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '12', parentId: '8' },
        { employee: getEmployeeWithIcon('Employee - 05', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '13', parentId: '8' },
        { employee: getEmployeeWithIcon('Employee - 06', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '14', parentId: '8' },

        {
            employee: 'Student',
            id: '15',
            type: 'type',
            parentOnly: "Student",
        },
        { employee: getEmployeeWithIcon('Employee - 01', "employee type"), number: '8648827364', email: 'laxmiparwati.infanion123@gmail.com', ssn: '123498765101', id: '16', parentId: '15' },
        { employee: getEmployeeWithIcon('Employee - 02', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '17', parentId: '15' },
        { employee: getEmployeeWithIcon('Employee - 03', "employee type"), number: '8648827364', email: 'employee@gmail.com', ssn: '123498765101', id: '18', parentId: '15' }

    ];


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {!showDetails && <Table columns={headers} rows={listData} tableName="employee" viewAction={viewAction}></Table>}
            {showDetails && <Table columns={headers} rows={listData} tableName="employee" showDetails={showDetails} empId={eid} parentId={parentId}></Table>}

        </>
    )
}
