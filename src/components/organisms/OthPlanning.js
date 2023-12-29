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



export default function OthPlanning() {

    let params = useParams();
    const navigate = useNavigate()
    const [listData, setListData] = useState([]);

    useEffect(() => {
        AXIOS.service(GetOthPlansApiUrl + params.id, 'GET')
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
    }, [])

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

    const viewAction = () => {

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
                <div className="d-flex justify-content-between bg-white">
                    <h4 className="py-2 px-3 bg-white"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-employees/'+ params.id)} src={BackIcon}></img>
                        Oth auto planning</h4>
                    <a className="my-auto px-3 bg-white mb-0" href={"/create-oth-plans/" + params.id}>Create oth plans</a>
                </div>
                <Table columns={headers} rows={listData} tableName={'location'} viewAction={viewAction} height={'calc(100vh - 150px)'}></Table>
            </div>
        </div >
    )
}
