import React, { useEffect, useState } from "react";
import TimeIcon from "../../static/icons/Time.svg";
import CostIcon from "../../static/icons/Euro.svg";
import ContractHoursIcon from "../../static/icons/Contract.svg";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { GetAvailabilitiesApiUrl, GetEmployeeLeavesApiUrl } from "../../routes/ApiEndPoints";
import EmployeeType_icon from "../../static/icons/EmployeeType_icon";
import Dropdown from "../atoms/Dropdown";
import LeaveIcon from "../../static/icons/addLeave.svg";
import FlagIcon from "../../static/icons/belgium.svg";
import AddLeavePopup from "./AddLeavePopup";
import { t } from "../../translations/Translation";


export default function PlanItem({ PlansData, Dates, openCreatePlanPopup, wid, ws_emp_index, weekNumber, year, availableSwitch, ws_employee, employeeList }) {


    const [data, setData] = useState([])
    const [employee, setEmployee] = useState();
    const [leaveData, setLeaveData] = useState({});
    const [leavePopup, setLeavePopup] = useState(false);
    const [updateLeaveData, setUpdateLeaveData] = useState({})


    const availableStyle = "py-2 px-0 height-10 planning-position shadow-sm background-green"
    const unAvailableStyle = "py-2 px-0 height-10 planning-position shadow-sm background-red"
    const style = "py-2 px-0 height-10 planning-position shadow-sm"

    useEffect(() => {
        let request_data = {
            "week": weekNumber,
            "year": year,
        }
        if (availableSwitch) {
            AXIOS.service(GetAvailabilitiesApiUrl, 'POST', request_data)
                .then((result) => {
                    if (result?.success) {
                        setData(result.data[ws_employee.employee_id ? ws_employee.employee_id : employee]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setData([])
        }
    }, [availableSwitch, employee, weekNumber, year])

    // useEffect(() => {
    //     let request_data = {
    //         "week": weekNumber,
    //         "year": year,
    //         "employee_profile_id": employee ? employee.value : ws_employee.employee_id,
    //     }
    //     AXIOS.service(GetEmployeeLeavesApiUrl, 'POST', request_data)
    //         .then((result) => {
    //             if (result?.success) {
    //                 setLeaveData(result.data)
    //                 // setData(result.data[ws_employee.employee_id ? ws_employee.employee_id : employee]);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     // } else {
    //     //     setData([])

    // }, [employee, weekNumber, year])


    const GetLeave = (e, data) => {
        e.stopPropagation();
        console.log('check');
        setLeavePopup(true);
        let leave_data = {
            "employee_profile_id": data?.employee?.value,
            "duration_type": data?.duration_type,
            "dates": data?.dates,
            "reason": data?.reason,
            "holiday_code_id": data?.holiday_code_counts[0]?.holiday_code_id,
            "plan_ids": data?.plan_ids
        }
        setUpdateLeaveData(data);
    }


    return (
        <>
            {leavePopup && <AddLeavePopup buttonName={t("CANCEL")} setAddLeave={setLeavePopup} addLeave={leavePopup} updateLeaveData={updateLeaveData}></AddLeavePopup>}
            <td>{ws_employee.employee_id ? <a className="text-dark text-truncate plannign_overview_weekly_employee_title" href={"/manage-employees/" + ws_employee.employee_id} title={ws_employee.employee_name}>{ws_employee.employee_name}</a> : ws_employee.employee_name}

                {ws_employee.status === undefined ? <div> {ws_employee.employee_id && ws_employee.employee_types !== null && ws_employee.employee_types !== undefined && Object.keys(ws_employee.employee_types).length !== 0 &&
                    //mapping employeetype and its colour
                    Object.keys(ws_employee.employee_types).map((key, index) => {
                        return (
                            <span key={index} title={key}><EmployeeType_icon IconColour={ws_employee.employee_types[key] ? ws_employee.employee_types[key] : " #61bfb5"} /></span>
                        )
                    })
                }</div> :
                    <Dropdown options={employeeList} onSelectFunction={(e) => setEmployee(e.value)}></Dropdown>}
            </td>

            {Dates.map((date) => {
                return (
                    <td key={date} className={data?.available?.includes(date) ? availableStyle : data?.not_available?.includes(date) ? unAvailableStyle : style} onClick={() => openCreatePlanPopup(ws_employee.employee_id ? ws_employee.employee_id : employee, date, wid, PlansData, ws_emp_index)}>
                        {PlansData[date] && <>
                            {PlansData[date]['planning'].map((plan) => {
                                return (
                                    <small key={plan.plan_id} className={plan.timings && "row m-0 pb-1 px-2 border-bottom"}>
                                        {plan.timings && <img src={TimeIcon} className="plan-icon mr-2"></img>}
                                        {plan.timings}
                                    </small>
                                )
                            })}
                            <div className="d-flex mt-3 justify-content-between px-2">
                                {PlansData[date].cost !== null && <small className="cost-position">
                                    <img src={CostIcon} className="plan-icon mr-1"></img>
                                    {PlansData[date].cost}
                                </small>}
                                {/* {leaveData[date] && leaveData[date]?.leaves?.length !== 0 && <img className="my-auto header-icon leave-position" src={LeaveIcon} onClick={(e) => GetLeave(e, leaveData[date]?.leaves[0])}></img>}
                                {leaveData[date] && leaveData[date]?.public_holiday?.length !== 0 && <img className="my-auto header-icon leave-position" src={FlagIcon}></img>} */}
                                {PlansData[date].contract_hours && <small className="contract-hours-pos">
                                    <img src={ContractHoursIcon} className="plan-icon mr-1"></img>
                                    {PlansData[date].contract_hours}
                                </small>}
                            </div>
                        </>}
                    </td>
                )
            })}
        </>
    )
}
