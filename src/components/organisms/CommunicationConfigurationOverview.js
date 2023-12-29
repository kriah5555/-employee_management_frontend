import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import { useNavigate, useParams } from "react-router-dom";
import { EmailTemplateApiUrl, ContractTemplateApiUrl, fetchAllTranslations } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import CustomTable from "../atoms/CustomTable";

export default function CommunicationConfigurationOverview() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');

    // Header data for Holiday code
    const communication_headers = [
        {
            title: 'Email templates',
            field: 'template_type',
            size: 200,
        },
    ]

    const translation_headers = [
        {
            title: 'String',
            field: 'key',
            size: 200,
        },
        {
            title: 'EN',
            field: 'text.en',
            size: 200,
        },
        {
            title: 'NL',
            field: 'text.nl',
            size: 200,
        },
        {
            title: 'FR',
            field: 'text.fr',
            size: 200,
        },

    ]

    //Header data for contract templates
    const contracts_template_headers = [
        {
            title: 'Employee Type',
            field: 'employee_type.name',
            size: '200',
        },
    ]

    const [headers, setHeaders] = useState(communication_headers);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState('Manage communication');
    const [addTitle, setAddTitle] = useState('Create email template');
    const [addUrl, setAddUrl] = useState('/add-email-template');
    const [tableName, setTableName] = useState("");

    // Header data for Holiday code
    // const communication_headers = [
    //     // {
    //     //     title: 'Email templates',
    //     //     field: 'name',
    //     //     size: 200,
    //     // },
    //     {
    //         title: "Mail type",
    //         field: 'template_type',
    //         size: 200.
    //     },

    // ]
    // const [headers, setHeaders] = useState(communication_headers);

    
    useEffect(() => {
        let apiUrl;
        // Header data for Function overview
        if (overviewContent == 'email') {
            apiUrl = EmailTemplateApiUrl
            setHeaders(communication_headers); setTitle('Manage email templates'); setAddTitle(''); setAddUrl('/add-email-template'); setTableName("email_template");
        } else if (overviewContent == 'contracts_template') {
            apiUrl = ContractTemplateApiUrl
            setHeaders(contracts_template_headers); setTitle('Manage contracts templates'); setAddTitle('Create contracts template'); setAddUrl('/add-contracts-template/template');setTableName("contract_template");
        } else {
            apiUrl = fetchAllTranslations
            setTitle('Manage translations'); setAddTitle('');
        }
        
        // Api call to get list data
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    let data = result.data
                    //filtering data for given company and also for null 
                    data.forEach(element => {
                        if (element.language) {
                            element.language = element.language.toUpperCase();
                        }
                    });
                    setListData(data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [overviewContent, dataRefresh])
    
    

    // Api call to delete item from table
    const DeleteApiCall = () => {

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
            setWarningMessage('Are you sure you want to delete this item?')
        }
        if (overviewContent === 'email') {
            if (action === 'edit') {
                navigate('/add-email-template/' + data.id)
            } else {
                setDeleteUrl(EmailTemplateApiUrl + '/' + data.id)
            }
        } else if (overviewContent === 'contracts_template') {
            if (action === 'edit') {
                navigate('/add-contracts-template/template/' + data.id)
            } else {
                setDeleteUrl(ContractTemplateApiUrl + '/' + data.id)
            }
        }
    }

    // Function to call API on editing the row
    const UpdateRow = (newData) => {

        AXIOS.service(fetchAllTranslations + '/' + newData.id, 'PUT', newData)
            .then((result) => {
                if (result?.success) {
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
                title={('WARNING')}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {/* All configurations */}
            <div className="company-tab-width mt-3 border bg-white">
                <div className={"d-flex col-md-12 justify-content-between py-3 border-thick"}>
                    <h4 className="text-color mb-0"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate("/configurations")} src={BackIcon}></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer" onClick={() => navigate(addUrl)}>
                            <img src={AddIcon} className="header-icon mr-1"></img>{addTitle}
                        </p>}
                    </div>
                </div>
                {overviewContent !== 'translation' && <div className="tablescroll">
                    <Table columns={headers} rows={listData} setRows={setListData} tableName={tableName} viewAction={viewAction} height={'calc(100vh - 162px)'} ></Table>
                </div>}
                {overviewContent === 'translation' && <CustomTable title={''} columns={translation_headers} rows={listData} setRows={setListData} tableName={'translation'} height={'calc(100vh - 162px)'} UpdateRow={UpdateRow}></CustomTable>}

            </div>
        </div>

    )
}
