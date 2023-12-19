import React, { useEffect, useState } from "react";
import Legend from "../atoms/Legend";
import { t } from "../../translations/Translation";
import PlanChart from "./PlanChart";
import { GetDayPlans, GetPlanDetails } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import ModalPopup from "../../utilities/popup/Popup";
import { Button } from "react-bootstrap";


export default function DayOverview({ dayDate, year, locId, EmpTypeIds, wsIds }) {

    const times = ['Employee', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
    // const times = ['Employee', "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"];

    const [dayData, setDayData] = useState([]);
    const [startStopPlanPopup, setStartStopPlanPopup] = useState('');
    const [planDetails, setPlanDetails] = useState();
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        let requestData = {
            "location": locId,
            "workstations": wsIds,
            "employee_types": EmpTypeIds,
            "date": dayDate,
            "year": year
        }
        AXIOS.service(GetDayPlans, 'POST', requestData)
            .then((result) => {
                if (result?.success) {
                    setDayData(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const pdfOpen = (data) => {
        setPdfUrl(data);
    }

    useEffect(() => {
        if (startStopPlanPopup) {
            AXIOS.service(GetPlanDetails + startStopPlanPopup, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let resp = result.data
                        let design = pdfUrl === '' ? <div>
                            <div className="col-md-12 row m-0">
                                <div className="col-md-6 row m-0">
                                    <label>{"Start time:"}</label>
                                    <p className="pl-2">{resp.start_time}</p>
                                </div>
                                <div className="col-md-6 row m-0">
                                    <label>{"End time:"}</label>
                                    <p className="pl-2">{resp.end_time}</p>
                                </div>
                            </div>
                            <div className="col-md-12 row m-0">
                                <div className="col-md-6 row m-0">
                                    <label>{"Employee type:"}</label>
                                    <p className="pl-2">{resp.employee_type}</p>
                                </div>
                                <div className="col-md-6 row m-0">
                                    <label>{"Function:"}</label>
                                    <p className="pl-2">{resp.function}</p>
                                </div>
                            </div>
                            <div className="col-md-12 row m-0">
                                <div className="col-md-6 row m-0">
                                    <label>{"Workstation:"}</label>
                                    <p className="pl-2">{resp.workstation}</p>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center">
                            {(resp.start_plan || resp.stop_plan) && <Button className='col-md-4 px-auto text-center button-style' onClick={() => pdfOpen(resp.contract)}>
                                {resp.contract ? ('View contract') : resp.start_plan ? ('Start plan') : ('Stop plan')}
                            </Button>}
                            </div>
                        </div> : <div><iframe src={pdfUrl} width="100%" height="500px" title="PDF Viewer" /></div>
                        setPlanDetails(design)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [startStopPlanPopup])


    return (
        <div className="col-md-12">
            {startStopPlanPopup !== '' && <ModalPopup
                size="lg"
                title={('PLAN DETAILS')}
                body={planDetails}
                // onConfirm={() => setStartStopPlanPopup('')}
                onHide={() => setStartStopPlanPopup('')}
                close={true}
            ></ModalPopup>}
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
                    {dayData.map((employee, i) => {
                        return (
                            <tr key={i}>
                                <td>{employee.employee_name}</td>
                                <td colSpan="13" className="p-0 width-90"><PlanChart Plans={employee.plans} dayDate={dayDate} locId={locId} EmpTypeIds={EmpTypeIds} wsIds={wsIds} year={year} setStartStopPlanPopup={setStartStopPlanPopup}></PlanChart></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div>
    )
}
