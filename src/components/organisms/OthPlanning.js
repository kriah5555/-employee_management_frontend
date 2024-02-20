import React, { useEffect, useState } from "react";
import { t } from "../../translations/Translation";
import BackIcon from "../../static/icons/BackIcon.png"
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { CreateOthPlanApiUrl, GetAllOthPlansApiUrl, GetOthPlansApiUrl } from "../../routes/ApiEndPoints";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../atoms/Table";
import ModalPopup from "../../utilities/popup/Popup";
import AddOthPlans from "./AddOthPlans";



export default function OthPlanning() {

    let params = useParams();
    const navigate = useNavigate()
    const [listData, setListData] = useState([]);
    const [deleteUrl, setDeleteUrl] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [dataRefresh, setDataRefresh] = useState(false);
    const [createstate, setCreatestate] = useState(false);
    const [objectId, setObjectId] = useState('');


    useEffect(() => {
        let ApiUrl = GetAllOthPlansApiUrl
        if (params.eid) {
            ApiUrl = GetOthPlansApiUrl + params.eid
        }
        AXIOS.service(ApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    // setDataRefresh(!dataRefresh);
                    // setWarningMessage('')
                    setListData(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [dataRefresh, createstate, params.eid])

    const headers = [
        {
            title: t("EMPLOYEE_TITLE"),
            field: 'employee_name',
            size: 200,
        },
        {
            title: t("LOCATION_TITLE"),
            field: 'location.label',
            size: 200,
        },
        {
            title: t("WORK_STATION"),
            field: 'workstation.label',
            size: 200,
        },
        {
            title: t("FUNCTION_TITLE"),
            field: 'function.label',
            size: 200,
        },
        {
            title: t("START_DATE"),
            field: 'start_date',
            size: 200,
        },
        {
            title: t("END_DATE"),
            field: 'end_date',
            size: 200,
        },
    ];

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

    const viewAction = (data, action) => {
        if (action === 'edit') {
            if (params?.eid === undefined) {
                setCreatestate(true)
                setObjectId(data.id)
            } else {
                navigate('/update-oth-plans/' + params.eid + '/' + data.id)
            }
        } else {
            setDeleteUrl(CreateOthPlanApiUrl + '/' + data.id)
            setWarningMessage(t('DELETE_OTH_WARNING'))
        }
    }


    return (
        <>
            {!createstate && <div className={params?.eid ? "right-container" : "col-md-12 p-0"}>
                <div className={params?.eid ? "company-tab-width mt-3" : "col-md-12 p-0 mt-1"}>
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
                        close={true}
                    ></ModalPopup>}
                    <div className="d-flex justify-content-between bg-white my-2 py-2 align-items-center">
                        <h4 className=" px-3 bg-white">{params?.eid && <img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-employees/' + params.eid)} src={BackIcon} alt="Back"></img>}
                            {t('OTH_TITLE')}</h4>
                        {params?.eid && <a className="my-auto px-3 bg-white mb-0 text-color" href={"/create-oth-plans/" + params.eid}>{t('CREATE_OTH')}</a>}
                        {params?.eid === undefined && <a className="btn button-style mx-2 add_btn" onClick={() => setCreatestate(true)}>{t('CREATE_OTH')}</a>}
                    </div>
                    <Table columns={headers} rows={listData} tableName={'workstation'} viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
                </div>
            </div >}
            {createstate && <AddOthPlans setCreatestate={setCreatestate} objectId={objectId}></AddOthPlans>}
        </>
    )
}
