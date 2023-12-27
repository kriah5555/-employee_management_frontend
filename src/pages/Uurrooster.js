import React, { useEffect, useState } from "react";
import LocationIcon from "../static/icons/Location.svg";
import CalendarIcon from "../static/icons/UurroosterCalendar.svg";
import QrcodeIcon from "../static/icons/UurroosterQrcode.svg";
import ExportIcon from "../static/icons/Export.svg";
import FilterIcon from "../static/icons/Filter.svg";
import RedIcon from "../static/icons/RedDot.svg";
import LeftArrowIcon from "../static/icons/LeftArrow.png";
import RightArrowIcon from "../static/icons/RightArrow.png";
import Dropdown from "../components/atoms/Dropdown";
import { APICALL as AXIOS } from "../services/AxiosServices";
import { LocationApiUrl, UurroosterApiUrl } from "../routes/ApiEndPoints";
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";
import { GetFormattedDate, getFormattedDropdownOptions } from "../utilities/CommonFunctions";
import QRCode from "react-qr-code";
import { t } from "../translations/Translation";

export default function Uurrooster() {

    const head_arr = [
        { label: t("WS_TITLE"), colSpan: 0 },
        { label: t("EMPLOYEE_TITLE"), colSpan: 0 },
        { label: t("FUNCTION_TITLE"), colSpan: 0 },
        { label: t("START_WORK_TITLE"), colSpan: 3 },
        { label: t("PAUSE_TITLE"), colSpan: 0 },
        { label: t("END_WORK_TITLE"), colSpan: 3 },
        { label: t("TOTAL_TITLE"), colSpan: 0 },
    ]

    const [planData, setPlanData] = useState([]);

    const [locations, setLocations] = useState([]);
    const [selectedLoc, setSelectedLoc] = useState();
    const [qrcode, setQrcode] = useState('');
    const currentDate = new Date();

    const Months = [t("JANUARY"), t("FEBRUARY"), t("MARCH"), t("APRIL"), t("MAY"), t("JUNE"), t("JULY"), t("AUGUST"), t("SEPTEMBER"), t("OCTOBER"), t("NOVEMBER"), t("DECEMBER")]
    const [dayData, setDayData] = useState(currentDate.getDate() + ' ' + Months[currentDate.getMonth()] + ', ' + currentDate.getFullYear());
    const [date, setDate] = useState(new Date());
    const [dayDate, setDayDate] = useState(GetFormattedDate(currentDate, currentDate.getFullYear()));

    useEffect(() => {
        AXIOS.service(LocationApiUrl, 'GET')
            .then((res) => {
                setLocations(getFormattedDropdownOptions(res.data, 'id', 'location_name'))
                setSelectedLoc({ value: res.data?.[0]?.id, label: res.data?.[0]?.location_name })
                let uurroosterData = [
                    {
                        'workstation_name': '',
                        'employee_name': '',
                        'function_name': '',
                        'plan_start': t("PLANNING_TITLE"),
                        'start_time': t("STARTED_TITLE"),
                        'dimona_start': t("DIMONA"),
                        'pause': '',
                        'plan_end': t("PLANNING_TITLE"),
                        'end_time': t("STOPPED_TITLE"),
                        'dimona_end': t("DIMONA"),
                        'cost': t("COST_TITLE")
                    }
                ]
                setPlanData(uurroosterData)
            })
    }, [])

    useEffect(() => {
        let data = {
            "location_id": selectedLoc?.value,
            "date": dayDate
        }

        AXIOS.service(UurroosterApiUrl, 'POST', data)
            .then((result) => {
                if (result.success) {
                    let uurroosterData = [
                        {
                            'workstation_name': '',
                            'employee_name': '',
                            'function_name': '',
                            'plan_start': t("PLANNING_TITLE"),
                            'start_time': t("STARTED_TITLE"),
                            'dimona_start': t("DIMONA"),
                            'pause': '',
                            'plan_end': t("PLANNING_TITLE"),
                            'end_time': t("STOPPED_TITLE"),
                            'dimona_end': t("DIMONA"),
                            'cost': t("COST_TITLE")
                        }
                    ]
                    let resp = result.data
                    setQrcode(resp.qr_token);
                    resp.planning_data.map((val, i) => {
                        // let obj = {}
                        // obj['workstation_name'] = val.workstation_name
                        // val.plannings.map((arr_data, i) => {
                        // obj['employee_name'] = arr_data?.employee_name
                        // obj['function_name'] = arr_data?.function_name
                        // obj['plan_start'] = arr_data?.start_time
                        // obj['start_time'] = arr_data?.actual_start_timings[0]
                        // obj['dimona_start'] = arr_data?.start_dimona_status[0]
                        // obj['pause'] = arr_data?.break_timings[0]
                        // obj['plan_end'] = arr_data?.end_time
                        // obj['end_time'] = arr_data?.actual_end_timings[0]
                        // obj['dimona_end'] = arr_data?.end_dimona_status[0]
                        // obj['cost'] = arr_data?.cost
                        // uurroosterData.push(obj);
                        // })

                        val.plannings.map((arr_data, i) => {
                            if (arr_data?.actual_start_timings?.length >= 1) {
                                arr_data?.actual_start_timings.map((value, j) => {
                                    if (j === 0) {
                                        let extra_obj = {
                                            'workstation_name': i == 0 ? val.workstation_name : '',
                                            'employee_name': j === 0 ? arr_data?.employee_name : '',
                                            'function': j === 0 ? arr_data?.function_name : '',
                                            'plan_start': j === 0 ? arr_data?.start_time : '',
                                            'start_time': arr_data?.actual_start_timings[j],
                                            'dimona_start': arr_data?.start_dimona_status[j],
                                            'pause': arr_data?.break_timings[j],
                                            'plan_end': j === 0 ? arr_data?.end_time : '',
                                            'end_time': arr_data?.actual_end_timings[j],
                                            'dimona_end': arr_data?.end_dimona_status[j],
                                            'cost': j === 0 ? arr_data?.cost : ''
                                        }
                                        uurroosterData.push(extra_obj);
                                    }
                                })
                            } else {
                                let extra_obj = {
                                    'workstation_name': val.workstation_name,
                                    'employee_name': arr_data?.employee_name,
                                    'function_name': arr_data?.function_name,
                                    'plan_start': '',
                                    'start_time': '',
                                    'dimona_start': '',
                                    'pause': '',
                                    'plan_end': '',
                                    'end_time': '',
                                    'dimona_end': '',
                                    'cost': ''
                                }
                                uurroosterData.push(extra_obj);

                            }
                        })

                    })
                    setPlanData(uurroosterData)
                }
            })
    }, [dayDate, selectedLoc])


    // Next or previous arrow action
    const setNextPrev = (type) => {
        if (type === 'prev') {
            const prevDate = new Date(date);
            prevDate.setDate(date.getDate() - 1);
            setDate(prevDate);
            setDayDate(GetFormattedDate(prevDate, prevDate.getFullYear()))
            setDayData(prevDate.getDate() + ' ' + Months[prevDate.getMonth()] + ', ' + prevDate.getFullYear())
        } else {
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            setDayDate(GetFormattedDate(nextDate, nextDate.getFullYear()))
            setDate(nextDate)
            setDayData(nextDate.getDate() + ' ' + Months[nextDate.getMonth()] + ', ' + nextDate.getFullYear())
        }
    }


    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <div className="col-md-12 d-flex mt-4">
                    <div className="col-md-3">
                        <p className=""><img className="mr-2 planning-icon" src={LocationIcon} alt={t("LOCATION_TITLE")}></img>{selectedLoc?.label}</p>
                        <p className=""><img className="mr-2 planning-icon" src={CalendarIcon} alt={t("CALENDAR")}></img>{dayData}</p>
                        <img className="" src={RedIcon} alt={t("ICON")}></img>
                    </div>
                    <div className="col-md-6">
                        <p className="text-center mb-0 font-weight-bold">{t("SELECT_LOCATION")}</p>
                        <Dropdown
                            options={locations}
                            selectedOptions={selectedLoc}
                            onSelectFunction={(e) => setSelectedLoc(e)}
                            CustomStyle="col-md-8 my-2 px-0 mx-auto"
                        ></Dropdown>
                        <div className="d-flex mt-1 border col-md-8 p-0 mx-auto">
                            <div className="button-style mr-5" onClick={() => setNextPrev('prev')}><img className="planning-icon" src={LeftArrowIcon} alt={t("PREV_ARROW")}></img></div>
                            <p className="monthText mx-auto my-auto">{dayData}</p>
                            <div className="button-style ml-5" onClick={() => setNextPrev('next')}><img className="planning-icon" src={RightArrowIcon} alt={t("NEXT_ARROW")}></img></div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end">
                        <div className="float-left">
                            <img className="mr-4" src={FilterIcon} alt={t("FILTER")} title={t("FILTER")}></img>
                            <br></br>
                            <img className="mr-4 mt-4" src={ExportIcon} alt={t("EXPORT")} title={t("EXPORT")}></img>
                        </div>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "40%", width: "50%" }}
                            viewBox={`0 0 256 256`}
                            value={qrcode}
                        ></QRCode>
                    </div>
                </div>
                <table className="table table-bordered company-tab-width mt-3 mx-auto bg-right-container">
                    <thead>
                        <tr>
                            {head_arr.map((title, index) => {
                                return (
                                    <th key={title.label} className={"text-center"} colSpan={title.colSpan}>{title.label}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {planData.map((val, index) => {
                            return (
                                <tr key={val.workstation_id}>
                                    <td className="text-center">{val.workstation_name}</td>
                                    <td className="text-center">{val.employee_name}</td>
                                    <td className="text-center">{val.function_name}</td>
                                    <td className="text-center">{val.plan_start}</td>
                                    <td className="text-center">{val.start_time}</td>
                                    <td className="text-center">{val.dimona_start}</td>
                                    <td className="text-center">{val.pause}</td>
                                    <td className="text-center">{val.plan_end}</td>
                                    <td className="text-center">{val.end_time}</td>
                                    <td className="text-center">{val.dimona_end}</td>
                                    <td className="text-center">{val.cost}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
