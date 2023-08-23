import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeTypeApiUrl, SectorApiUrl, FunctionApiUrl, GroupFunctionApiUrl, ContractTypeApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import CustomButton from "../atoms/CustomButton";
import BackIcon from "../../static/icons/BackIcon.png";

export default function ConfigurationOverviews() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [selectedSector, setSelectedSector] = useState('');
    const [noSectorMessage, setNoSectorMessage] = useState(overviewContent === 'min_salary' ? 'Please select sector to get the salaries' : '')

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

    // Header data for Salaries overview
    const salary_header = [
        {
            title: 'Level',
            field: 'level',
            size: 500,
        },
        {
            title: 'Category 1',
            field: 'cat1',
            size: 200,
        },
        {
            title: 'Category 2',
            field: 'cat2',
            size: 200,
        },
        {
            title: 'Category 3',
            field: 'cat3',
            size: 200,
        },
        {
            title: 'Category 4',
            field: 'cat4',
            size: 200,
        },
        {
            title: 'Category 5',
            field: 'cat5',
            size: 200,
        },
        {
            title: 'Category 6',
            field: 'cat6',
            size: 200,
        },
        {
            title: 'Category 7',
            field: 'cat7',
            size: 200,
        },
        {
            title: 'Category 8',
            field: 'cat8',
            size: 200,
        },
        {
            title: 'Category 9',
            field: 'cat9',
            size: 200,
        },
    ];



    const box = () => {
        return (
            <TextInput
                title={''}
                name={'box'}
                CustomStyle={"col-md-8 p-0"}
                setValue={(e) => console.log(e)}
            ></TextInput>
        )
    }

    const salaryData = [
        { 'level': '1', 'cat1': box(), 'cat2': box(), 'cat3': box(), 'cat4': box(), 'cat5': box(), 'cat6': box(), 'cat7': box(), 'cat8': box(), 'cat9': box(), id: '1' },
        { 'level': '1', 'cat1': box(), 'cat2': box(), 'cat3': box(), 'cat4': box(), 'cat5': box(), 'cat6': box(), 'cat7': box(), 'cat8': box(), 'cat9': box(), id: '2' },
        { 'level': '3', 'cat1': box(), 'cat2': box(), 'cat3': box(), 'cat4': box(), 'cat5': box(), 'cat6': box(), 'cat7': box(), 'cat8': box(), 'cat9': box(), id: '3' },
        { 'level': '4', 'cat1': box(), 'cat2': box(), 'cat3': box(), 'cat4': box(), 'cat5': box(), 'cat6': box(), 'cat7': box(), 'cat8': box(), 'cat9': box(), id: '4' },
        { 'level': '5', 'cat1': box(), 'cat2': box(), 'cat3': box(), 'cat4': box(), 'cat5': box(), 'cat6': box(), 'cat7': box(), 'cat8': box(), 'cat9': box(), id: '5' },
    ]


    const [headers, setHeaders] = useState(emp_type_sector_headers);
    const [listData, setListData] = useState();
    const [title, setTitle] = useState('Manage employee types');
    const [addTitle, setAddTitle] = useState('Add employee type');
    const [addUrl, setAddUrl] = useState('/add_employee_type');
    const [sectors, setSectors] = useState([])


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

        } else if (overviewContent === 'contract_type') {
            apiUrl = ContractTypeApiUrl
            setHeaders(function_headers); setTitle('Manage contract types'); setAddTitle('Add contract type'); setAddUrl('/add-contract-type');

        } else {
            apiUrl = SectorApiUrl
            setHeaders(salary_header); setListData(salaryData); setTitle('Manage minimum salaries'); setAddTitle('');
        }

        // Api call to get list data
        // if (overviewContent !== 'min_salary') {
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === 'min_salary') {
                        if (sectors.length === 0) {
                            result.data.map((val, index) => {
                                sectors.push({ value: val.id, label: val.name })
                            })
                        }
                    } else {
                        setListData(result.data);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        // }

    }, [overviewContent, dataRefresh])

    const DeleteApiCall = (url) => {
        // APICall for create and updation of employee types
        AXIOS.service(url, 'DELETE')
            .then((result) => {
                if (result?.success) {
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
        } else if (overviewContent === 'contract_type') {
            if (action === 'edit') {
                navigate('/add-contract-type/' + data.id)
            } else {
                DeleteApiCall(ContractTypeApiUrl + '/' + data.id)
            }
        }
    }

    const getSalaries = () => {
        setNoSectorMessage('')

    }


    return (
        <div className="right-container">
            {<div className="company-tab-width mt-3 border bg-white">
                <div className={"d-flex col-md-12 justify-content-between py-3 border-thick"}>
                    <h4 className="text-color mb-0"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate(-1)} src={BackIcon}></img>{title}</h4>
                    <div className="row m-0">
                        {/* <p className="text-color mb-0 pointer mr-4" onClick={() => navigate('/configurations')}>
                            <img src={ConfigurationIcon} className="header-icon mr-2"></img><u>{'Back to configurations'}</u>
                        </p> */}
                        {addTitle && <p className="text-color mb-0 pointer" onClick={() => navigate(addUrl)}>
                            <img src={AddIcon} className="header-icon mr-1"></img>{addTitle}
                        </p>}
                    </div>
                </div>
                {overviewContent === 'min_salary' && <div className="col-md-12 mb-2 row m-0">
                    <Dropdown
                        options={sectors}
                        selectedOptions={selectedSector}
                        onSelectFunction={(e) => setSelectedSector(e)}
                        CustomStyle="my-2 col-md-6"
                        title={'Sectors'}
                        required={true}
                        isMulti={false}
                    // error={error3}
                    // styleMargin={error2 ? '' : 'my-2'}
                    ></Dropdown>
                    <CustomButton buttonName={'Search'} ActionFunction={() => getSalaries()} CustomStyle="mt-5 mb-3"></CustomButton>
                </div>}
                <div className="tablescroll">
                    {noSectorMessage && overviewContent === 'min_salary' && <h5 className="text-danger ml-2 pl-4">{noSectorMessage}</h5>}
                    {noSectorMessage === '' && <Table columns={headers} rows={listData} tableName={overviewContent !== 'min_salary' ? 'function' : overviewContent} viewAction={viewAction} height={'calc(100vh - 162px)'}></Table>}
                </div>
            </div>}
            {/* {overviewContent === 'min_salary' && <div className="company-tab-width mt-3 p-5 border bg-white">
                <p className="text-color pointer mr-4" onClick={() => navigate('/configurations')}>
                    <img src={ConfigurationIcon} className="header-icon mr-2"></img><u>{'Back to configurations'}</u>
                </p>
                <h4> Manage minimum salaries </h4>
            </div>
            } */}
        </div>

    )
}
