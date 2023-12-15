import React from "react";
import TimeIcon from "../../static/icons/Time.svg";
import CostIcon from "../../static/icons/Euro.svg";
import ContractHoursIcon from "../../static/icons/Contract.svg";

export default function PlanItem({ PlansData, Dates, openCreatePlanPopup, employeeId, wid }) {

    return (
        Dates.map((date) => {
            return (
                <td key={date} className="py-2 px-0 height-10 planning-position shadow-sm" onClick={() => openCreatePlanPopup(employeeId, date, wid, PlansData)}>
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
