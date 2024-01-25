import React, { useEffect, useState } from "react";
import LocationIcon from "../static/icons/Location.svg";
import CalendarIcon from "../static/icons/UurroosterCalendar.svg";
import BreakIcon from "../static/icons/Break.svg";
import DimonaSuccessIcon from "../static/icons/DimonaSuccess.svg";
import DimonaFailedIcon from "../static/icons/DimonaFail.svg";
import DimonaWarningIcon from "../static/icons/DimonaPending.svg";
import ExportIcon from "../static/icons/Export.svg";
import FilterIcon from "../static/icons/Filter.svg";
import LeaveIcon from "../static/icons/addLeave.svg";
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
import DateInput from "../components/atoms/formFields/DateInput";

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
    const [breakTime, setBreakTime] = useState('')

    const Months = [t("JANUARY"), t("FEBRUARY"), t("MARCH"), t("APRIL"), t("MAY"), t("JUNE"), t("JULY"), t("AUGUST"), t("SEPTEMBER"), t("OCTOBER"), t("NOVEMBER"), t("DECEMBER")]
    const [dayData, setDayData] = useState(currentDate.getDate() + ' ' + Months[currentDate.getMonth()] + ', ' + currentDate.getFullYear());
    const [date, setDate] = useState(new Date());
    const [dayDate, setDayDate] = useState(GetFormattedDate(currentDate, currentDate.getFullYear()));

    useEffect(() => {
        AXIOS.service(LocationApiUrl, 'GET')
            .then((res) => {
                setLocations(getFormattedDropdownOptions(res.data, 'id', 'location_name'))
                setSelectedLoc({ value: res.data?.[0]?.id, label: res.data?.[0]?.location_name })
            })
            .catch((error) => {
                console.log(error);
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
                    let resp = result.data
                    setQrcode(resp.qr_token);
                    let arr = []
                    let data = resp.planning_data
                    if (data.length !== 0) {
                        data.map((val, index) => {
                            val.plannings.map((employee, emp_index) => {
                                for (let i = 0; i < employee.count; i++) {
                                    if (emp_index === 0 && i === 0) {
                                        let design = {
                                            'workstation_name': val.workstation_name,
                                            'count': val.count,
                                            'employee_name': employee.employee_name,
                                            'function_name': employee?.function_name,
                                            'start_time': employee?.start_time,
                                            'count_2': employee?.count,
                                            'actual_start_time': employee?.actual_start_timings[i],
                                            'dimona_start': { status: employee?.start_dimona_status[i]?.status, message: employee?.start_dimona_status[i]?.message },
                                            'break_time': "12:00-14:00 \n13:00-13:30",
                                            'end_time': employee?.end_time,
                                            'actual_end_time': employee?.actual_end_timings[i],
                                            'dimona_end': { status: employee?.end_dimona_status[i]?.status, message: employee?.end_dimona_status[i]?.message[0] },
                                            'cost': employee?.cost,
                                            'leave': employee?.absence_status,
                                            'holiday_code': employee?.absence_holiday_codes
                                        }
                                        arr.push(design);
                                    } else if (emp_index !== 0 && i === 0) {
                                        let design = {
                                            'workstation_name': "",
                                            'count': "",
                                            'employee_name': employee.employee_name,
                                            'function_name': employee?.function_name,
                                            'start_time': employee?.start_time,
                                            'count_2': employee?.count,
                                            'actual_start_time': employee?.actual_start_timings[i],
                                            'dimona_start': { status: employee?.start_dimona_status[i]?.status, message: employee?.start_dimona_status[i]?.message },
                                            'break_time': '12:00-14:00',
                                            'end_time': employee?.end_time,
                                            'actual_end_time': employee?.actual_end_timings[i],
                                            'dimona_end': { status: employee?.end_dimona_status[i]?.status, message: employee?.end_dimona_status[i]?.message[0] },
                                            'cost': employee?.cost,
                                            'leave': employee?.absence_status,
                                            'holiday_code': employee?.absence_holiday_codes
                                        }
                                        arr.push(design);
                                    } else {
                                        let design = {
                                            'workstation_name': "",
                                            'count': "",
                                            'employee_name': "",
                                            'function_name': "",
                                            'start_time': "",
                                            'count_2': "",
                                            'actual_start_time': employee?.actual_start_timings[i],
                                            'dimona_start': { status: employee?.start_dimona_status[i]?.status, message: employee?.start_dimona_status[i]?.message },
                                            'break_time': '',
                                            'end_time': "",
                                            'actual_end_time': employee?.actual_end_timings[i],
                                            'dimona_end': { status: employee?.end_dimona_status[i]?.status, message: employee?.end_dimona_status[i]?.message[0] },
                                            'cost': "",
                                            'leave': employee?.absence_status,
                                            'holiday_code': employee?.absence_holiday_codes
                                        }
                                        arr.push(design);
                                    }


                                }
                            })
                        })
                        setPlanData(arr)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [dayDate, selectedLoc])


    // Next or previous arrow action
    const setNextPrev = (type) => {
        if (type === 'prev') {
            const [day, month, year] = dayDate.split('-');
            let date_obj = new Date(year, month - 1, day)
            const prevDate = new Date(date_obj);
            prevDate.setDate(date_obj.getDate() - 1);
            setDate(prevDate);
            setDayDate(GetFormattedDate(prevDate, prevDate.getFullYear()))
            setDayData(prevDate.getDate() + ' ' + Months[prevDate.getMonth()] + ', ' + prevDate.getFullYear())
        } else {
            const [day, month, year] = dayDate.split('-');
            let date_obj = new Date(year, month - 1, day)
            const nextDate = new Date(date_obj);
            nextDate.setDate(date_obj.getDate() + 1);
            setDayDate(GetFormattedDate(nextDate, nextDate.getFullYear()))
            setDate(nextDate)
            setDayData(nextDate.getDate() + ' ' + Months[nextDate.getMonth()] + ', ' + nextDate.getFullYear())
        }
    }

    useEffect(() => {
        const [day, month, year] = dayDate.split('-');
        let date_obj = new Date(year, month - 1, day)
        setDayData(date_obj.getDate() + ' ' + Months[date_obj.getMonth()] + ', ' + date_obj.getFullYear())
    }, [dayDate])


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
                            CustomStyle="col-md-8 my-2 px-0 mx-auto pointer"
                        ></Dropdown>
                        <div className="d-flex mt-1 border col-md-8 p-0 mx-auto">
                            <div className="button-style" onClick={() => setNextPrev('prev')}><img className="planning-icon pointer" src={LeftArrowIcon} alt={t("PREV_ARROW")}></img></div>
                            <DateInput
                                key={'calendar'}
                                title={''}
                                name={'date'}
                                CustomStyle={'w-100'}
                                value={dayDate}
                                setValue={(e) => setDayDate(e)}
                            ></DateInput>
                            <div className="button-style" onClick={() => setNextPrev('next')}><img className="planning-icon pointer" src={RightArrowIcon} alt={t("NEXT_ARROW")}></img></div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end">
                        <div className="float-left">
                            {/* <img className="mr-4 pointer" src={FilterIcon} alt={t("FILTER")} title={t("FILTER")}></img> */}
                            {/* <br></br> */}
                            <img className="mr-4 pointer disabled-icon" src={ExportIcon} alt={t("EXPORT")} title={t("EXPORT")} ></img>
                        </div>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "40%", width: "50%" }}
                            viewBox={`0 0 256 256`}
                            value={qrcode}
                        ></QRCode>
                    </div>
                </div>
                <div className="mt-3 uurrooster_table">
                    <table className="table table-bordered company-tab-width mx-auto">
                        <thead className="button-style uurrooster-table">
                            <tr>
                                <th rowspan="2">Workstations</th>
                                <th rowspan="2">Name</th>
                                <th rowspan="2">Function</th>
                                <th colspan="3">Start work</th>
                                <th rowspan="2">Pause</th>
                                <th colspan="3">End work</th>
                                <th rowspan="2">Total</th>
                            </tr>
                            <tr>
                                <th>Planning</th>
                                <th>Started</th>
                                <th>Dimona</th>
                                <th>Planning</th>
                                <th>Stopped</th>
                                <th>Dimona</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planData.map((val, index) => {
                                return (
                                    <tr>
                                        {val.workstation_name && <td rowspan={val.count}>{val.workstation_name}</td>}
                                        {val.employee_name && <td rowspan={val.count_2}>{val.employee_name}<div>{!val.absence_status && <img className="mt-1" title={val.holiday_code} src={LeaveIcon}></img>}</div></td>}
                                        {val.function_name && <td rowspan={val.count_2}>{val.function_name}</td>}
                                        {val.start_time && <td rowspan={val.count_2}>{val.start_time}</td>}
                                        {<td>{val.actual_start_time}</td>}
                                        {<td>{![null, undefined].includes(val.dimona_start?.status) && <img title={val.dimona_start?.message} src={val.dimona_start?.status === 'success' ? DimonaSuccessIcon : val.dimona_start?.status === 'warning' ? DimonaWarningIcon : val.dimona_start?.status === 'failed' ? DimonaFailedIcon : ''}></img>}</td>}
                                        {val.break_time && <td rowspan={val.count_2}><img src={BreakIcon} title={val.break_time}></img></td>}
                                        {val.end_time && <td rowspan={val.count_2}>{val.end_time}</td>}
                                        {<td>{val.actual_end_time}</td>}
                                        {<td>{![null, undefined].includes(val.dimona_end?.status) && <img title={val.dimona_end?.message} src={val.dimona_end?.status === 'success' ? DimonaSuccessIcon : val.dimona_end?.status === 'warning' ? DimonaWarningIcon : val.dimona_end?.status === 'failed' ? DimonaFailedIcon : ''}></img>}</td>}
                                        {val.cost && <td rowspan={val.count_2}>{val.cost}</td>}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
