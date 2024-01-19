import React, { useEffect, useState } from "react";
import ModalPopup from "../../utilities/popup/Popup";
import { t } from "../../translations/Translation";
import Dropdown from "../atoms/Dropdown";
import DateInput from "../atoms/formFields/DateInput";
import Table from "../atoms/Table";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { GetDimonaPlansApiUrl, SendDimonaApiUrl } from "../../routes/ApiEndPoints";
import { toast } from "react-toastify";


export default function SendDimonaPopup({ setDimonaStatus, date, setDate, selectedLocation }) {

    const [listData, setListData] = useState([]);
    const [dimonaData, setDimonaData] = useState([]);
    const headers = [
        {
            title: t("EMPLOYEE_TITLE"),
            field: 'name',
            size: 200,
        },
        {
            title: t("PLAN_TIMINGS"),
            field: 'timings',
            size: 200,
        },
    ]

    useEffect(() => {
        let requestData = {
            "location_id": selectedLocation?.value,
            "date": date
        }
        AXIOS.service(GetDimonaPlansApiUrl, 'POST', requestData)
            .then((result) => {
                if (result?.success) {
                    setListData(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [date, selectedLocation])

    const SendDimona = () => {
        let plans = []
        dimonaData.map((val, i) => {
            plans.push(val.id)
        })
        let req_data = {
            "plans": plans,
        }
        AXIOS.service(SendDimonaApiUrl, 'POST', req_data)
            .then((result) => {
                if (result?.success) {
                    setDimonaStatus(false)
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
        <ModalPopup
            size="lg"
            title={t('SEND_DIMONA')}
            body={
                <div>
                    <DateInput
                        key={'date'}
                        title={'Date'}
                        name={'date'}
                        CustomStyle={'w-50 mb-2'}
                        value={date}
                        setValue={(e) => setDate(e)}
                    ></DateInput>
                    <Table tableName={'send_dimona'} columns={headers} rows={listData} setDimonaData={setDimonaData}></Table>
                </div>
            }
            onConfirm={() => SendDimona()}
            startplanButton={t('SEND')}
            onHide={() => { setDimonaStatus(false) }}
            close={true}
        ></ModalPopup>
    )
}
