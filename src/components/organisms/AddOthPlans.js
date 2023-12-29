import React, { useEffect, useState } from "react";
import FormsNew from "../molecules/FormsNew";
import { t } from "../../translations/Translation";
import CustomButton from "../atoms/CustomButton";
import Switch from "../atoms/Switch";
import BackIcon from "../../static/icons/BackIcon.png"
import OthPlanForm from "../molecules/OthPlanForm";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { CreateOthPlanApiUrl, GetOthOptionsApiUrl } from "../../routes/ApiEndPoints";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopup from "../../utilities/popup/ErrorPopup";



export default function AddOthPlans() {

    let params = useParams();
    const navigate = useNavigate();


    const [othPlanData, setOthPlanData] = useState({
        "employee_id": params.id,
        "start_date": "",
        "workstation_id": '',
        "location_id": '',
        "function_id": '',
        "repeating_week": 1,
        "auto_renew": false,
        "plannings": []
    });

    // const [selectedFunction, setSelectedFunction] = useState([]);
    const [selectedRepeatation, setSelectedRepeatation] = useState({ value: 1, label: '1' });
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedWorkstation, setSelectedWorkstation] = useState([]);

    const [locationList, setLocationList] = useState([]);
    const [workstationList, setWorkstationList] = useState([]);

    const [row, setRow] = useState([1, 1, 1, 1, 1, 1, 1])
    const [autoOn, setAutoOn] = useState(false)
    const [repeatData, setRepeatData] = useState([1]);
    const [errors, setErrors] = useState([]);

    const repeatationList = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
    ]

    useEffect(() => {
        AXIOS.service(GetOthOptionsApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    let resp = result.data
                    setLocationList(resp.locations);
                    if (resp.locations?.length === 1) {
                        setSelectedLocation(resp.locations[0]);
                        othPlanData['location_id'] = resp.locations[0].value
                        
                        let locId = resp.locations[0].value
                        setWorkstationList(resp.workstations[locId])
                        setSelectedWorkstation(resp.workstations[locId]?.length === 1 ? resp.workstations[locId][0] : [])
                        othPlanData['workstation_id'] = resp.workstations[locId]?.length === 1 ? resp.workstations[locId][0].value : ''
                    }
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const days = [
        { value: 1, label: t('MONDAY') },
        { value: 2, label: t('TUESDAY') },
        { value: 3, label: t('WEDNESDAY') },
        { value: 4, label: t('THURSDAY') },
        { value: 5, label: t('FRIDAY') },
        { value: 6, label: t('SATURDAY') },
        { value: 7, label: t('SUNDAY') },
    ]
    const daysArr = [t('MONDAY'), t('TUESDAY'), t('WEDNESDAY'), t('THURSDAY'), t('FRIDAY'), t('SATURDAY'), t('SUNDAY')]

    useEffect(() => {
        let count = 1
        let data = []
        while (selectedRepeatation?.value >= count) {
            data.push(1);
            count = count + 1
        }
        setRepeatData(data)
    }, [selectedRepeatation])

    const AddNewRow = () => {
        let arrData = [...row]
        arrData.push(1);
        setRow(arrData);
    }

    const SetValues = (i, name, value, field, index) => {
        let PlanData = { ...othPlanData }

        if (field !== 'dropdown') {
            if (field === 'time' || name === 'contract_hours') {
                if (PlanData['plannings']?.length === 0) {
                    PlanData['plannings'][index] = []
                    PlanData['plannings'][index][i] = {}
                    PlanData['plannings'][index][i][name] = value
                } else {
                    if (PlanData['plannings'][index][i]) {
                        PlanData['plannings'][index][i][name] = value
                    } else {
                        PlanData['plannings'][index][i] = {}
                        PlanData['plannings'][index][i][name] = value
                    }
                }
                setOthPlanData(PlanData)
            } else {
                PlanData[name] = value
            }
        } else {
            if (name === 'day') {
                if (PlanData['plannings']?.length === 0) {
                    PlanData['plannings'][index] = []
                    PlanData['plannings'][index][i] = {}
                    PlanData['plannings'][index][i][name] = value.value
                } else if (PlanData['plannings'][index]) {
                    if (PlanData['plannings'][index][i]) {
                        PlanData['plannings'][index][i][name] = value.value
                    } else {
                        PlanData['plannings'][index][i] = {}
                        PlanData['plannings'][index][i][name] = value.value
                    }
                } else {
                    PlanData['plannings'][index] = []
                    if (PlanData['plannings'][index][i]) {
                        PlanData['plannings'][index][i][name] = value.value
                    } else {
                        PlanData['plannings'][index][i] = {}
                        PlanData['plannings'][index][i][name] = value.value
                    }
                }
            } else {
                // if (name === 'function_id') {
                //     setSelectedFunction(value);
                // } else 
                if (name === 'location_id') {
                    setSelectedLocation(value);
                } else if (name === 'workstation_id') {
                    setSelectedWorkstation(value);
                } else if (name === 'repeating_week') {
                    setSelectedRepeatation(value)
                }
                PlanData[name] = value.value
            }
        }
        setOthPlanData(PlanData);
    }

    const filterData = [
        { title: 'Start date', name: 'start_date', required: true, type: 'date', style: "col-md-2 mt-3 float-left" },
        { title: 'End date', name: 'end_date', required: false, type: 'date', style: "col-md-2 mt-3 float-left" },
        // { title: 'Functions', name: 'function_id', required: true, options: functionList, selectedOptions: selectedFunction, isMulti: false, type: 'dropdown', style: "col-md-2 float-left" },
        { title: 'Location', name: 'location_id', required: true, options: locationList, selectedOptions: selectedLocation, isMulti: false, type: 'dropdown', style: "col-md-3 float-left" },
        { title: 'Workstation', name: 'workstation_id', required: true, options: workstationList, selectedOptions: selectedWorkstation, isMulti: false, type: 'dropdown', style: "col-md-3 float-left" },
        { title: 'Repetation', name: 'repeating_week', required: true, options: repeatationList, selectedOptions: selectedRepeatation, isMulti: false, type: 'dropdown', style: "col-md-2 float-left" },
    ]

    const planData = [
        { title: 'Day', name: 'day', required: true, options: days, isMulti: false, type: 'dropdown', style: "col-md-3 float-left" },
        { title: "Start time", name: "start_time", required: true, type: "time", style: "col-md-3 mt-3 float-left" },
        { title: "End time", name: "end_time", required: true, type: "time", style: "col-md-3 mt-3 float-left" },
        { title: 'Contract hours', name: 'contract_hours', required: true, type: 'text', style: "col-md-3 mt-3 float-left" },
    ]

    const planDataWithoutLabel = [
        { title: '', name: 'day', required: false, options: days, isMulti: false, type: 'dropdown', style: "col-md-3 float-left" },
        { title: "", name: "start_time", required: false, type: "time", style: "col-md-3 float-left" },
        { title: "", name: "end_time", required: false, type: "time", style: "col-md-3 float-left" },
        { title: '', name: 'contract_hours', required: false, type: 'text', style: "col-md-3 float-left" },
    ]

    const OnSave = () => {

        AXIOS.service(CreateOthPlanApiUrl, 'POST', othPlanData)
            .then((result) => {
                if (result?.success) {
                    // setDataRefresh(!dataRefresh);
                    // setWarningMessage('')
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
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className="right-container">
            <div className="company-tab-width mt-3">
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={('Validation error!')}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                <div className="d-flex justify-content-between bg-white">
                    <h4 className="py-2 px-3 bg-white">
                        <img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/oth-planning/' + params.id)} src={BackIcon}></img>
                        {t('ADD_OTH')}</h4>
                    <Switch label={t("RENEW_OTH")} id="switch4" styleClass="px-3" lableClick={true} onChange={() => setAutoOn(!autoOn)} checked={autoOn} />
                </div>

                <div className="bg-white my-2">
                    <FormsNew
                        view="filters"
                        formTitle={''}
                        formattedData={[]}
                        data={filterData}
                        SetValues={SetValues}
                    // OnSave={OnSave}
                    ></FormsNew>
                </div>
                {
                    repeatData.map((val, index) => {
                        return (
                            <div>
                                <div className="bg-white my-2">
                                    {row.map((data, i) => {
                                        return (
                                            <div className="form-container my-3 bg-white pb-3">
                                                <div className="d-flex px-2">
                                                    <OthPlanForm
                                                        planData={i === 0 ? planData : planDataWithoutLabel}
                                                        i={i}
                                                        index={index}
                                                        othPlanData={othPlanData['plannings']}
                                                        SetValues={SetValues}
                                                        daysArr={daysArr}
                                                    ></OthPlanForm>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <CustomButton buttonName={'Add another +'} ActionFunction={() => AddNewRow()} CustomStyle="mr-5 my-2"></CustomButton>
                            </div>
                        )
                    })
                }
                <CustomButton buttonName={t('SAVE')} ActionFunction={() => OnSave()} CustomStyle="float-right my-2"></CustomButton>
            </div>
        </div >
    )
}
