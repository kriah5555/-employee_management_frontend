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

export default function AddOpenShift(props) {

    const [companyList, setCompanyList] = useState([]);
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
        "shift_name": "",
        "start_date": "",
        "start_time": "",
        "end_time": "",
        "end_date": "",
        "location": "",
        "workstations": "",
        "functions": "",
        "count": "",
        "repeat_type": repeatType,
        "employee_types": [],
        "approval_type": "1",
        "extra_info": "",
        "status": "",

    }]);

    useEffect(() => {
        AXIOS.service(ResponsibleCompaniesApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                    if (result.data.length !== 0) {
                        let data = getFormattedDropdownOptions(result.data, "id", "company_name")
                        setCompanyList(data)
                    }

                }
            })
            .catch((error) => {
                console.log(error);
            })

            // if (props.shiftId==0) {

            //     alert("hello")
            // }
            // console.log(props.shiftId);


    }, [])

    useEffect(() => {
        AXIOS.service(OpenShiftApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    if (result.data.length !== 0) {
                        let response = result.data
                        setDropdownOptions(response)
                        if (formData[0]?.company_id) {
                            setlocationList(response.locations)

                        }
                        setEmployeeTypeList(response.employeeTypes)
                    }

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [formData[0]?.company_id])

    // setting options based on location
    useEffect(() => {
        if (formData[0].location !== "" && dropdownOptions.workstations) {
            let id = formData[0]?.location;
            const options = dropdownOptions?.workstations[id] || [];
            setWorkstationsList(options)
            setWorkstations([])
            setSelectedFunction([])
        }
    }, [formData[0]?.location])

    useEffect(() => {
        if (formData[0].workstations !== "" && dropdownOptions.workstationsFunctions) {
            let id = formData[0]?.workstations;
            const options = dropdownOptions?.workstationsFunctions[id] || [];
            setFunctionsList(options)
            setSelectedFunction([])
        }
    }, [formData[0]?.workstations])



    const setValues = (index, name, value, type) => {
        let newData = [...formData]
        if (type !== "dropdown") {
            newData[0][name] = value
            console.log(name, value);
        } else {
            if (name == "company_id") {
                newData[0][name] = value.value
                setSelectedCompany(value)
                props.setHeaderCompanyDropdown(value.value)
                localStorage.setItem('company_id', value.value);
            } else if (name == "location") {
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
        if (formData[0].company_id && formData[0].shift_name) {
            let data = [...formData]
            data[0].status = 1
            AXIOS.service(OpenShiftApiUrl, 'POST', data[0])
                .then((result) => {
                    if (result?.success) {
                        props.setRefresh(!(props.refresh))
                        props.setOpenPopup(false)
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
                        setErrors([result.message[0]])
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setErrors(["Plrease fill required fields"])
        }

    }

    const saveAsDraft = () => {
        let data = [...formData]
        data[0].status = 2

        AXIOS.service(OpenShiftApiUrl, 'POST', data[0])
            .then((result) => {
                if (result?.success) {
                    props.setRefresh(!(props.refresh))
                    props.setOpenPopup(false)
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
                // else {
                //     setErrors([result.message[0]])
                // }
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
    const onChange = () => {
        setRepeat(!repeat)
        setFormData((prev) =>
            prev.map((item, index) => (
                { ...item, repeat_type: 0 })
            )
        );
        if (!repeat) {
            setRepeat(!repeat)
            setFormData((prev) =>
                prev.map((item, index) => (
                    { ...item, repeat_type: "" })
                )
            );
            setIsRepeatTypeSelected(false)
        }
    }


    let optionsArray = [{ name: "Daily", key: 1 }, { name: "Weekly", key: 2 }, { name: "Monthly", key: 3 }]

    const formFieldsArray1 = [
        { title: "Company", name: "company_id", placeholder: "Select..", required: true, type: "dropdown", options: companyList, selectedOptions: selectedCompany, style: "col-md-6 float-left" },
        { title: "Shift name", name: "shift_name", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Start date", name: "start_date", required: true, type: "date", style: "col-md-12 mt-4 float-left" },
    ]

    const formFieldsArray2 = [
        { title: "Start time", name: "start_time", required: true, type: "time", style: "col-md-6 float-left" },
        { title: "End time", name: "end_time", required: true, type: "time", style: "col-md-6  float-left" },
        { title: 'Location', name: 'location', required: true, options: locationList, isMulti: false, selectedOptions: location, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Workstations', name: 'workstations', required: true, options: workstationList, isMulti: false, selectedOptions: workstations, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: "Function", name: "functions", placeholder: "Select..", required: true, type: "dropdown", options: functionsList, selectedOptions: selectedFunction, style: "col-md-6 float-left" },
        { title: "Employee type", name: "employee_types", placeholder: "Select..", required: true, type: "dropdown", isMulti: true, options: employeeTypeList, selectedOptions: employeeTypes, style: "col-md-6 float-left" },
        { title: "Vcancies count", name: "count", required: true, type: "text", style: "col-md-6 mt-4 float-left" },
    ]

    const formFieldsArray3 = repeat ? [
        { title: "Repeat end date", name: "end_date", required: false, type: "date", style: "col-md-6 float-left" },
        { title: 'Extra info', name: 'extra_info', required: false, type: 'text-area', style: "col-md-12 mt-4 float-left" },
    ] : [{ title: 'Extra info', name: 'extra_info', required: false, type: 'text-area', style: "col-md-12 mt-4 float-left" }]


    return (
        <Modal
            show={true}
            onHide={props.onHide}
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
                <div className="popup-tabs border">
                    <FormsNew
                        view={""}
                        formTitle={""}
                        data={formFieldsArray1}
                        SetValues={setValues}
                        formattedData={formData}
                        planIndex={0}
                    >
                    </FormsNew>
                    <FormsNew
                        view={""}
                        formTitle={""}
                        data={formFieldsArray2}
                        SetValues={setValues}
                        formattedData={formData}
                        planIndex={0}
                    >
                    </FormsNew>
                    <div className="col-md-12 pr-0 py-2 px-5 d-flex">
                        <Switch label="Repeat" id="switch4" styleClass="col-md-3 align-self-center row m-0" onChange={onChange} ></Switch>
                        {repeat && <RadioInput
                            title={''}
                            radiobuttonsList={optionsArray !== undefined ? optionsArray : []}
                            CustomStyle={'d-flex'}
                            selectedOption={repeatType}
                            changeCheckbox={onRadioSelect}
                            type={"repeatType"}
                        ></RadioInput>}
                    </div>
                    <FormsNew
                        view={""}
                        formTitle={""}
                        data={formFieldsArray3}
                        SetValues={setValues}
                        formattedData={formData[0]}
                    ></FormsNew>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='button-style float-left' onClick={() => onConfirm()}>
                    {'Save'}
                </Button>
                <Button className='button-style float-left' onClick={() => saveAsDraft()}>
                    {'Save as draft'}
                </Button>
                <Button className='button-style' onClick={props.onHide}>
                    {props.buttonName ? (props.buttonName) : ('Cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}