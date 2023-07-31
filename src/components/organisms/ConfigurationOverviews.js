import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import ConfigurationIcon from "../../static/icons/Configuration.svg";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeTypeApiUrl, SectorApiUrl, FunctionApiUrl, GroupFunctionApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"

export default function ConfigurationOverviews() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);

    // Header data for Function overview
    const function_headers = [
        {
            title: 'Title',
            field: 'name',
            size: 200,
        },
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
            field: 'name',
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
            title: 'Group function title',
            field: 'name',
            size: 200,
        },
        {
            title: 'Description',
            field: 'description',
            size: 200,
        },
        {
            title: 'Status',
            field: 'status',
            size: 200,
        },
    ];


    const [headers, setHeaders] = useState(emp_type_sector_headers);
    const [listData, setListData] = useState();
    const [title, setTitle] = useState('Manage employee types');
    const [addTitle, setAddTitle] = useState('Add employee type');
    const [addUrl, setAddUrl] = useState('/add_employee_type')


    useEffect(() => {
        let apiUrl;
        // Header data for Function overview
        if (overviewContent === 'employee_type' || overviewContent === 'sectors') {

            setHeaders(emp_type_sector_headers);
            if (overviewContent === 'sectors') {
                apiUrl = SectorApiUrl
                setTitle('Manage sectors'); setAddTitle('Add sector'); setAddUrl('/add-sector');
            } else {
                apiUrl = EmployeeTypeApiUrl
                setTitle('Manage employee types'); setAddTitle('Add employee type'); setAddUrl('/add-employee-type');
            }

        } else if (overviewContent === 'functions') {
            apiUrl = FunctionApiUrl
            setHeaders(function_headers); setTitle('Manage functions'); setAddTitle('Add function'); setAddUrl('/add-function');

        } else if (overviewContent === 'group_functions') {
            apiUrl = GroupFunctionApiUrl
            setHeaders(group_function_headers); setTitle('Manage group functions'); setAddTitle('Add group function'); setAddUrl('/add-group-function');

        } else {
            apiUrl = ''
            setHeaders([]); setListData([]); setTitle(''); setAddTitle('');
        }

        // Api call to get list data
        AXIOS.service(apiUrl, 'GET')
            .then((val) => {
                setListData(val)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [overviewContent, dataRefresh])

    const DeleteApiCall = (url) => {
        // APICall for create and updation of employee types
        AXIOS.service(url, 'DELETE')
            .then((result) => {
                if (result && result.status === 200) {
                    console.log(result.message);
                } else {
                    setDataRefresh(!dataRefresh);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function for onclick of actions in the overview tables
    const viewAction = (data, action) => {
        if (overviewContent === 'employee_type') {
            if (action === 'edit') {
                navigate('/add-employee-type/' + data.id)
            } else {
                DeleteApiCall(EmployeeTypeApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'sectors') {
            if (action === 'edit') {
                navigate('/add-sector/' + data.id)
            } else {
                DeleteApiCall(SectorApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'functions') {
            if (action === 'edit') {
                navigate('/add-function/' + data.id)
            } else {
                DeleteApiCall(FunctionApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'group_functions') {
            if (action === 'edit') {
                navigate('/add-group-function/' + data.id)
            } else {
                DeleteApiCall(GroupFunctionApiUrl + '/' + data.id)
            }
        }

    }


    return (
        <div className="right-container">
            {overviewContent !== 'min_salary' && <div className="company-tab-width mt-3 border bg-white">
                <div className="d-flex col-md-12 my-2 justify-content-between">
                    <h4 className="text-color mb-0">{title}</h4>
                    <div className="row m-0">
                        <p className="text-color mb-0 pointer mr-4" onClick={() => navigate('/configurations')}>
                            <img src={ConfigurationIcon} className="header-icon mr-2"></img><u>{'Back to configurations'}</u>
                        </p>
                        <p className="text-color mb-0 pointer" onClick={() => navigate(addUrl)}>
                            <img src={AddIcon} className="header-icon mr-1"></img>{addTitle}
                        </p>
                    </div>
                </div>
                <div className="tablescroll">
                    <Table columns={headers} rows={listData} tableName="function" viewAction={viewAction} height={'calc(100vh - 162px)'}></Table>
                </div>
            </div>}
            {overviewContent === 'min_salary' && <div className="company-tab-width mt-3 p-5 border bg-white">
                <p className="text-color pointer mr-4" onClick={() => navigate('/configurations')}>
                    <img src={ConfigurationIcon} className="header-icon mr-2"></img><u>{'Back to configurations'}</u>
                </p>
                <h4> Manage minimum salaries </h4>
            </div>
            }
        </div>

    )
}
