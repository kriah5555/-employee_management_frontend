import React, { useEffect, useState } from "react";
import Legend from "../atoms/Legend";
import { t } from "../../translations/Translation";
import PlanChart from "./PlanChart";
import { GetDayPlans, GetPlanDetails, GetStartPlanReasonsApiUrl, GetStopPlanReasonsApiUrl, StartPlanApiUrl, StopPlanApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import ModalPopup from "../../utilities/popup/Popup";
import { Button } from "react-bootstrap";
import TimeInput from "../atoms/TimeInput";
import { getFormattedRadioOptions } from "../../utilities/CommonFunctions";
import RadioInput from "../atoms/formFields/RadioInput";
import { toast } from "react-toastify";


export default function DayOverview({ dayDate, year, locId, EmpTypeIds, wsIds }) {

    const times = ['Employee', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
    // const times = ['Employee', "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"];
    let current_time = new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit' })

    const [dayData, setDayData] = useState([]);
    const [startStopPlanPopup, setStartStopPlanPopup] = useState('');
    const [planDetails, setPlanDetails] = useState();
    const [startTime, setStartTime] = useState(new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit' }));
    const [stopTime, setStopTime] = useState(new Date().toLocaleTimeString("sv", { timeZone: "Europe/Paris", hour: '2-digit', minute: '2-digit' }));
    const [selectedReason, setSelectedReason] = useState('');
    const [reasons, setReasons] = useState('');
    const [reasonStatus, setReasonStatus] = useState(false);
    const [type, setType] = useState('')

    useEffect(() => {
        setStartStopPlanPopup('')
        setDayData([]);
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
    }, [dayDate])



    const pdfOpen = (data) => {
        // setPlanDetails(<div><iframe src={data} width="100%" height="500px" title="PDF Viewer" /></div>)
        setPlanDetails(<object data={data} type="application/pdf" width="100%" height="500px"></object>)
    }

    const onRadioSelect = (type, key) => {
        setSelectedReason(key);
    }

    const StartStopPopup = (type) => {
        setType(type)
        let ApiUrl = GetStartPlanReasonsApiUrl
        if (!type) {
            ApiUrl = GetStopPlanReasonsApiUrl
        }
        AXIOS.service(ApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    setReasons(result.data);
                    setReasonStatus(true)
                }
            })
            .catch((error) => {
                console.log(error);
            })



    }

    useEffect(() => {
        if (startStopPlanPopup) {
            AXIOS.service(GetPlanDetails + startStopPlanPopup, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let resp = result.data
                        let design = <div>
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
                            {resp.activity?.length !== 0 && <div className="col-md-12 pl-4 my-2">
                                <h5>Activities</h5>
                                {resp.activity.map((text, i) => {
                                    return (
                                        <p key={text}>{text}</p>
                                    )
                                })}
                            </div>}
                            <div className="col-md-12 mt-2 d-flex justify-content-center">
                                {resp.contract && <Button className='col-md-4 px-auto text-center button-style' onClick={() => pdfOpen(resp.contract)}>View contract</Button>}
                                {(resp.start_plan || resp.stop_plan) && <Button className='col-md-4 px-auto text-center button-style' onClick={() => StartStopPopup(resp.start_plan)}>
                                    {resp.start_plan ? ('Start plan') : ('Stop plan')}
                                </Button>}
                            </div>
                        </div>
                        setPlanDetails(design)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [startStopPlanPopup])

    // Function to start and stop plans
    const StartStopApiCall = () => {
        let ApiUrl = type ? StartPlanApiUrl : StopPlanApiUrl
        let requestData = {
            "plan_id": startStopPlanPopup,
            "start_time": startTime,
            "stop_time": stopTime,
            "reason_id": selectedReason,
        }
        AXIOS.service(ApiUrl, 'POST', requestData)
            .then((result) => {
                if (result?.success) {
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
                    setStartStopPlanPopup(''); setPlanDetails(''); setReasonStatus(false);

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className="col-md-12">
            {startStopPlanPopup !== '' && <ModalPopup
                size="lg"
                title={!reasonStatus ? ('PLAN DETAILS') : type ? 'Start plan' : 'Stop plan'}
                body={!reasonStatus ? planDetails : <div>
                    <TimeInput
                        key={'time'}
                        title={'Time'}
                        setTime={(e) => { type ? setStartTime(e) : setStopTime(e) }}
                        value={type ? startTime : stopTime}
                        type={'time'}
                        index={0}
                        required={true}
                        customStyle={'col-md-4 pl-4'}
                    ></TimeInput>
                    <RadioInput
                        title={'Reason'}
                        radiobuttonsList={getFormattedRadioOptions(reasons, 'id', 'name')}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'mt-3'}
                        selectedOption={selectedReason}
                        type={'reason'}
                    ></RadioInput>
                </div>}
                onConfirm={reasonStatus && StartStopApiCall}
                startplanButton={type ? 'Start' : 'Stop'}

                onHide={() => { setStartStopPlanPopup(''); setPlanDetails(''); }}
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
