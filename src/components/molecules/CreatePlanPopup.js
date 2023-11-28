import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import FormsNew from "./FormsNew";
import { Button } from "react-bootstrap";
import { t } from "../../translations/Translation";
import DeleteIcon from "../../static/icons/Delete.svg";
import AddIcon from "../../static/icons/AddPlusIcon.png";
import CalendarIcon from "../../static/icons/Calendar.svg";


export default function CreatePlanPopup({ setPlanPopup, employeeTypeOptions }) {

    const [rowArr, setRowArr] = useState([1]);
    const [selectedEmployeeType, setSelectedEmployeeType] = useState();
    const [selectedFunction, setSelectedFunction] = useState();
    const [planningData, setPlanningData] = useState([]);
    const [multipleDatesStatus, setMultipleDatesStatus] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const checkboxList = [
        {
            name: 'Select for multiple plannings',
            key: 'active',
            checked: multipleDatesStatus,
        },
    ]

    const functionOptions = [
        { value: '1', label: 'Function 1' },
        { value: '2', label: 'Function 2' },
        { value: '3', label: 'Function 3' }
    ]

    const changeCheckbox = () => {
        setMultipleDatesStatus(!multipleDatesStatus)
    }

    const formFields = [
        { title: 'Employee type', name: 'employee_type_id', required: true, options: employeeTypeOptions, selectedOptions: selectedEmployeeType, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: 'Function', name: 'function_id', required: true, options: functionOptions, selectedOptions: selectedFunction, isMulti: false, type: 'dropdown', style: "col-md-4 mt-2 float-left" },
        { title: '', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: "col-md-12 mt-4 mb-2 float-left" },
    ]

    const planFields = [
        { title: "Start time", name: "start_time", required: true, type: "time", style: "col-md-4 mt-2 float-left" },
        { title: "End time", name: "end_time", required: true, type: "time", style: "col-md-4 mt-2 float-left" },
        { title: 'Contract hours', name: 'contract_hours', required: true, type: 'text', style: "col-md-4 mt-2 float-left" },
    ]

    const multiDatePicker = [
        { title: "", name: "dates", required: false, type: "date", isMulti: true, style: "col-md-12 pr-0 float-left" },
    ]

    const setValues = (index, name, value, field) => {
        const planning_data = { ...planningData };
        if (field !== 'dropdown') {
            if (field === 'time') {
                planning_data[index] = {}
                planning_data[index][name] = value
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

    const AddRemovePlanRow = (val, index) => {
        if (val === 'add') {
            let arrData = [...rowArr]
            arrData.push(1);
            setRowArr(arrData);
        } else {
            let arrData = [...rowArr]
            arrData.splice(index, 1);
            setRowArr(arrData);
        }

    }


    const formData = planningData[0]


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
                    ADD PLANNING
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="border">
                    <FormsNew
                        view="filters"
                        data={formFields}
                        SetValues={setValues}
                        formattedData={formData}
                    />
                    {multipleDatesStatus &&
                        <div className="col-md-12 d-flex p-0">
                            <div className="col-md-10 p-0">
                                <FormsNew
                                    view="filters"
                                    data={multiDatePicker}
                                    SetValues={setValues}
                                    formattedData={formData}
                                />
                            </div>
                            <img src={CalendarIcon} className="pb-3 ml-4 shortcut_icon"></img>
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
                                        formattedData={planningData}
                                    />
                                </div>
                                <div className="col-md-1 ml-4 px-3 text-center py-4 border">
                                    <img className="shortcut-icon" src={rowArr.length - 1 === index ? AddIcon : DeleteIcon}
                                        onClick={() => AddRemovePlanRow(rowArr.length - 1 === index ? 'add' : 'remove', index)}></img>
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
                <Button className='button-style float-left' onClick={() => setPlanPopup(false)}>
                    {'Save'}
                </Button>
                <Button className='button-style' onClick={() => setPlanPopup(false)}>
                    {t('CLOSE')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
