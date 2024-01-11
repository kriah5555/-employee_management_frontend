import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
// import AddIcon from "../../static/icons/add.png";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeTypeApiUrl, SectorApiUrl, FunctionApiUrl, GroupFunctionApiUrl, ContractTypeApiUrl, ReasonsApiUrl, SocialSecretaryApiUrl, InterimAgencyApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import ManageSalaries from "../molecules/ManageSalaries";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import { t } from "../../translations/Translation";
import Rules from "../molecules/Rules";
import Add from "../../static/icons/Add";

export default function ConfigurationOverviews() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');

    // Header data for employee and sector overview
    const emp_type_sector_headers = [
        {
            title: t("TITLE_TEXT"),
            field: 'name',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        },
    ];

    // Header data for Group function overview
    const group_function_headers = [
        {
            title: t("GROUP_FUNCTION_TITLE"),
            field: 'name',
            size: 200,
        },
        {
            title: t("SECTOR"),
            field: 'sector_id',
            size: 200,
        },
        // {
        //     title: 'Description',
        //     field: 'description',
        //     size: 200,
        // },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        },
    ];

    // Header data for reasons
    const reasons_headers = [
        {
            title: t("REASON"),
            field: 'name',
            size: 200,
        },
        {
            title: t("CATEGORY"),
            field: 'category',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        },
    ]
    // Headers for social secretary
    const social_secretary_headers = [
        {
            title: t("SOCIAL_SECRETARY"),
            field: 'name',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        }
    ]
    // Headers for social secretary
    const interim_agencies_headers = [
        {
            title: t("INTERIM_AGENCY"),
            field: 'name',
            size: 200,
        },
        {
            title: t("EMAIL"),
            field: 'email',
            size: 200,
        },
        {
            title: t("STATUS_TEXT"),
            field: 'status',
            size: 200,
        }
    ]

    const [headers, setHeaders] = useState(emp_type_sector_headers);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState('Manage employee types');
    const [addTitle, setAddTitle] = useState('Add employee type');
    const [addUrl, setAddUrl] = useState('/add_employee_type');

    useEffect(() => {
        let apiUrl;
        // Header data for Function overview
        if (overviewContent === 'employee_type' || overviewContent === 'sectors') {

            setHeaders(emp_type_sector_headers);
            if (overviewContent === 'sectors') {
                apiUrl = SectorApiUrl
                setTitle(t("MANAGE_SECTORS")); setAddTitle(t("ADD_SECTOR")); setAddUrl('/add-sector');
            } else {
                apiUrl = EmployeeTypeApiUrl
                setTitle(t("MANAGE_EMPLOYEE_TYPES")); setAddTitle(t("ADD_EMPLOYEE_TYPE")); setAddUrl('/add-employee-type');
            }

        } else if (overviewContent === 'functions') {
            apiUrl = FunctionApiUrl
            setHeaders(emp_type_sector_headers); setTitle(t("MANAGE_FUNCTIONS")); setAddTitle(t("ADD_FUNCTION")); setAddUrl('/add-function');

        } else if (overviewContent === 'group_functions') {
            apiUrl = GroupFunctionApiUrl
            setHeaders(group_function_headers); setTitle(t("MANAGE_GROUP_FUNCTION")); setAddTitle(t("ADD_GROUP_FUNCTION")); setAddUrl('/add-group-function');

        } else if (overviewContent === 'contract_type') {
            apiUrl = ContractTypeApiUrl
            setHeaders(emp_type_sector_headers); setTitle(t("MANAGE_CONTRACT_TYPES")); setAddTitle(t("ADD_CONTRACT_TYPE")); setAddUrl('/add-contract-type');

        } else if (overviewContent === 'reasons') {
            apiUrl = ReasonsApiUrl
            setHeaders(reasons_headers); setTitle(t("MANAGE_REASONS")); setAddTitle(t("ADD_REASONS")); setAddUrl('/add-reasons');

        } else if (overviewContent === 'social_secretary') {
            apiUrl = SocialSecretaryApiUrl
            setHeaders(social_secretary_headers); setTitle(t("MANAGE_SOCIAL_SECRETARY")); setAddTitle(t("ADD_SOCIAL_SECRETARY")); setAddUrl('/add-social-secretary');
        } else if (overviewContent === 'interim-agencies') {
            apiUrl = InterimAgencyApiUrl
            setHeaders(interim_agencies_headers); setTitle(t("MANAGE_INTERIM_AGENCIES")); setAddTitle(t("ADD_INTERIM_AGENCIES")); setAddUrl('/add-interim-agency');
        }

        // Api call to get list data
        if (overviewContent !== 'default_param' && overviewContent !== 'parameters')
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setListData(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [overviewContent, dataRefresh])


    // Api call to delete item from table
    const DeleteApiCall = () => {
        // APICall for create and updation of employee types
        AXIOS.service(deleteUrl, 'DELETE')
            .then((result) => {
                if (result?.success) {
                    setDataRefresh(!dataRefresh);
                    setWarningMessage('')
                    toast.success(result.message[0], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function for onclick of actions in the overview tables
    const viewAction = (data, action) => {
        if (action === 'delete') {
            setWarningMessage(t("DELETE_CONFIRMATION_COMPANY") + ("?"))
        }
        if (overviewContent === 'employee_type') {
            if (action === 'edit') {
                navigate('/add-employee-type/' + data.id)
            } else {
                setDeleteUrl(EmployeeTypeApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'sectors') {
            if (action === 'edit') {
                navigate('/add-sector/' + data.id)
            } else {
                setDeleteUrl(SectorApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'functions') {
            if (action === 'edit') {
                navigate('/add-function/' + data.id)
            } else {
                setDeleteUrl(FunctionApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'group_functions') {
            if (action === 'edit') {
                navigate('/add-group-function/' + data.id)
            } else {
                setDeleteUrl(GroupFunctionApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'contract_type') {
            if (action === 'edit') {
                navigate('/add-contract-type/' + data.id)
            } else {
                setDeleteUrl(ContractTypeApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'reasons') {
            if (action === 'edit') {
                navigate('/add-reasons/' + data.id)
            } else {
                setDeleteUrl(ReasonsApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'social_secretary') {
            if (action === 'edit') {
                navigate('/add-social-secretary/' + data.id)
            } else if (action === 'link') {
                navigate('/link-holiday-code/' + data.id)
            } else {
                setDeleteUrl(SocialSecretaryApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'interim-agencies') {
            if (action === 'edit') {
                navigate('/add-interim-agency/' + data.id)
            } else {
                setDeleteUrl(InterimAgencyApiUrl + '/' + data.id)
            }
        }
    }

    
    return (
        <div className="right-container">
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
            {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {/* All configurations */}
            {overviewContent !== 'min_salary' &&  overviewContent !== 'default_param' && overviewContent !== 'parameters' && <div className="company-tab-width d-flex flex-column mt-3 border bg-white">
                <div className={"d-flex justify-content-between p-2 border-thick align-items-center"}>
                    <h4 className="text-color mb-0 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate("/configurations")} src={BackIcon}></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer d-flex align-items-center add_btn" onClick={() => navigate(addUrl)}>
                            <Add /><span>{addTitle}</span>
                        </p>}
                    </div>
                </div>

                <div className="tablescroll flex-1">
                    <Table columns={headers} rows={listData} setRows={setListData} tableName={overviewContent === 'social_secretary' ? 'social_secretary' :'function'} viewAction={viewAction} height={'100%'} ></Table>
                </div>
            </div>}
            {/* Minimum salary configurations */}
            {overviewContent === 'min_salary' && <ManageSalaries></ManageSalaries>}
            {(overviewContent === 'default_param' || overviewContent === 'parameters') && <Rules overviewContent={overviewContent}></Rules>}
        </div>

    )
}
