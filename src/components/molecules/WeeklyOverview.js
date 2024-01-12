import React, { useEffect, useState } from "react";
import { GetReversedDate, GetTimeDifference, getDatesForWeek, getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
// import WorkStationIcon from "../../static/icons/Workstation.svg";
import { t } from "../../translations/Translation";
import DeleteIcon from "../../static/icons/Delete.svg";
import CostIcon from "../../static/icons/Euro.svg";
import ContractHoursIcon from "../../static/icons/Contract.svg";
import EditShiftIcon from "../../static/icons/EditShift.png";
import Dropdown from "../atoms/Dropdown";
import PlanItem from "./PlanItem";
import CreatePlanPopup from "./CreatePlanPopup";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { DeleteWeekPlans, GetEmployeeOptionsApiUrl, GetWeeklyPlanningApiUrl, CreateShiftsApiUrl, CreateShiftPlanApiUrl, GetEmployeeWeekPlansApiUrl } from "../../routes/ApiEndPoints";
import { ToastContainer, toast } from 'react-toastify';
import ModalPopup from "../../utilities/popup/Popup";
import CreateShifts from "./CreateShifts";
import Workstation from "../../static/icons/Workstation";
import EmployeeType_icon from "../../static/icons/EmployeeType_icon";


export default function WeeklyOverview({ enableShifts, weekNumber, year, locId, wsIds, EmpTypeIds, ChangeTab, availableSwitch }) {

    // Const for days
    const days = [t('MONDAY'), t('TUESDAY'), t('WEDNESDAY'), t('THURSDAY'), t('FRIDAY'), t('SATURDAY'), t('SUNDAY')]
    const dates = getDatesForWeek(weekNumber, year)
    const [weekData, setWeekData] = useState([]);
    const [planPopup, setPlanPopup] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeId, setEmployeeId] = useState({});
    const [planningDate, setPlanningDate] = useState();
    const [planWid, setPlanWid] = useState();
    const [planningDetails, setPlanningDetails] = useState([]);
    const [dropDownData, setDropDownData] = useState({});
    const [updatePlan, setUpdatePlan] = useState(false)
    const [dataRefresh, setDataRefresh] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [deleteRequestData, setDeleteRequestData] = useState({});
    const [totalData, setTotalData] = useState({});
    const [createIndex, setCreateIndex] = useState()
    const [newEmployeeStatus, seNewEmployeeStatus] = useState(false);

    const [shiftPopupOpen, setShiftPopupOpen] = useState(false);
    const [shiftId, setShiftId] = useState('');
    const [shiftData, setShiftData] = useState({
        'location_id': '',
        'workstation_id': '',
        'shifts': []
    })


    const setEmployee = (wid, index, eid) => {
        let employee_ids = { ...employeeId }
        if (employee_ids[wid] !== undefined) {
            employee_ids[wid][index] = eid
        } else {
            employee_ids[wid] = {}
            employee_ids[wid][index] = eid
        }
        setEmployeeId(employee_ids)
    }


    useEffect(() => {
        let request_Data = {
            "week_number": weekNumber,
            "year": year
        }
        let employees
        AXIOS.service(GetEmployeeOptionsApiUrl, 'POST', request_Data)
            .then((result) => {
                if (result?.success) {
                    employees = result.data
                    setEmployeeList(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })

        // Setting the weekly plans data
        let requestData = {
            'location': locId,
            'workstations': wsIds,
            'employee_types': EmpTypeIds,
            'week': weekNumber,
            'year': year
        }

        AXIOS.service(GetWeeklyPlanningApiUrl, 'POST', requestData)
            .then((result) => {
                if (result?.success) {
                    // setWeekData(result.data);

                    let arr = []
                    result.data.workstation_data.map((val, i) => {
                        if (val.employee.length === 0) {
                            val.employee = [{
                                employee_name: <Dropdown options={employees} onSelectFunction={(e) => setEmployee(val.workstation_id, 0, e.value)}></Dropdown>,
                                status: true,
                                total: '',
                                plans: [{ data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }]
                            }]
                            arr.push(val)
                        } else {
                            arr.push(val)
                        }
                    })
                    setWeekData(arr)
                    setTotalData(result.data.total)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [dataRefresh, weekNumber, locId])

    const GetEmployeePlans = (eid, ws) => {
        let requestData = {
            'location': locId,
            'workstations': wsIds,
            'employee_types': EmpTypeIds,
            'week': weekNumber,
            'year': year,
            'employee_profile_id': eid
        }

        AXIOS.service(GetEmployeeWeekPlansApiUrl, 'POST', requestData)
            .then((result) => {
                if (result?.success) {
                    // setWeekData(result.data);
                    let week_data = [...weekData]
                    week_data.map((val, i) => {
                        if (val.workstation_id === ws) {
                            let employees = [...val.employee]
                            if (employees?.length === 0) {
                                employees.push(result.data)
                                val.employee = employees
                            } else {
                                employees.map((empData, j) => {
                                    if (empData.employee_id !== undefined) {
                                        if (empData.employee_id === eid) {
                                            employees[j] = result.data
                                            val.employee = employees
                                        }
                                    } else {
                                        console.log(employeeId);
                                        if (employees?.length > 1 && employeeId[ws][j + 1] === eid) {
                                            employees[j] = result.data
                                            val.employee = employees
                                        } else if (employees?.length === 1 && employeeId[ws][j] === eid) {
                                            employees[j] = result.data
                                            val.employee = employees
                                        }
                                    }
                                })
                            }
                        }
                    })
                    setWeekData(week_data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function to add new row for adding new employee
    const addNewRow = (wid, weekArrData, empIndex) => {
        let week_arr = weekArrData.length === 0 ? [...weekData] : [...weekArrData]
        week_arr.map((data, index) => {
            if (data.workstation_id === wid) {
                let data_arr = { ...data }
                let emp_arr = [...data.employee]
                emp_arr.push({
                    employee_name: <Dropdown options={employeeList} onSelectFunction={(e) => setEmployee(wid, emp_arr.length, e.value)}></Dropdown>,
                    status: true,
                    total: '',
                    plans: [{ data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }]
                })
                data_arr.employee = emp_arr
                week_arr[index] = data_arr
            }
        })
        setWeekData(week_arr)
    }

    const DeleteApiCall = () => {
        let week_arr = [...weekData]
        weekData.map((data, index) => {
            if (data.workstation_id === deleteRequestData.workstation_id) {
                let data_arr = { ...data }
                let emp_arr = [...data.employee]
                emp_arr.splice(deleteRequestData.row_index, 1)
                data_arr.employee = emp_arr
                week_arr[index] = data_arr
            }
        })
        setWeekData(week_arr)

        AXIOS.service(DeleteWeekPlans, 'POST', deleteRequestData)
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

    // Function to delete plan row for adding new employee
    const removeRow = (wid, row_index, eid, plans) => {
        if (!plans.status) {
            let requestData = {
                "employee_id": eid,
                "location_id": locId,
                "workstation_id": wid,
                "week": weekNumber,
                "year": year,
                "row_index": row_index,
            }

            setWarningMessage(t("WEEK_PLANNINGS_DELETE"))
            setDeleteRequestData(requestData);

        } else if (row_index !== 0) {

            let week_arr = [...weekData]
            weekData.map((data, index) => {
                if (data.workstation_id === wid) {
                    let data_arr = { ...data }
                    let emp_arr = [...data.employee]
                    emp_arr.splice(row_index, 1)
                    data_arr.employee = emp_arr
                    week_arr[index] = data_arr
                }
            })
            setWeekData(week_arr)
        }
    }

    // Function to return total data element
    const getTotalData = (index, data) => {
        return (
            <td key={data?.cost} className={index === 7 ? " border-0" : "px-2"}>
                <div className="d-flex justify-content-between">
                    <small>{data?.cost && <img src={CostIcon} alt="cost" className="plan-icon mr-1"></img>}{data?.cost}</small>
                    <small>{data?.contract_hours && <img src={ContractHoursIcon} alt="contract hour" className="plan-icon mr-1"></img>}{data?.contract_hours}</small>
                </div>
            </td>
        )
    }

    const openCreatePlanPopup = (emp_id, date, ws, planData, ws_emp_index) => {
        let eid = emp_id

        if (eid === undefined) {
            eid = employeeId[ws][ws_emp_index + 1]
            setCreateIndex(ws_emp_index + 1)
        } else {
            setEmployee(ws, ws_emp_index, emp_id)
            setCreateIndex(ws_emp_index)
        }

        if (eid) {
            if (enableShifts) {
                if (shiftId) {
                    let reqData = {
                        "employee_id": eid,
                        "location_id": locId,
                        "workstation_id": ws,
                        "shift_id": shiftId?.value,
                        "date": date
                    }
                    AXIOS.service(CreateShiftPlanApiUrl, 'POST', reqData)
                        .then((result) => {
                            if (result?.success) {
                                if (result.plan_created) {
                                    // setDataRefresh(!dataRefresh);
                                    GetEmployeePlans(eid, ws)
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
                                } else {
                                    setPlanPopup(true);
                                    let [start, end] = shiftId?.label.split('-')
                                    let contract_hr = GetTimeDifference(start, end)
                                    if (planData[date]) {
                                        planData[date]['planning'] = [{ 'start_time': start, 'end_time': end, 'contract_hours': contract_hr }]
                                    } else {
                                        planData[date] = {}
                                        planData[date]['planning'] = [{ 'start_time': start, 'end_time': end, 'contract_hours': contract_hr }]
                                    }
                                    setPlanningDetails(planData[date]['planning'])
                                }
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                } else {
                    toast.error('Please select shifts to add plan', {
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
            } else {
                setPlanPopup(true);
            }
        }

        setPlanningDate(date)
        setPlanWid(ws);

        if (planData && planData[date] !== undefined) {
            setDropDownData({
                'employee_type': planData[date]['employee_type'],
                'function': planData[date]['function']
            })
            planData[date]['planning'].map((val) => {
                val['start_time'] = val.timings.split(' ')[0]
                val['end_time'] = val.timings.split(' ')[1]
            })
        }
        setPlanningDetails(planData && planData[date] !== undefined ? planData[date]['planning'] : [])
        setUpdatePlan(planData && planData[date] !== undefined ? true : false)
    }

    const SaveShift = () => {
        AXIOS.service(CreateShiftsApiUrl, 'POST', shiftData)
            .then((result) => {
                if (result?.success) {
                    setDataRefresh(!dataRefresh);
                    setShiftPopupOpen(false)
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
        <div className="col-md-12 p-0 text-center panning_overview_table">
            {warningMessage && <ModalPopup
                title={t("WARNING_TITLE")}
                body={(warningMessage)}
                onConfirm={DeleteApiCall}
                onHide={() => setWarningMessage('')}
            ></ModalPopup>}
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
            {shiftPopupOpen && <CreateShifts setShiftPopupOpen={setShiftPopupOpen} setShiftData={setShiftData} shiftData={shiftData} SaveShift={SaveShift}></CreateShifts>}
            {planPopup && <CreatePlanPopup setPlanPopup={setPlanPopup} wid={planWid} enableShift={enableShifts} employeeId={employeeId[planWid] !== undefined ? employeeId[planWid][createIndex] : ''} planningDate={planningDate} locId={locId} planData={planningDetails} dropDownData={dropDownData} updatePlan={updatePlan} dataRefresh={dataRefresh} setDataRefresh={setDataRefresh} GetEmployeePlans={GetEmployeePlans}></CreatePlanPopup>}
            <table className="table table-bordered mb-0 Overview_table_workstation">
                <thead className="sticky">
                    <tr>
                        <th><span><Workstation /></span></th>
                        <th className="py-4 ">{t("EMPLOYEES_TITLE")}</th>
                        {days.map((val, index) => {
                            return (
                                <th key={val} onClick={() => ChangeTab('day', new Date(GetReversedDate(dates[index])))}>
                                    <div>{val}</div>
                                    <div>{dates[index]}</div>
                                </th>
                            )
                        })}
                        <th className="py-4">{t("TOTAL_TITLE")}</th>
                        <th className="py-4">{t("ACTIONS")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        weekData.map((ws, index) => {
                            return (
                                ws.employee.map((ws_employee, ws_emp_index) => {
                                    return (
                                        <tr key={ws_employee.employee_name}>
                                            {/* Workstation column data */}
                                            {ws_emp_index === 0 && <td key={ws.workstation_id} className="justify-content-center py-3" rowSpan={ws.employee.length}>
                                                <p className="mb-0">{ws.workstation_name}</p>
                                                <h2 className="pointer" onClick={() => addNewRow(ws.workstation_id, [], ws_emp_index)}>+</h2>
                                                {enableShifts && <div className="row m-0 justify-content-center p-0">
                                                    <Dropdown
                                                        CustomStyle="col-md-8 p-0"
                                                        options={getFormattedDropdownOptions(ws.shifts, 'id', 'time')}
                                                        onSelectFunction={(e) => setShiftId(e)}
                                                    ></Dropdown>
                                                    <img className="shortcut-icon ml-2" onClick={() => { setShiftPopupOpen(true); shiftData['workstation_id'] = ws.workstation_id; shiftData['location_id'] = locId; shiftData['shifts'] = ws.shifts }} src={EditShiftIcon}></img>
                                                </div>}
                                            </td>}
                                            {/* Employee and plan data rows */}
                                            <td>{ws_employee.employee_id ? <a className="text-dark text-truncate plannign_overview_weekly_employee_title" href={"/manage-employees/" + ws_employee.employee_id} title={ws_employee.employee_name}>{ws_employee.employee_name}</a> : ws_employee.employee_name}<div> {ws_employee.employee_id && <span><EmployeeType_icon /></span>}</div></td>
                                            <PlanItem PlansData={ws_employee.plans} availableSwitch={availableSwitch} wid={ws.workstation_id} Dates={dates} employeeId={ws_employee.employee_id !== undefined ? ws_employee.employee_id : employeeId !== undefined && employeeId[ws.workstation_id] !== undefined ? employeeId[ws.workstation_id][ws_emp_index] : ''} openCreatePlanPopup={openCreatePlanPopup} ws_emp_index={ws_emp_index} weekNumber={weekNumber} year={year}></PlanItem>
                                            <td>
                                                <div className="d-flex mt-3 justify-content-between">
                                                    {ws_employee.total.cost && <small>
                                                        <img src={CostIcon} className="plan-icon mr-1"></img>
                                                        {ws_employee.total.cost}
                                                    </small>}
                                                    {ws_employee.total.contract_hours && <small>
                                                        <img src={ContractHoursIcon} className="plan-icon mr-1"></img>
                                                        {ws_employee.total.contract_hours}
                                                    </small>}
                                                </div>
                                            </td>
                                            <td>
                                                <img className="shortcut-icon pointer" onClick={() => removeRow(ws.workstation_id, ws_emp_index, ws_employee.employee_id, ws_employee)} src={DeleteIcon} title={t("DELETE")} alt={t("DELETE")}></img>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })
                    }
                    {/* Below code is to display total data at the bottom row */}
                    <tr>
                        <td className="border-0">{t("TOTAL_TITLE")}</td>
                        <td className="border-0"></td>
                        {
                            Object.keys(totalData).map(function (key, index) {
                                return (
                                    getTotalData(index, totalData[key])
                                )
                            })
                        }
                        <td className="border-0"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
