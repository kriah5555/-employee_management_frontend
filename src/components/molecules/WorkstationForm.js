import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import CustomButton from "../atoms/CustomButton";
import { FunctionApiUrl, WorkstationApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"


export default function WorkstationForm({ workstations, setWorkstations, locationArray, setLocationArray, setWorkstationStatus, view, update_id }) {

    // const [workstations, setWorkstations] = useState([{
    //     workstation_name: "",
    //     function_titles: [],
    //     sequence_number: "",
    //     locations_index: [],
    //     status: 1
    // }]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState([]);
    const [functionOptions, setFunctionOptions] = useState([]);

    //Fetch dropdown data of functions
    useEffect(() => {
        AXIOS.service(WorkstationApiUrl + '/create/1', 'GET')
            .then((result) => {
                if (result?.success) {
                    setFunctionOptions(result.data.function_titles);
                    setLocationArray(result.data.locations);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        if (update_id !== '0') {
            let editApiUrl = WorkstationApiUrl + '/' + update_id + '/edit'
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = [];
                        response.push(result.data.details);
                        let loc_arr = []
                        let func_arr = []
                        let selected_locations = result.data.details.locations_value
                        let selected_function_titles = result.data.details.function_titles_value
                        selected_locations.map((loc, i) => {
                            loc_arr.push(loc.value);
                        })
                        selected_function_titles.map((func, i) => {
                            func_arr.push(func.value);
                        })
                        response[0]['locations'] = []
                        response[0]['locations'] = loc_arr
                        response[0]['function_titles'] = func_arr
                        setWorkstations(response);
                        setSelectedLocation(result.data.details.locations_value);
                        setSelectedFunction(result.data.details.function_titles_value);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    // Add new workstation function
    const AddNewWorkstation = () => {
        setWorkstations([...workstations, {
            workstation_name: "",
            function_titles: [],
            sequence_number: "",
            locations_index: [],
            status: 1
        }]);
    }

    // Remove workstation Function
    const removeWorkstation = (i) => {
        const newWorkstation = [...workstations];
        newWorkstation.splice(i, 1);
        setWorkstations(newWorkstation);
    }

    // Set new values based on index
    const setValues = (index, name, value, field) => {
        if (value === '' || value.length === 0) {
            setWorkstationStatus(false)
        } else {
            setWorkstationStatus(true)
        }

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
                // const selected_locations = [...selectedLocation]
                // selected_locations[index] = value
                setSelectedLocation(value);
                workstations[index]['locations'] = arr
                workstations[index]['locations_index'] = arr
            } else {
                // const selected_functions = [...selectedFunction]
                // selected_functions[index] = value
                setSelectedFunction(value);
                workstations[index]['function_titles'] = arr
            }
        }
        setWorkstations(workstationArray);
    }

    // Workstation default fields array
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
                        {view !== 'workstation-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {workstations.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline" onClick={() => removeWorkstation(i)}>Remove</p>}
                        </div>}
                        <CompanyForm
                            index={i}
                            view="workstation"
                            title1={view !== 'workstation-single' ? 'Add workstation' : ''}
                            data1={workstationFieldsArray}
                            formattedData1={workstations}
                            SetValues={setValues}
                        ></CompanyForm>
                        {view !== 'workstation-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {i == workstations.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => AddNewWorkstation()} CustomStyle="mr-5"></CustomButton>}
                        </div>}
                    </div>
                );
            })}
        </div>
    );
}
