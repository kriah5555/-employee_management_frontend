import React, { useEffect, useState } from "react";
import FormsNew from "./FormsNew";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { ResponsibleCompaniesApiUrl, OpenShiftApiUrl } from "../../routes/ApiEndPoints";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { Button, Modal } from "react-bootstrap";
import RadioInput from "../atoms/formFields/RadioInput";
import Switch from "../atoms/Switch";
import { toast } from 'react-toastify';
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import DateInput from "../atoms/formFields/DateInput";
import TextArea from "../atoms/formFields/TextArea";
import { set } from "date-fns";
import ModalPopup from "../../utilities/popup/Popup";
import { t } from "../../translations/Translation";

export default function AddOpenShift({ shiftId, onHide }) {

    const [selectedCompany, setSelectedCompany] = useState("");

    const [location, setLocation] = useState('');
    const [locationList, setlocationList] = useState([]);

    const [workstationList, setWorkstationsList] = useState([]);
    const [workstations, setWorkstations] = useState('');

    const [functionsList, setFunctionsList] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState('');

    const [employeeTypeList, setEmployeeTypeList] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState('');

    const [repeat, setRepeat] = useState(false);
    const [repeatType, setRepeatType] = useState(0)// "0" for only one time

    const [status, setStatus] = useState(1)
    const [isRepeatTypeSelected, setIsRepeatTypeSelected] = useState(false)
    const [dropdownOptions, setDropdownOptions] = useState([])
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState([{
        "name": "",
        "start_date": "",
        "start_time": "",
        "end_time": "",
        "end_date": "",
        "location": "",
        "workstations": "",
        "functions": "",
        "vacancy_count": "",
        "repeat_type": repeatType,
        "employee_types": [],
        "approval_type": "1",
        "extra_info": "",
        "status": "",

    }]);

    useEffect(() => {
        AXIOS.service(OpenShiftApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    if (result.data.length !== 0) {
                        let response = result.data
                        // setDropdownOptions(response)
                        setEmployeeTypeList(response.employeeTypes)
                        setlocationList(response.locations)
                        let shiftData = [...formData]
                        if (response.locations?.length === 1) {
                            shiftData[0]['location'] = response.locations[0].value
                            setLocation(response.locations[0])

                            let locId = response.locations[0].value
                            setWorkstationsList(response.workstations[locId])
                            if (response.workstations[locId]?.length === 1) {
                                shiftData[0]['workstations'] = response.workstations[locId][0].value
                                setWorkstations(response.workstations[locId][0])

                                let wId = response.workstations[locId][0].value
                                setFunctionsList(response.workstationsFunctions[wId])
                                if (response.workstationsFunctions[wId]?.length === 1) {
                                    setSelectedFunction(response.workstationsFunctions[wId][0])
                                    shiftData[0]['functions'] = response.workstationsFunctions[wId][0].value
                                }
                            }
                            setFormData(shiftData)
                        } else {
                            setWorkstations(response.workstations)
                            setFunctionsList(response.workstationsFunctions)
                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    useEffect(() => {
        if (shiftId !== 0 && shiftId !== "") {

            AXIOS.service(OpenShiftApiUrl + "/" + shiftId, 'GET')
                .then((result) => {
                    if (result?.success) {
                        if (result.data.length !== 0) {
                            let response = result.data
                            let data = [{
                                "name": response.name,
                                "start_date": response.start_date,
                                "start_time": response.start_time,
                                "end_time": response.end_time,
                                "end_date": response.end_date,
                                "location": response.location_id,
                                "workstations": response.workstation_id,
                                "functions": response.function_id,
                                "vacancy_count": response.vacancy_count,
                                "repeat_type": response.repeat_type,
                                "employee_types": response.employee_types,
                                "approval_type": "1",
                                "extra_info": response.extra_info,
                                "status": response.status,
                            }]
                            // setFormData((prev) => {
                            //     return data
                            // })
                            setFormData(data)

                            setLocation({ value: response.location_id, label: response.location_name })
                            setRepeatType(response.repeat_type)
                            setWorkstations({ value: response.workstation_id, label: response.workstation_name })
                            setSelectedFunction({ value: response.function_id, label: response.function_name })
                            setEmployeeTypes(response.employee_types)

                        }

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [shiftId])


    const setValues = (index, name, value, type) => {
        let newData = [...formData]
        if (type !== "dropdown") {
            newData[0][name] = value
        } else {
            if (name == "location") {
                newData[0][name] = value.value
                setLocation(value)
            } else if (name == "workstations") {
                newData[0][name] = value.value
                setWorkstations(value)
            } else if (name == "functions") {
                newData[0][name] = value.value
                setSelectedFunction(value)
            } else if (name == "employee_types") {
                setEmployeeTypes(value)
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                newData[0][name] = arr
            }
        }
        setFormData(newData)
    }


    const onConfirm = () => {
        if (formData[0].name) {
            let url = (shiftId !== 0 && shiftId !== "") ? OpenShiftApiUrl + "/" + shiftId : OpenShiftApiUrl
            let method = (shiftId !== 0 && shiftId !== "") ? "PUT" : "POST"
            let data = [...formData]
            data[0].status = 1
            AXIOS.service(url, method, data[0])
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
                        onHide()

                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setErrors(["Please fill required fields"])
        }

    }

    const saveAsDraft = () => {
        let data = [...formData]
        data[0].status = 2

        AXIOS.service(OpenShiftApiUrl, 'POST', data[0])
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
                    onHide()
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onRadioSelect = (type, value) => {
        setRepeatType(value)
        setFormData((prev) =>
            prev.map((item, index) => (
                { ...item, repeat_type: value })
            )
        );
        setIsRepeatTypeSelected(true)
    }

    //to handle switch
    const onRepeatToggle = () => {
        if (!repeat) {
            setRepeat(!repeat)
            setFormData((prev) =>
                prev.map((item, index) => (
                    { ...item, repeat_type: "" })
                )
            );
            setIsRepeatTypeSelected(false)
        } else {
            setRepeat(!repeat)
            setFormData((prev) =>
                prev.map((item, index) => (
                    { ...item, repeat_type: 0 })
                )
            );
        }

    }


    let optionsArray = [{ name: "Daily", key: 1 }, { name: "Weekly", key: 2 }, { name: "Monthly", key: 3 }]

    const formFieldsArray1 = [
        // { title: "Company", name: "company_id", placeholder: "Select..", required: true, type: "dropdown", options: companyList, selectedOptions: selectedCompany, style: "col-md-6 float-left" },
        { title: "Shift name", name: "name", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Start date", name: "start_date", required: true, type: "date", style: "col-md-6 mt-4 float-left" },
        { title: "Start time", name: "start_time", required: true, type: "time", style: "col-md-6 mt-2 float-left" },
        { title: "End time", name: "end_time", required: true, type: "time", style: "col-md-6 mt-2 float-left" },
        { title: 'Location', name: 'location', required: true, options: locationList, isMulti: false, selectedOptions: location, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Workstations', name: 'workstations', required: true, options: workstationList?.length > 0 ? workstationList : workstationList[location?.value], isMulti: false, selectedOptions: workstations, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: "Function", name: "functions", required: true, type: "dropdown", options: functionsList?.length > 0 ? functionsList : functionsList[workstations?.value], selectedOptions: selectedFunction, style: "col-md-6 mt-2 float-left" },
        { title: "Employee type", name: "employee_types", required: true, type: "dropdown", isMulti: true, options: employeeTypeList, selectedOptions: employeeTypes, style: "col-md-6 mt-2 float-left" },
        { title: "Vacancies count", name: "vacancy_count", required: true, type: "text", style: "col-md-6 mt-2 float-left" },

    ]

    const formFieldsArray3 = [
        { title: "Repeat end date", name: "end_date", required: false, type: "date", style: "col-md-6 float-left" },
        { title: 'Extra info', name: 'extra_info', required: false, type: 'text-area', style: "col-md-12 mt-4 float-left" },
    ]

    const form4 = [{ title: 'Extra info', name: 'extra_info', required: false, type: 'text-area', style: "col-md-12 mt-4 float-left" }]


    return (
        <Modal
            show={true}
            onHide={onHide}
            size="xl"
            className=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {('Create open shift')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errors !== undefined && errors.length !== 0 && <ErrorPopup
                    title={('Validation error!')}
                    body={(errors)}
                    onHide={() => setErrors([])}
                ></ErrorPopup>}
                <div className="border">
                    <FormsNew
                        view={""}
                        formTitle={""}
                        data={formFieldsArray1}
                        SetValues={setValues}
                        formattedData={formData[0]}
                    ></FormsNew>
                    <div className="pl-5 d-flex">
                        <Switch label={t("REPEAT")} id="switch4" styleClass="col-md-3 align-self-center row m-0" lableClick={true} onChange={() => onRepeatToggle()} checked={repeat} />

                        {/* <Switch label={t("REPEAT")} id="switch2" styleClass="col-md-3 align-self-center row m-0" onChange={() => onRepeatToggle} ></Switch> */}
                        {repeat && <RadioInput
                            title={''}
                            radiobuttonsList={optionsArray !== undefined ? optionsArray : []}
                            CustomStyle={'d-flex'}
                            selectedOption={repeatType}
                            changeCheckbox={onRadioSelect}
                            type={"repeatType"}
                        ></RadioInput>}

                    </div>
                    <div>
                        <FormsNew
                            view={""}
                            formTitle={""}
                            data={repeat ? formFieldsArray3 : form4}
                            SetValues={setValues}
                            formattedData={formData[0]}
                        ></FormsNew>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-style float-left' onClick={() => onConfirm()}>
                    {'Save'}
                </Button>
                <Button className='button-style float-left' onClick={() => saveAsDraft()}>
                    {'Save as draft'}
                </Button>
                <Button className='button-style' onClick={onHide}>
                    {'Cancel'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}