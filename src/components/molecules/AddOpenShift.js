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
import BackIcon from "../../static/icons/BackIcon.png"

import { t } from "../../translations/Translation";

export default function AddOpenShift({ shiftId, onHide, createData }) {

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

    const [isRepeatTypeSelected, setIsRepeatTypeSelected] = useState(false)
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

        let response = createData
        setEmployeeTypeList(response?.employeeTypes)
        setlocationList(response?.locations)
        let shiftData = [...formData]
        if (response?.locations?.length === 1) {
            shiftData[0]['location'] = response?.locations[0].value
            setLocation(response?.locations[0])

            let locId = response?.locations[0].value
            setWorkstationsList(response?.workstations[locId])
            if (response.workstations[locId]?.length === 1) {
                shiftData[0]['workstations'] = response.workstations[locId][0].value
                setWorkstations(response.workstations[locId][0])

                let wId = response.workstations[locId][0].value
                setFunctionsList(response.workstationsFunctions[wId])
                if (response.workstationsFunctions[wId]?.length === 1) {
                    setSelectedFunction(response.workstationsFunctions[wId][0])
                    shiftData[0]['functions'] = response.workstationsFunctions[wId][0].value
                }
            } else {
                setFunctionsList(response.workstationsFunctions)

            }
            setFormData(shiftData)
        } else {
            setWorkstationsList(response.workstations)
            setFunctionsList(response.workstationsFunctions)
        }

    }, [createData])


    useEffect(() => {
        if (shiftId !== 0 && shiftId !== "") {

            AXIOS.service(OpenShiftApiUrl + "/" + shiftId, 'GET')
                .then((result) => {
                    if (result?.success) {
                        if (result.data.length !== 0) {
                            let response = result.data
                            let data = [...formData]
                            data[0]["name"] = response.name
                            data[0]["start_date"] = response.start_date
                            data[0]["start_time"] = response.start_time
                            data[0]["end_time"] = response.end_time
                            data[0]["end_date"] = response.end_date
                            data[0]["location"] = response.location_id
                            data[0]["workstations"] = response.workstation_id
                            data[0]["functions"] = response.function_id
                            data[0]["vacancy_count"] = response.vacancy_count
                            data[0]["repeat_type"] = response.repeat_type
                            data[0]["employee_types"] = response.employee_types
                            data[0]["approval_type"] = "1"
                            data[0]["extra_info"] = response.extra_info
                            data[0]["status"] = response.status

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
    }, [])


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
            setErrors([t("PLEASE_FILL_REQUIRED_FIELDS")])
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


    let optionsArray = [{ name: t("DAILY"), key: 1 }, { name: t("WEEKLY"), key: 2 }] //, { name: t("MONTHLY"), key: 3 }

    const formFieldsArray1 = [
        // { title: "Company", name: "company_id", placeholder: "Select..", required: true, type: "dropdown", options: companyList, selectedOptions: selectedCompany, style: "col-md-6 float-left" },
        { title: t("SHIFT_NAME"), name: "name", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: t("START_DATE"), name: "start_date", required: true, type: "date", style: "col-md-6 mt-4 float-left" },
        { title: t("START_TIME"), name: "start_time", required: true, type: "time", style: "col-md-6 mt-3 float-left" },
        { title: t("END_TIME"), name: "end_time", required: true, type: "time", style: "col-md-6 mt-3 float-left" },
        { title: t("LOCATION"), name: 'location', required: true, options: locationList, isMulti: false, selectedOptions: location, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: t("WORKSTATION"), name: 'workstations', required: true, options: workstationList?.length > 0 ? workstationList : workstationList !== undefined ? workstationList[location?.value] : [], isMulti: false, selectedOptions: workstations, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: t("FUNCTION_TITLE"), name: "functions", required: true, type: "dropdown", options: functionsList?.length > 0 ? functionsList : functionsList !== undefined ? functionsList[workstations?.value] : [], selectedOptions: selectedFunction, style: "col-md-6 mt-2 float-left" },
        { title: t("EMPLOYEE_TYPE"), name: "employee_types", required: true, type: "dropdown", isMulti: true, options: employeeTypeList, selectedOptions: employeeTypes, style: "col-md-6 mt-2 float-left" },
        { title: t("VACANCIES_COUNT"), name: "vacancy_count", required: true, type: "text", style: "col-md-6 mt-3 float-left" },

    ]

    const formFieldsArray3 = [
        { title: t("REPEAT_END_DATE"), name: "end_date", required: false, type: "date", style: "col-md-6 float-left" },
        { title: t("EXTRA_INFO"), name: 'extra_info', required: false, type: 'text-area', style: "col-md-12 mt-4 float-left" },
    ]

    const form4 = [{ title: t("EXTRA_INFO"), name: 'extra_info', required: false, type: 'text-area', style: "col-md-12 mt-4 float-left" }]


    return (
        <div className="d-flex flex-column h-100">
            <div className="d-flex my-2 py-2 bg-white">
                <div className="col-md-10">
                    <h4 className="mb-0"><img className="shortcut-icon mr-2 mb-1 pointer" onClick={() => onHide()} src={BackIcon}></img>{t('CREATE_OPEN_SHIFT')}</h4>
                </div>
            </div>
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR") + ('!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <div className="bg-white mb-2 d-flex flex-column flex-1 overflow-auto">
                <div className="h-100 overflow-auto">
                    <FormsNew
                        view={""}
                        formTitle={""}
                        data={formFieldsArray1}
                        SetValues={setValues}
                        formattedData={formData[0]}
                    ></FormsNew>

                    <div className="pl-5 d-flex margin-minus">
                        <Switch label={t("REPEAT")} id="switch4" styleClass="col-md-1 align-self-center row m-0" lableClick={true} onChange={() => onRepeatToggle()} checked={repeat} />
                        {repeat && <RadioInput
                            title={''}
                            radiobuttonsList={optionsArray !== undefined ? optionsArray : []}
                            CustomStyle={'d-flex mt-3 ml-4'}
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
                <div className="my-3">
                    <Button className='mr-3 mb-2 button-style float-right' onClick={() => onConfirm()}>
                        {t("SAVE")}
                    </Button>
                    <Button className='mr-3 mb-2 button-style float-right' onClick={() => saveAsDraft()}>
                        {t("SAVE_AS_DRAFT")}
                    </Button>
                    <Button className='ml-3 mb-2 button-style' onClick={() => onHide()}>
                        {t("BACK_LINK")}
                    </Button>
                </div>
            </div>
        </div>
    )
}