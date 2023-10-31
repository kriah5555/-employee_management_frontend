import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import { useNavigate, useParams } from "react-router-dom";
import { EmailTemplateApiUrl, ContractTemplateApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";

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
            field: 'name',
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
        {
            title: 'Language',
            field: 'language',
            size: '200',
        }
    ]

    const [headers, setHeaders] = useState(communication_headers);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState('Manage communication');
    const [addTitle, setAddTitle] = useState('Create email template');
    const [addUrl, setAddUrl] = useState('/add-email-template');

    useEffect(() => {
        let apiUrl;
        // Header data for Function overview
        if (overviewContent == 'email') {
            apiUrl = EmailTemplateApiUrl
            setHeaders(communication_headers); setTitle('Manage email templates'); setAddTitle('Create email template'); setAddUrl('/add-email-template');
        } else if (overviewContent == 'contracts_template') {
            apiUrl = ContractTemplateApiUrl
            setHeaders(contracts_template_headers); setTitle('Manage contracts templates'); setAddTitle('Create contracts template'); setAddUrl('/add-contracts-template/template');
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
                <div className="tablescroll">
                    <Table columns={headers} rows={listData} setRows={setListData} tableName={'function'} viewAction={viewAction} height={'calc(100vh - 162px)'} ></Table>
                </div>
            </div>
        </div>

    )
}
