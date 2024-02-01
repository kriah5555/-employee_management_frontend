import React, { useEffect, useState } from "react";
import FormsNew from "../molecules/FormsNew";
import { t } from "../../translations/Translation";
import { GetFormattedDate } from "../../utilities/CommonFunctions";
import Table from "../atoms/Table";
import BackIcon from "../../static/icons/BackIcon.png"
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { GetDimonaApiUrl, GetDimonaDetailsApiUrl } from "../../routes/ApiEndPoints";


export default function DimonaOverview() {

    const [typeList, setTypeList] = useState([{ value: 'plan', label: 'Plan' }, { value: 'longterm', label: 'Long term' }]);
    const [selectedType, setSelectedType] = useState({ value: 'plan', label: 'Plan' });
    const [manageStatus, setManageStatus] = useState(true);
    const [manageListData, setManageListData] = useState([]);
    const [detailsListData, setDetailsListData] = useState({});
    const [detailsRows, setDetailsRows] = useState([]);

    let date_obj = new Date()
    let currentDate = GetFormattedDate(date_obj, date_obj.getFullYear())
    const [formattedData, setFormattedData] = useState({
        "from_date": currentDate,
        "to_date": currentDate,
        "type": 'plan'
    })

    const manage_header = [
        // {
        //     title: t("PLAN_DATE"),
        //     field: "plan_date",
        //     status: "200",
        // },
        {
            title: t("EMPLOYEE_NAME"),
            field: "name",
            status: "200",
        },
        {
            title: t("PLAN_START_TIME"),
            field: "start",
            status: "200",
        },
        {
            title: t("PLAN_END_TIME"),
            field: "end",
            status: "200",
        },
        {
            title: t("WORKING_TOO_LONG") + ' ?',
            field: "overtime",
            status: "200",
        },
        {
            title: t("EMPLOYEE_TYPE"),
            field: "employee_type",
            status: "200",
        },
        {
            title: t("DIMONA_PERIOD_ID"),
            field: "dimona_period_id",
            status: "200",
        },
        {
            title: t("DIMONA_STATUS"),
            field: "dimona_status",
            status: "200",
        },
    ]

    const detail_header = [
        {
            title: t("DIMONA_TYPE"),
            field: "dimona_type",
            status: "200",
        },
        {
            title: t("START_DATE_TIME"),
            field: "start_date_time",
            status: "200",
        },
        {
            title: t("EMPLOYEE_TYPE"),
            field: "employee_type",
            status: "200",
        },
        {
            title: t("IN_TIME"),
            field: "in_time",
            status: "200",
        },
        {
            title: t("OUT_TIME"),
            field: "out_time",
            status: "200",
        },
        {
            title: t("SHORT_BREAK"),
            field: "short_break",
            status: "200",
        },
        {
            title: t("ERROR_CODE"),
            field: "error_code",
            status: "200",
        },
        {
            title: t("DIMONA_STATUS"),
            field: "dimona_status",
            status: "200",
        },
        {
            title: t("REASON"),
            field: "reason",
            status: "200",
        },
    ]

    useEffect(() => {
        AXIOS.service(GetDimonaApiUrl, 'POST', formattedData)
            .then((result) => {
                if (result?.status || result?.success) {
                    // let arr = []
                    // result.data.map((val, i) => {
                    //     val['id'] = i
                    //     arr.push(val)
                    // })
                    setManageListData(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [formattedData])

    const manage_listData = [
        { id: 1, employee_name: 'Emp1', start_date_time: '18-01-2023 10:30', end_date_time: '18-01-2023 14:30', overtime: '', employee_type: 'Normal employee', dimona_status: 'green' },
        { id: 2, employee_name: 'Emp2', start_date_time: '18-01-2023 14:30', end_date_time: '18-01-2023 16:30', overtime: '', employee_type: 'Occasional employee', dimona_status: 'green' }
    ]

    const detail_listData = [
        { id: 1, dimona_type: 'DIMONA IN', dimona_period_id: '576467678', start_date_time: '18-01-2023 10:30', in_time: '10:25', out_time: '16:00', employee_type: 'Normal employee', short_break: '', error_code: '', dimona_status: 'green', reason: '' },
        { id: 2, dimona_type: 'DIMONA OUT', dimona_period_id: '8734556577', start_date_time: '18-01-2023 14:30', in_time: '14:35', out_time: '16:00', employee_type: 'Normal employee', short_break: '', error_code: '', dimona_status: 'green', reason: '' }
    ]

    const filterData = [
        { title: t("TYPE"), name: 'type', required: false, options: typeList, selectedOptions: selectedType, isMulti: false, type: 'dropdown', style: "col-md-3 float-left" },
        { title: t("FROM_DATE"), name: 'from_date', required: false, type: 'date', style: "col-md-3 float-left" },
        { title: t("TO_DATE"), name: 'to_date', required: false, type: 'date', style: "col-md-3 float-left" },
    ]

    const setValues = (index, name, value, field) => {
        let dimona_data = { ...formattedData }
        dimona_data[name] = value
        if (field !== 'dropdown') {
            dimona_data[name] = value
        } else {
            setSelectedType(value)
            dimona_data[name] = value.value
        }
        setFormattedData(dimona_data);
    }

    const viewAction = (data, action) => {

        setManageStatus(false)

        AXIOS.service(GetDimonaDetailsApiUrl + data?.id, 'POST')
            .then((result) => {
                if (result?.status || result?.success) {
                    let arr = []
                    result.data?.declarations.map((val, i) => {
                        val['id'] = i
                        arr.push(val)
                    })
                    setDetailsRows(arr);
                    setDetailsListData(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className="planning_body">
            {!manageStatus && <h4 className="pt-2 mb-0 px-2 bg-white"><img className="shortcut-icon mr-2 mb-1" onClick={() => setManageStatus(true)} src={BackIcon}></img>
                {t('DETAILED_OVERVIEW')}</h4>}
            <div className="bg-white my-1">
                {manageStatus && <FormsNew
                    view="filters"
                    formTitle={''}
                    formattedData={formattedData}
                    data={filterData}
                    SetValues={setValues}
                ></FormsNew>}

                {!manageStatus && <div className="col-md-12 py-3">
                    <div className="col-md-3 row m-0">
                        <label className="mb-0 font-weight-bold">{t("EMPLOYEE_NAME") + ':'}</label>
                        <p className="pl-2 mb-0">{detailsListData?.name}</p>
                    </div>
                    <div className="col-md-2 row mt-2 m-0">
                        <label className="mb-0 font-weight-bold">{t("WORKED_DATE") + ':'}</label>
                        <p className="pl-2 mb-0">{detailsListData?.dimona_sent_date}</p>
                    </div>
                    {/* 
                    <div className="col-md-2 row mt-2 m-0">
                        <label className="mb-0 font-weight-bold">{t("PLANNED_DATE") + ':'}</label>
                        <p className="pl-2 mb-0">{'18-01-2024'}</p>
                    </div>
                    <div className="col-md-3 row mt-2 m-0">
                        <label className="mb-0 font-weight-bold">{t("PLANNED_PERIOD") + ':'}</label>
                        <p className="pl-2 mb-0">{'10:30 to 16:00'}</p>
                    </div> */}
                </div>}
            </div>
            <div className="bg-white mt-1">
                <Table columns={manageStatus ? manage_header : detail_header} rows={manageStatus ? manageListData : detailsRows} tableName={manageStatus ? 'dimona_overview' : 'no_action_dimona'} viewAction={viewAction}></Table>
            </div>
        </div>
    )
}
