import React, { useEffect, useState } from "react";
import { getCurrentWeek, getDatesForWeek } from "../../utilities/CommonFunctions";
import WorkStationIcon from "../../static/icons/Workstation.svg";
import { t } from "../../translations/Translation";
import DeleteIcon from "../../static/icons/Delete.svg";
import CostIcon from "../../static/icons/Euro.svg";
import ContractHoursIcon from "../../static/icons/Contract.svg";
import EditShiftIcon from "../../static/icons/EditShift.png";

import Dropdown from "../atoms/Dropdown";
import PlanItem from "./PlanItem";

export default function WeeklyOverview({ enableShifts }) {

    // Get current week number and year
    const weekNumber = getCurrentWeek()
    const year = (new Date()).getFullYear()

    // Const for days
    const days = [t('MONDAY'), t('TUESDAY'), t('WEDNESDAY'), t('THURSDAY'), t('FRIDAY'), t('SATURDAY'), t('SUNDAY')]
    const dates = getDatesForWeek(weekNumber, year)
    const [WeekData, setWeekData] = useState([])


    // Dummy data for shifts dropdown
    const shiftOptions = {
        1: [
            { value: '1', label: 'Shift 1' },
            { value: '2', label: 'Shift 2' },
            { value: '3', label: 'Shift 3' }
        ],
        2: [
            { value: '1', label: 'Shift 1' },
            { value: '2', label: 'Shift 2' },
            { value: '3', label: 'Shift 3' }
        ]
    }

    // Dummy data for employees dropdown
    const employeesList = [
        { value: '1', label: 'Employee 1' },
        { value: '2', label: 'Employee 2' },
        { value: '3', label: 'Employee 3' }
    ]


    useEffect(() => {
        // Setting the weekly plans data
        let data = [
            {
                workstation_id: 1,
                workstation_name: 'Workstation 1',
                shiftOptions: shiftOptions,
                employees: [
                    {
                        employee_id: 1,
                        employee_name: 'Employee 1',
                        total: { cost: '120', contract_hours: '30' },
                        plans: {
                            "18-10-2023": {
                                planning_time: ['09:00-12:00', '12:30-15:00'],
                                contract_hours: '8',
                                cost: '120'
                            },
                            "19-10-2023": {
                                planning_time: ['09:00-12:00', '12:30-15:00'],
                                contract_hours: '8',
                                cost: '120'
                            },
                            "22-10-2023": {
                                planning_time: ['09:00-12:00', '12:30-15:00'],
                                contract_hours: '8',
                                cost: '120'
                            },
                        }
                    }
                ]
            },
        ]
        setWeekData(data)
    }, [])

    // Dummy data for weekly planning total cost and contract hours
    const totalData = [
        { cost: '124', contract_hours: '25' },
        { cost: '126', contract_hours: '30' },
        { cost: '130', contract_hours: '26' },
        { cost: '135', contract_hours: '28' },
        { cost: '111', contract_hours: '34' },
        { cost: '200', contract_hours: '44' },
        { cost: '122', contract_hours: '18' },
        { cost: '230', contract_hours: '50' },
    ]


    // Function to add new row for adding new employee
    const addNewRow = (wid) => {
        let week_arr = [...WeekData]
        WeekData.map((data, index) => {
            if (data.workstation_id === wid) {
                let data_arr = { ...data }
                let emp_arr = [...data.employees]
                emp_arr.push({
                    employee_name: <Dropdown options={employeesList}></Dropdown>,
                    total: '',
                    plans: [{ data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }]
                })
                data_arr.employees = emp_arr
                week_arr[index] = data_arr
            }
        })
        setWeekData(week_arr)
    }

    // Function to delete plan row for adding new employee
    const removeRow = (wid, row_index) => {
        let week_arr = [...WeekData]
        WeekData.map((data, index) => {
            if (data.workstation_id === wid) {
                let data_arr = { ...data }
                let emp_arr = [...data.employees]
                emp_arr.splice(row_index, 1)
                data_arr.employees = emp_arr
                week_arr[index] = data_arr
            }
        })
        setWeekData(week_arr)
    }

    // Function to return total data element
    const getTotalData = (index, data) => {
        return (
            <td key={data.cost} className={index === 7 ? " border-0" : "px-2"}>
                <div className="d-flex justify-content-between">
                    <small><img src={CostIcon} className="plan-icon mr-1"></img>{data.cost}</small>
                    <small><img src={ContractHoursIcon} className="plan-icon mr-1"></img>{data.contract_hours}</small>
                </div>
            </td>
        )
    }

    return (
        <div className="col-md-12 p-0 text-center">
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th><img className="shortcut-icon" src={WorkStationIcon}></img></th>
                        <th className="py-4">Employees</th>
                        {days.map((val, index) => {
                            return (
                                <th key={val}>
                                    <div>{val}</div>
                                    <div>{dates[index]}</div>
                                </th>
                            )
                        })}
                        <th className="py-4">Total</th>
                        <th className="py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        WeekData.map((ws, index) => {
                            return (
                                ws.employees.map((ws_employee, ws_emp_index) => {
                                    return (
                                        <tr key={ws_employee.employee_name}>
                                            {ws_emp_index === 0 && <td key={ws.workstation_id} className="justify-content-center py-3" rowSpan={ws.employees.length}>
                                                <p className="mb-0">{ws.workstation_name}</p>
                                                <h2 className="pointer" onClick={() => addNewRow(ws.workstation_id)}>+</h2>
                                                {enableShifts && <div className="row m-0 justify-content-center p-0">
                                                    <Dropdown
                                                        CustomStyle="p-0"
                                                        options={shiftOptions[ws.workstation_id]}
                                                    ></Dropdown>
                                                    <img className="shortcut-icon ml-2" src={EditShiftIcon}></img>
                                                </div>}
                                            </td>}
                                            <td>{ws_employee.employee_name}</td>
                                            <PlanItem PlansData={ws_employee.plans} Dates={dates}></PlanItem>
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
                                                <img className="shortcut-icon" onClick={() => removeRow(ws.workstation_id, ws_emp_index)} src={DeleteIcon}></img>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })
                    }
                    {/* Below code is to display total data at the bottom row */}
                    <tr>
                        <td className="border-0">Total</td>
                        <td className="border-0"></td>
                        {
                            totalData.map((data, index) => {
                                return (getTotalData(index, data))
                            })
                        }
                        <td className="border-0"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
