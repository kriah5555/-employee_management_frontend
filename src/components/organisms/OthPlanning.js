import React, { useEffect, useState } from "react";
import FormsNew from "../molecules/FormsNew";
import { t } from "../../translations/Translation";
import CustomButton from "../atoms/CustomButton";
import Switch from "../atoms/Switch";
import BackIcon from "../../static/icons/BackIcon.png"
import OthPlanForm from "../molecules/OthPlanForm";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { CreateOthPlanApiUrl, GetOthPlansApiUrl } from "../../routes/ApiEndPoints";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../atoms/Table";
import ModalPopup from "../../utilities/popup/Popup";



export default function OthPlanning() {

    let params = useParams();
    const navigate = useNavigate()
    const [listData, setListData] = useState([]);
    const [deleteUrl, setDeleteUrl] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [dataRefresh, setDataRefresh] = useState(false);



    useEffect(() => {
        AXIOS.service(GetOthPlansApiUrl + params.eid, 'GET')
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
    }, [dataRefresh])

    const headers = [
        {
            title: 'Location',
            field: 'location.label',
            size: 200,
        },
        {
            title: 'Workstation',
            field: 'workstation.label',
            size: 200,
        },
        {
            title: 'Function',
            field: 'function.label',
            size: 200,
        },
        {
            title: 'Start date',
            field: 'start_date',
            size: 200,
        },
        {
            title: 'End date',
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
            navigate('/update-oth-plans/' + params.eid + '/' + data.id)
        } else {
            setDeleteUrl(CreateOthPlanApiUrl + '/' + data.id)
            setWarningMessage(t('DELETE_OTH_WARNING'))
        }
    }


    return (
        <div className="right-container">
            <div className="company-tab-width mt-3">
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
                <div className="d-flex justify-content-between bg-white">
                    <h4 className="py-2 px-3 bg-white"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-employees/' + params.eid)} src={BackIcon}></img>
                        {t('OTH_TITLE')}</h4>
                    <a className="my-auto px-3 bg-white mb-0" href={"/create-oth-plans/" + params.eid}>{t('CREATE_OTH')}</a>
                </div>
                <Table columns={headers} rows={listData} tableName={'location'} viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
            </div>
        </div >
    )
}
