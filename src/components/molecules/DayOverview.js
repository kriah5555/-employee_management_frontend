import React from "react";
import Legend from "../atoms/Legend";
import { t } from "../../translations/Translation";
import PlanChart from "./PlanChart";

export default function DayOverview() {

    const times = ['Employee', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
    // const times = ['Employee', "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"];



    return (
        <div className="col-md-12">
            <div className="d-flex justify-content-end col-md-12 mx-auto bg-white px-">
                <Legend title={t('WORKING_HOURS')} styleClass1={"mr-4"} styleClass2={"box background-green"}></Legend>
                <Legend title={t('LEAVE')} styleClass1={""} styleClass2={"box background-red"}></Legend>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        {times.map((time, index) => {
                            return (
                                <th key={time} className={time !== 'Employee' ? "border-x-none" : ""}>{time}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Employee name</td>
                        <td colSpan="13" className="p-0 width-90"><PlanChart></PlanChart></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
