import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { useNavigate, useParams } from "react-router-dom";
import { EmailTemplateApiUrl, ContractTemplateApiUrl, fetchAllTranslations } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import CustomTable from "../atoms/CustomTable";
import { t } from "../../translations/Translation";
import Add from "../../static/icons/Add";

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
            title: t("EMAIL_TEMPLATES"),
            field: 'template_type',
            size: 200,
        },
    ]

    const translation_headers = [
        {
            title: t("STRING"),
            field: 'key',
            size: 200,
            editable: 'never',
        },
        {
            title: 'EN',
            field: 'text.en',
            size: 200,
            editable: 'onUpdate'
        },
        {
            title: 'NL',
            field: 'text.nl',
            size: 200,
            editable: 'onUpdate'
        },
        {
            title: 'FR',
            field: 'text.fr',
            size: 200,
            editable: 'onUpdate'
        },

    ]

    //Header data for contract templates
    const contracts_template_headers = [
        {
            title: t("CONTRACT_TYPE"),
            field: 'contract_type.name',
            size: '200',
        },
    ]

    const [headers, setHeaders] = useState(communication_headers);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState(t("MANAGE_COMMUNICATION"));
    const [addTitle, setAddTitle] = useState(t("CREATE_EMAIL_TEMPLATE"));
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
        if (overviewContent === 'email') {
            apiUrl = EmailTemplateApiUrl
            setHeaders(communication_headers); setTitle(t("MANAGE_EMAIL_TEMPLATE")); setAddTitle(''); setAddUrl('/add-email-template'); setTableName("email_template");
        } else if (overviewContent === 'contracts_template') {
            apiUrl = ContractTemplateApiUrl
            setHeaders(contracts_template_headers); setTitle(t("MANAGE_CONTRACTS_TEMPLATE")); setAddTitle(t("CREATE_CONTRACTS_TEMPLATE")); setAddUrl('/add-contracts-template/template'); setTableName("contract_template");
        } else {
            apiUrl = fetchAllTranslations
            setTitle(t("MANAGE_TRANSLATIONS")); setAddTitle('');
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
            setWarningMessage(t("DELETE_CONFIRMATION_COMPANY") + ("?"))
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
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
            {/* All configurations */}
            <div className="company-tab-width mt-3 border bg-white d-flex flex-column">
                <div className={"d-flex px-3 justify-content-between py-3 border-thick align-items-center"}>
                    <h4 className="text-color mb-0 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate("/configurations")} src={BackIcon} alt="Back"></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer d-flex align-items-center add_btn" onClick={() => navigate(addUrl)}>
                            <Add/><span>{addTitle}</span>
                        </p>}
                    </div>
                </div>
                {overviewContent !== 'translation' && <div className="tablescroll flex-1">
                    <Table columns={headers} rows={listData} setRows={setListData} tableName={tableName} viewAction={viewAction} height={'100%'} ></Table>
                </div>}
                {overviewContent === 'translation' && <CustomTable title={''} columns={translation_headers} rows={listData} setRows={setListData} tableName={'translation'} height={'calc(100vh - 162px)'} UpdateRow={UpdateRow}></CustomTable>}

            </div>
        </div>

    )
}
