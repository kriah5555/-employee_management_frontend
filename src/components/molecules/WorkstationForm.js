import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import CustomButton from "../atoms/CustomButton";
import { FunctionApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"


export default function WorkstationForm({workstations, setWorkstations, locationArray}) {

    // const [workstations, setWorkstations] = useState([{
    //     workstation_name: "",
    //     function_titles: [],
    //     sequence_number: "",
    //     locations_index: [],
    //     status: 1
    // }]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState([]);

    const locations = [{value: 'loc1', label: 'loc1'}, {value: 'loc2', label: 'loc2'}, {value: 'loc3', label: 'loc3'}]

    const [functionOptions, setFunctionOptions] = useState([]);

    //Fetch dropdown data of functions
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

    const AddNewWorkstation = () => {
        setWorkstations([...workstations, { workstation_name: "",
            function_titles: [],
            sequence_number: "",
            locations_index: [],
            status: 1
    }]);
    }

    const removeWorkstation = (i) => {
        const newWorkstation = [...workstations];
        newWorkstation.splice(i, 1);
        setWorkstations(newWorkstation);
    }


    const setValues = (index, name, value, field) => {
        const workstationArray = [...workstations];

        if (field === 'address') {
            workstationArray[index][field][name] = value
        } else if (field !== 'dropdown') {
            workstationArray[index][name] = value
        } else {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            if (name === 'locations_index') {
                const selected_locations = [...selectedLocation]
                selected_locations[index] = value
                setSelectedLocation(selected_locations);
                workstations[index]['locations_index'] = arr
            } else {
                const selected_functions = [...selectedFunction]
                selected_functions[index] = value
                setSelectedFunction(selected_functions);
                workstations[index]['function_titles'] = arr
            }
        }
        setWorkstations(workstationArray);

    }

    const workstationFieldsArray = [
        { title: "Workstation name", name: "workstation_name", required: false, type: "input_field" },
        { title: "Sequence Number", name: "sequence_number", required: false, type: "input_field" },
        { title: "Locations", name: 'locations_index', options: locationArray, isMulti: true, selectedOptions: selectedLocation, required: false, type: "dropdown" },
        { title: "Functions", name: "function_titles", options: functionOptions, isMulti: true, selectedOptions: selectedFunction, required: false, type: "dropdown" },
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
                            {i == workstations.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => AddNewWorkstation()} CustomStyle="mr-5"></CustomButton>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
