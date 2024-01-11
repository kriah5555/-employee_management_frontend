import React, { useEffect, useState } from "react";
import TimeIcon from "../../static/icons/Time.svg";
import CostIcon from "../../static/icons/Euro.svg";
import ContractHoursIcon from "../../static/icons/Contract.svg";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { GetAvailabilitiesApiUrl } from "../../routes/ApiEndPoints";


export default function PlanItem({ PlansData, Dates, openCreatePlanPopup, employeeId, wid, ws_emp_index, weekNumber, year, availableSwitch }) {


    const [data, setData] = useState([])

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
                        setData(result.data[employeeId]);


                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setData([])
        }
    }, [availableSwitch])

    return (
        Dates.map((date) => {
            return (
                <td key={date} className={data?.available?.includes(date) ? availableStyle : data?.not_available?.includes(date) ? unAvailableStyle : style} onClick={() => openCreatePlanPopup(employeeId, date, wid, PlansData, ws_emp_index)}>
                    {PlansData[date] && <>
                        {PlansData[date]['planning'].map((plan) => {
                            return (
                                <small key={plan.plan_id} className="row m-0 pb-1 px-2 border-bottom">
                                    <img src={TimeIcon} className="plan-icon mr-2"></img>
                                    {plan.timings}
                                </small>
                            )
                        })}
                        <div className="d-flex mt-3 justify-content-between px-2">
                            {PlansData[date].cost !== null && <small className="cost-position">
                                <img src={CostIcon} className="plan-icon mr-1"></img>
                                {PlansData[date].cost}
                            </small>}
                            {PlansData[date].contract_hours && <small className="contract-hours-pos">
                                <img src={ContractHoursIcon} className="plan-icon mr-1"></img>
                                {PlansData[date].contract_hours}
                            </small>}
                        </div>
                    </>}
                </td>
            )
        })
    )
}
