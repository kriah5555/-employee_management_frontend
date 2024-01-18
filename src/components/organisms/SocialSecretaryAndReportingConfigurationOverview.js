import React, { useEffect, useState } from "react";
import Table from "../atoms/Table";
import AddIcon from "../../static/icons/add.png";
import { useNavigate, useParams } from "react-router-dom";
import { TaxesApiUrl, SalaryCoefficientApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import BackIcon from "../../static/icons/BackIcon.png";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import CustomButton from "../atoms/CustomButton";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";
import Add from "../../static/icons/Add";
import CustomTable from "../atoms/CustomTable";

export default function SocialSecretaryAndReportingConfigurationOverview() {

    const navigate = useNavigate();
    let params = useParams();
    let overviewContent = params.type
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');

    const [formData, setFormData] = useState();


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
            field: 'employee_type_name',
            size: 200,
            editable: 'never'

        },
        {
            title: t('SALARY_COEFFICIENT'),
            field: 'salary_coefficient',
            size: 200,
            editable: 'onUpdate'
        }

    ]
    const dummyData = [
        { id: 1, "employee_type_name": 'student', 'salary_coefficient': '1.5' },
        { id: 2, "employee_type_name": 'student', 'salary_coefficient': '1.8' },
        { id: 3, "employee_type_name": 'student', 'salary_coefficient': '1.7' }
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
            setHeaders(salary_coefficient_headers); setTitle(t("MANAGE_COEFFICIENT")); setAddTitle(''); setAddUrl("/add-salary-coefficient");
        }

        // Api call to get list data
        AXIOS.service(apiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (overviewContent === "holiday_code_configuration") {

                    } else {
                        setListData(result.data);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        if (overviewContent === 'salary_coefficient') {

            setListData(dummyData)
        }
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
                console.log(data);
                // navigate('/add-public-holiday/' + data.id)
            } else {
                // setDeleteUrl(PublicHolidayCodeApiUrl + '/' + data.id)
            }
        }
    }


    const setValues = (index, name, value, field) => {

    }

    const UpdateRow = (newData) => {

        // newData['salary_coefficient'] = selectedType?.value
        console.log(newData);
        // let apiUrl = ""
        // AXIOS.service(apiUrl + '/' + newData.id, 'PUT', newData)
        //     .then((result) => {
        //         if (result?.success) {
        //             setDataRefresh(!dataRefresh)
        //             toast.success(result.message[0], {
        //                 position: "top-center",
        //                 autoClose: 2000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "colored",
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

    const onSave = () => {
        let url = ""
        AXIOS.service(url, "PUT", formData)
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
                console.log(error)
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
                <div className={"d-flex px-3 justify-content-between py-2 border-thick align-items-center"}>
                    <h4 className="text-color mb-0 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate("/configurations")} src={BackIcon}></img>{title}</h4>
                    <div className="row m-0">
                        {addTitle && <p className="text-color mb-0 pointer d-flex align-items-center add_btn" onClick={() => navigate(addUrl)}>
                            <Add />
                            <span>{addTitle}</span>
                        </p>}
                    </div>
                </div>
                <div className="tablescroll flex-1 d-flex flex-column">
                    <div className="flex-1">
                        {overviewContent === 'taxes' && <Table columns={headers} rows={listData} setRows={setListData} tableName={"taxes"} viewAction={viewAction} height={overviewContent == "holiday_code_configuration" ? '100%' : '100%'} ></Table>}
                        {overviewContent === 'salary_coefficient' && <CustomTable columns={headers} rows={listData} setRows={setListData} UpdateRow={UpdateRow} tableName={'salary_coefficient'}></CustomTable>}
                    </div>
                    {/* {overviewContent === "salary-coefficient"&& <div className={" mb-3 text-right pr-3 mt-2"}>
                        <CustomButton buttonName={t("SAVE")} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                        <CustomButton buttonName={t("BACK_LINK")} ActionFunction={() => navigate("/configurations")} CustomStyle="mr-3"></CustomButton>
                    </div>} */}
                </div>
            </div>
        </div>
    )
}
