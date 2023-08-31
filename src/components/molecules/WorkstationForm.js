import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import CustomButton from "../atoms/CustomButton";
import { FunctionApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"


export default function WorkstationForm() {

    const [workstations, setWorkstations] = useState([{
        workstation_name: "",
        blocked: "",
        sequence_num: "",
        addFunctions: []
    }]);

    const functions = []

    const [functionOptions, setFunctionOptions] = useState([]);

    //Fetch dropdown data of group functions
    useEffect(() => {
        AXIOS.service(FunctionApiUrl, 'GET')
            .then((result) => {
                if (result?.success && result.data.length !== functionOptions.length) {
                    result.data.map((val) => {
                        functionOptions.push({ value: val.id, label: val.name })
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleAddAnotherWorkstation = () => {
        setWorkstations([...workstations, { workstations_name: "", blocked: "", sequence_num: "", functions: [] }]);
    }

    const removeWorkstation = (i) => {
        const newWorkstation = [...workstations];
        newWorkstation.splice(i, 1);
        setWorkstations(newWorkstation);
    }

    //options for blocked state
    const options = [{ value: 1, label: "Yes" }, { value: 0, label: "No" }];
    //function options api data

    const onBlockedStatusChange = (e) => {
        console.log(e);
    }
    const onFunctionsChange = (e) => {
        setWorkstations();
    }

    const setValues = (index, name, value) => {
        const workstationArray = [...workstations];
        workstationArray[index][name] = value
        setWorkstations(workstationArray);
    }

    const workstationFieldsArray = [
        { title: "Workstation name", name: "workstation_name", placeholder: "Workstation name", required: false, type: "input_field" },
        { title: "Workstation blocked", name: "blocked", options: options, isMulti: false, selectedOptions: workstations, onSelectFunction: onBlockedStatusChange, required: false, type: "dropdown" },
        { title: "Sequence Number", name: "sequence_num", placeholder: "Sequence number", required: false, type: "input_field" },
        { title: "Add functions", name: "functions", options: functionOptions, isMulti: true, selectedOptions: functions, onSelectFunction: onFunctionsChange, required: false, type: "dropdown" },
    ];

    return (
        <div className="">
            {workstations.map((x, i) => {
                return (
                    <div key={x}>
                        <div className="d-flex mb-3 pos-relative justify-content-end">
                            {workstations.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline" onClick={() => removeWorkstation(i)}>Remove</p>}
                        </div>
                        <CompanyForm
                            index={i}
                            view="workstation"
                            title1='Add workstation'
                            data1={workstationFieldsArray}
                            formattedData1={workstations}
                            SetValues={setValues}
                        ></CompanyForm>
                        <div className="d-flex mb-3 pos-relative justify-content-end">
                            {i == workstations.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => handleAddAnotherWorkstation()} CustomStyle="mr-5"></CustomButton>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
