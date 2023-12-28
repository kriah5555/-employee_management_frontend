import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import FormsNew from "./FormsNew";
import { Button } from "react-bootstrap";
import { t } from "../../translations/Translation";
import DeleteIcon from "../../static/icons/Delete.svg";
import AddIcon from "../../static/icons/AddPlusIcon.png";
import CalendarIcon from "../../static/icons/Calendar.svg";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { GetPlanCreationOptionsUrl, CreatePlanApiUrl, DeleteSinglePlan } from "../../routes/ApiEndPoints";
import { toast } from 'react-toastify';



export default function CreatePlanPopup({ setPlanPopup, employeeId, planningDate, wid, locId, planData, dropDownData, updatePlan, setDataRefresh, dataRefresh }) {

    const [rowArr, setRowArr] = useState(planData.length > 0 ? [...planData, 1] : [1]);
    const [selectedEmployeeType, setSelectedEmployeeType] = useState(dropDownData ? dropDownData['employee_type'] : '');
    const [selectedFunction, setSelectedFunction] = useState(dropDownData ? dropDownData['function'] : '');
    const [planningData, setPlanningData] = useState({
        'employee_id': employeeId,
        'location_id': locId,
        'workstation_id': wid,
        'function_id': dropDownData['function'] ? dropDownData['function'].value : '',
        'employee_type_id': dropDownData['employee_type'] ? dropDownData['employee_type'].value : '',
        'dates': [planningDate],
        'timings': planData
    });
    const [multipleDatesStatus, setMultipleDatesStatus] = useState(false);
    const [employeeTypeOptions, setEmployeeTypeOptions] = useState([]);

    const checkboxList = [
        {
            name: t("SELECT_FOR_MULTIPLE_PLANNINGS"),
            key: 'active',
            checked: multipleDatesStatus,
        },
    ]

    useEffect(() => {
        let requestData = {
            "employee_id": employeeId,
            "date": planningDate
        }
        AXIOS.service(GetPlanCreationOptionsUrl, 'POST', requestData)
            .then((result) => {
                if (result?.success) {
                    setEmployeeTypeOptions(result.data)
                    if (result.data.employee_types?.length === 1){
                        setSelectedEmployeeType(result.data.employee_types[0])
                        planningData['employee_type_id'] = result.data.employee_types[0].value
                        if (result.data.functions[result.data.employee_types[0].value]?.length === 1){
                            setSelectedFunction(result.data.functions[result.data.employee_types[0].value][0])
                            planningData['function_id'] = result.data.functions[result.data.employee_types[0].value][0].value
                        }
                    }
                    // setEmployeeList(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const changeCheckbox = () => {
        setMultipleDatesStatus(!multipleDatesStatus)
    }

    const formFields = !updatePlan ? [
        { title: t("EMPLOYEE_TYPE"), name: 'employee_type_id', required: true, options: employeeTypeOptions !== undefined ? employeeTypeOptions.employee_types : [], selectedOptions: selectedEmployeeType, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("FUNCTION_TITLE"), name: 'function_id', required: true, options: employeeTypeOptions !== undefined && employeeTypeOptions.functions !== undefined ? employeeTypeOptions.functions[selectedEmployeeType !== undefined ? selectedEmployeeType.value : selectedEmployeeType] : [], selectedOptions: selectedFunction, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: "col-md-12 mt-4 mb-2 float-left" }
    ] : [
        { title: t("EMPLOYEE_TYPE"), name: 'employee_type_id', required: true, options: employeeTypeOptions !== undefined ? employeeTypeOptions.employee_types : [], selectedOptions: selectedEmployeeType, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: t("FUNCTION_TITLE"), name: 'function_id', required: true, options: employeeTypeOptions !== undefined && employeeTypeOptions.functions !== undefined ? employeeTypeOptions.functions[selectedEmployeeType !== undefined ? selectedEmployeeType.value : selectedEmployeeType] : [], selectedOptions: selectedFunction, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
    ]

    const planFields = [
        { title: t("START_TIME"), name: "start_time", required: true, type: "time", style: "col-md-4 mt-2 float-left" },
        { title: t("END_TIME"), name: "end_time", required: true, type: "time", style: "col-md-4 mt-2 float-left" },
        { title: t("CONTRACT_HOURS"), name: 'contract_hours', required: true, type: 'text', style: "col-md-4 mt-2 float-left" },
    ]

    const multiDatePicker = [
        { title: "", name: "dates", required: false, type: "date", isMulti: true, style: "col-md-12 pr-0 float-left" },
    ]

    const setValues = (index, name, value, field) => {
        const planning_data = { ...planningData };

        if (name === 'dates') {
            let arr = planning_data['dates']
            value.map((date, i) => {
                if (!arr.includes(date.format("DD-MM-YYYY"))) {
                    arr.push(date.format("DD-MM-YYYY"))
                }
            })
            planning_data['dates'] = arr
        } else if (field !== 'dropdown') {
            if (field === 'time' || name === 'contract_hours') {
                planning_data['timings'][index] = planning_data['timings'][index] ? planningData['timings'][index] : {}
                planning_data['timings'][index][name] = value
            } else {
                planning_data[name] = value
            }
        } else {
            if (name === 'employee_type_id') {
                setSelectedEmployeeType(value);
            } else {
                setSelectedFunction(value);
            }
            planning_data[name] = value.value
        }
        setPlanningData(planning_data);
    }

    const deletePlan = (Pid) => {
        AXIOS.service(DeleteSinglePlan + Pid, 'DELETE')
            .then((result) => {
                if (result?.success) {
                    setDataRefresh(!dataRefresh);
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
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const AddRemovePlanRow = (val, index, Pid) => {
        if (val === 'add') {
            let arrData = [...rowArr]
            arrData.push(1);
            setRowArr(arrData);
        } else {
            let arrData = [...rowArr]
            arrData.splice(index, 1);
            setRowArr(arrData);
            if (Pid !== undefined) {
                deletePlan(Pid.plan_id)
            }
        }

    }

    const SavePlan = () => {
        AXIOS.service(CreatePlanApiUrl, 'POST', planningData)
            .then((result) => {
                if (result?.success) {
                    setPlanPopup(false);
                    setDataRefresh(!dataRefresh);
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
                    // setEmployeeList(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <Modal
            show={true}
            onHide={() => setPlanPopup(false)}
            size="xl"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={true}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='container' >
                    {t("ADD_PLANNING")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="border">
                    <FormsNew
                        view="filters"
                        data={formFields}
                        SetValues={setValues}
                        formattedData={planningData}
                    />
                    {multipleDatesStatus && !updatePlan &&
                        <div className="col-md-12 d-flex p-0">
                            <div className="col-md-10 p-0">
                                <FormsNew
                                    view="filters"
                                    data={multiDatePicker}
                                    SetValues={setValues}
                                    formattedData={planningData}
                                />
                            </div>
                            <img src={CalendarIcon} className="pb-3 ml-4 shortcut_icon pointer"></img>
                        </div>
                    }
                    {rowArr.map((row, index) => {
                        return (
                            <div key={row} className="col-md-12 d-flex mb-3">
                                <div className="col-md-10 ml-2 p-0 border">
                                    <FormsNew
                                        view="filters"
                                        planIndex={index}
                                        data={planFields}
                                        SetValues={setValues}
                                        formattedData={planningData['timings']}
                                    />
                                </div>
                                <div className="col-md-1 ml-4 px-3 text-center py-4 border">
                                    <img className="shortcut-icon pointer" src={rowArr.length - 1 === index ? AddIcon : DeleteIcon}
                                        onClick={() => AddRemovePlanRow(rowArr.length - 1 === index ? 'add' : 'remove', index, planningData['timings'][index])}></img>
                                </div>
                                {/* <div className=" ml-3 px-3 text-center py-4 border">
                                    <img className="shortcut-icon" src={rowArr.length - 1 === index ? AddIcon : DeleteIcon}
                                        onClick={() => AddRemovePlanRow(rowArr.length - 1 === index ? 'add' : 'remove', index)}></img>
                                </div> */}
                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-style float-left' onClick={() => { SavePlan() }}> {/*setPlanPopup(false); */}
                    {t("SAVE")}
                </Button>
                <Button className='button-style' onClick={() => setPlanPopup(false)}>
                    {t('CLOSE')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
