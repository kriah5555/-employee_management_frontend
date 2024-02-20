import React, { useEffect, useState } from "react";
import Legend from "../atoms/Legend";
import { t } from "../../translations/Translation";
import PlanChart from "./PlanChart";
import { GetDayPlans, GetPlanDetails, GetStartPlanReasonsApiUrl, GetStopPlanReasonsApiUrl, SignContractApiUrl, StartBreakApiUrl, StartPlanApiUrl, StopBreakApiUrl, StopPlanApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import ModalPopup from "../../utilities/popup/Popup";
import { Button } from "react-bootstrap";
import TimeInput from "../atoms/TimeInput";
import { getFormattedRadioOptions } from "../../utilities/CommonFunctions";
import RadioInput from "../atoms/formFields/RadioInput";
import { toast } from "react-toastify";
import CustomButton from "../atoms/CustomButton";
import SignaturePad from "../atoms/SignaturePad";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import EmployeeType_icon from "../../static/icons/EmployeeType_icon";


export default function DayOverview({ dayDate, year, locId, EmpTypeIds, wsIds, dimonaStatus }) {

    const times = ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
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
    const [type, setType] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [breakTimeStatus, setBreakTimeStatus] = useState(false);

    useEffect(() => {
        if (!dimonaStatus) {
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
        }
    }, [dayDate, locId])


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

    const StartStopBreakPopup = (type) => {
        setType(type)
        setBreakTimeStatus(true);
        setReasonStatus(true)
    }

    const sendSignatureData = (data) => {
        let req_data = {
            'plan_id': startStopPlanPopup,
            'signature': data
        }
        AXIOS.service(SignContractApiUrl, 'POST', req_data)
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
                    StartStopPopup(true)
                } else {
                    setErrorMessages(result.message);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const pdfOpen = (data) => {
        // setPlanDetails(<div><iframe src={'https://www.clickdimensions.com/links/TestPDFfile.pdf'} width="100%" height="500px" title="PDF Viewer" /></div>)
        setPlanDetails(
            <div>
                <object data={data} type="application/pdf" width="100%" height="500px"></object>
                <CustomButton buttonName={t("CANCEL")} CustomStyle="float-right mt-2" ActionFunction={() => setRefresh(!refresh)}></CustomButton>
                <CustomButton buttonName={t("SIGN")} ActionFunction={() => setPlanDetails(<SignaturePad view="contractSign" sendSignatureData={sendSignatureData} sign={true} setSign={setRefresh} refresh={refresh}></SignaturePad>)} CustomStyle="float-right mt-2"></CustomButton>
            </div>
        )
    }

    const onRadioSelect = (type, key) => {
        setSelectedReason(key);
    }


    useEffect(() => {
        if (startStopPlanPopup) {
            AXIOS.service(GetPlanDetails + startStopPlanPopup, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let resp = result.data
                        console.log(resp);
                        let design = <div>
                            <div className="col-md-12 row m-0 ">
                                <div className="col-md-6 row m-0">
                                    <label>{t("START_TIME") + ':'}</label>
                                    <p className="pl-2">{resp.start_time}</p>
                                </div>
                                <div className="col-md-6 row m-0">
                                    <label>{t("END_TIME") + ':'}</label>
                                    <p className="pl-2">{resp.end_time}</p>
                                </div>
                            </div>
                            <div className="col-md-12 row m-0">
                                <div className="col-md-6 row m-0">
                                    <label>{t("EMPLOYEE_TYPE") + ':'}</label>
                                    <p className="pl-2">{resp.employee_type}</p>
                                </div>
                                <div className="col-md-6 row m-0">
                                    <label>{t("FUNCTION_TITLE") + ':'}</label>
                                    <p className="pl-2">{resp.function}</p>
                                </div>
                            </div>
                            <div className="col-md-12 row m-0">
                                <div className="col-md-6 row m-0">
                                    <label>{t("WORK_STATION") + ':'}</label>
                                    <p className="pl-2">{resp.workstation}</p>
                                </div>
                            </div>
                            {resp.activity?.length !== 0 && <div className="col-md-12 pl-4 my-2">
                                <h5>{t("ACTIVITIES") + ':'}</h5>
                                {resp.activity.map((text, i) => {
                                    return (
                                        <p key={text}>{text}</p>
                                    )
                                })}
                            </div>}
                            <div className="col-md-12 mt-2 d-flex justify-content-center">
                                {resp.contract && <Button className='col-md-4 px-auto mr-2 text-center button-style' onClick={() => pdfOpen(resp.contract)}>{t("VIEW_CONTRACT")}</Button>}
                                {(resp.start_plan || resp.stop_plan) && <Button className='col-md-4 px-auto text-center button-style' onClick={() => StartStopPopup(resp.start_plan)}>
                                    {resp.start_plan ? t("START_PLAN") : t("STOP_PLAN")}
                                </Button>}
                                {(resp.start_break || resp.stop_break) && <Button className='col-md-4 ml-2 px-auto text-center button-style' onClick={() => StartStopBreakPopup(resp.start_break)}>
                                    {resp.start_break ? t("START_BREAK") : t("STOP_BREAK")}
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

    }, [startStopPlanPopup, refresh])

    // Function to start and stop plans
    const StartStopApiCall = () => {
        let ApiUrl = type ? (breakTimeStatus ? StartBreakApiUrl : StartPlanApiUrl) : (breakTimeStatus ? StopBreakApiUrl : StopPlanApiUrl)
        let requestData = {
            "plan_id": startStopPlanPopup,
            "start_time": startTime,
            "stop_time": stopTime,
            "end_time": stopTime,
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
                    setStartStopPlanPopup(''); setPlanDetails(''); setReasonStatus(false); setBreakTimeStatus(false);
                } else {
                    setErrorMessages(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className="col-md-12 ">
            {errorMessages !== undefined && errorMessages.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ("!")}
                body={(errorMessages)}
                onHide={() => setErrorMessages([])}
            ></ErrorPopup>}
            {startStopPlanPopup !== '' && <ModalPopup
                size="lg"
                title={!reasonStatus ? t("PLAN_DETAILS") : type ? (breakTimeStatus ? t("START_BREAK") : t("START_PLAN")) : (breakTimeStatus ? t("STOP_BREAK") : t("STOP_PLAN"))}
                body={!reasonStatus ? planDetails : <div>
                    <TimeInput
                        key={'time'}
                        title={t("TIME")}
                        setTime={(e) => { type ? setStartTime(e) : setStopTime(e) }}
                        value={type ? startTime : stopTime}
                        type={'time'}
                        index={0}
                        required={true}
                        customStyle={'col-md-4 pl-4'}
                    ></TimeInput>
                    {!breakTimeStatus && <RadioInput
                        title={t("REASON")}
                        radiobuttonsList={getFormattedRadioOptions(reasons, 'id', 'name')}
                        changeCheckbox={onRadioSelect}
                        CustomStyle={'mt-3'}
                        selectedOption={selectedReason}
                        type={'reason'}
                    ></RadioInput>}
                </div>}
                onConfirm={reasonStatus && StartStopApiCall}
                startplanButton={type ? t("START_TEXT") : t("STOP_TEXT")}

                onHide={() => { setStartStopPlanPopup(''); setPlanDetails(''); setReasonStatus(false); setType('') }}
                close={true}
            ></ModalPopup>}
            <div className="d-flex justify-content-end col-md-12 mx-auto bg-white px-">
                <Legend title={t('WORKING_HOURS')} styleClass1={"mr-4"} styleClass2={"box background-green"}></Legend>
                <Legend title={t('LEAVE')} styleClass1={""} styleClass2={"box background-red"}></Legend>
            </div>

            <div className="panning_overview_table">

                {/* custom table for day overview starts */}
                <div className="table">
                    {/* custom tabel header starts*/}
                    <div className="d-flex mt-2 ">
                        <div className="w-10 border border-2 p-2 thead panning_overview_table_heading">{t("EMPLOYEE_TITLE")}</div>
                        <div className=" d-flex  border justify-content-evenly w-90 panning_overview_times">
                            {times.map((time, index) => {
                                return (
                                    <div key={time} className=" p-2" >{time}</div>
                                )
                            })}
                        </div>
                    </div>
                    {/* custom tabel header ends*/}

                    {/* custom table body starts*/}
                    {dayData.map((employee, i) => {
                        return (
                            <div key={i} className="d-flex border">
                                <div className="text-truncate  w-10 border p-2 panning_overview_table_heading" title={employee.employee_name}>{employee.employee_name}</div>
                                {/* <div> {employee.employee_id && <span><EmployeeType_icon IconColour={employee.employee_type_colour?employee.employee_type_colour:" #61bfb5"} /></span>}</div> */}
                                <div colSpan="13" className="p-0 w-90"><PlanChart Plans={employee.plans} dayDate={dayDate} locId={locId} EmpTypeIds={EmpTypeIds} wsIds={wsIds} year={year} setStartStopPlanPopup={setStartStopPlanPopup}></PlanChart></div>
                            </div>
                        )
                    })}
                    {/* custom table body ends*/}
                </div>
                {/* custom table for day overview ends */}




                {/* <table className="table table-bordered ">
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
                                    <td className="text-truncate day_overview_name" title={employee.employee_name}>{employee.employee_name}</td>
                                    {/* <div> {employee.employee_id && <span><EmployeeType_icon IconColour={employee.employee_type_colour?employee.employee_type_colour:" #61bfb5"} /></span>}</div> //*
                                    <td colSpan="13" className="p-0 width-90"><PlanChart Plans={employee.plans} dayDate={dayDate} locId={locId} EmpTypeIds={EmpTypeIds} wsIds={wsIds} year={year} setStartStopPlanPopup={setStartStopPlanPopup}></PlanChart></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table> */}
            </div>
        </div>
    )
}
