import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import { useNavigate, useParams } from "react-router-dom";
import { TaxesApiUrl, SalaryCoefficientApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import { t } from "../../translations/Translation";
import Add from "../../static/icons/Add";
import ExportConfiguration from "../molecules/ExportConfiguration"

export default function SocialSecretaryAndReportingConfigurationOverview() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');


    // Header data for Holiday code
    const taxes_header = [
        {
            title: t("TAX_FROM_DATE"),
            field: 'from_date',
            size: 200,
        },
        {
            title: t("TAX_TO_DATE"),
            field: 'to_date',
            size: 200,
        },
        {
            title: t("HOURLY_TAX"),
            field: 'hourly_tax',
            size: 200,
        },
        {
            title: t("DAILY_MAXIMUM_TAX"),
            field: 'max_per_day',
            size: 200,
        },
        {
            title: t("EMPLOYEE_TAX"),
            field: 'employee_tax',
            size: 200,
        },
        {
            title: t("EMPLOYER_TAX"),
            field: 'employer_tax',
            size: 200,
        },
        {
            title: t("YEAR_END_BONUS"),
            field: 'year_end_bonus',
            size: 200,
        },
        {
            title: t("HOLIDAY_PAY"),
            field: 'holiday_pay',
            size: 200,
        },
        {
            title: t("PAY_TYPE_TAX_PERCENTAGE"),
            field: 'percentage_on_pay_type',
            size: 200,
        }
    ]

    const salary_coefficient_headers = [
        {
            title: t('EMPLOYEE_TYPE'),
            field: 'employee_type',
            size: 200,
            editable: 'never'

        },
        {
            title: t('SALARY_COEFFICIENT'),
            field: 'coefficient',
            size: 200,
            editable: 'onUpdate'
        }

    ]

    const [headers, setHeaders] = useState(taxes_header);
    const [listData, setListData] = useState([]);
    const [title, setTitle] = useState('');
    const [addTitle, setAddTitle] = useState('');
    const [addUrl, setAddUrl] = useState('');

    useEffect(() => {
        let apiUrl;
        // Header data for Function overview
        if (overviewContent === 'taxes') {
            apiUrl = TaxesApiUrl
            setHeaders(taxes_header); setTitle(t("MANAGE_TAXES")); setAddTitle(t("ADD_TAXES")); setAddUrl('/add-taxes');
        } else if (overviewContent === 'salary_coefficient') {
            apiUrl = SalaryCoefficientApiUrl
            setHeaders(salary_coefficient_headers); setTitle(t("MANAGE_COEFFICIENT")); setAddTitle(t('ADD_SALARY_COEFFICIENT')); setAddUrl("/add-salary-coefficient");
        } else if (overviewContent === 'export_configuration') {
            apiUrl = ""
            setHeaders(taxes_header); setTitle(t("MANAGE_EXPORT_CONFIGURATION"))
        }

        // Api call to get list data
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === 'taxes') {
                        setListData(result.data);
                    } else if (overviewContent === 'salary_coefficient') {
                        let data = []
                        result.data.map((item, index) => {
                            let newData = {
                                "id": item.id,
                                "employee_type": item.employee_type?.label,
                                "coefficient": item.coefficient,
                            }
                            data.push(newData)
                        })
                        setListData(data)
                    }
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
                    setWarningMessage('')
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
        if (overviewContent === 'taxes') {
            if (action === 'edit') {
                navigate('/add-taxes/' + data.id)
            } else {
                setDeleteUrl(TaxesApiUrl + '/' + data.id)
            }

        } else if (overviewContent === 'salary_coefficient') {
            if (action === 'edit') {
                navigate('/add-salary-coefficient/' + data.id)
            } else {
                setDeleteUrl(SalaryCoefficientApiUrl + '/' + data.id)
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
            <div className="company-tab-width mt-3 border bg-white d-flex flex-column">
                <div className={"d-flex px-3 justify-content-between py-2 border-thick align-items-center"}>
                    <h4 className="text-color mb-0 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate("/configurations")} src={BackIcon} alt="Back"></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer d-flex align-items-center add_btn" onClick={() => navigate(addUrl)}>
                            <Add />
                            <span>{addTitle}</span>
                        </p>}
                    </div>
                </div>
                <div className="tablescroll flex-1 d-flex flex-column">
                    <div className="flex-1">
                        {(overviewContent === 'taxes' || overviewContent === 'salary_coefficient') && <Table columns={headers} rows={listData} setRows={setListData} tableName={"taxes"} viewAction={viewAction} height={overviewContent === "holiday_code_configuration" ? '100%' : '100%'} ></Table>}
                        {overviewContent === 'export_configuration' && <ExportConfiguration></ExportConfiguration>}
                    </div>
                </div>
            </div>
        </div>
    )
}
