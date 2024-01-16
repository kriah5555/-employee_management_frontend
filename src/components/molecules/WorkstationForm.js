import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import CustomButton from "../atoms/CustomButton";
import { FunctionApiUrl, GetSectorFunctionsApiUrl, WorkstationApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function WorkstationForm({ workstations, setWorkstations, locationArray, setLocationArray, setWorkstationStatus, view, update_id,
    selectedLocation, setSelectedLocation, selectedFunction, setSelectedFunction, sector }) {

    // const [workstations, setWorkstations] = useState([{
    //     workstation_name: "",
    //     function_titles: [],
    //     sequence_number: "",
    //     locations_index: [],
    //     status: 1
    // }]);
    const [functionOptions, setFunctionOptions] = useState([]);

    //Fetch dropdown data of functions
    useEffect(() => {
        if (view === 'workstation-single') {
            AXIOS.service(WorkstationApiUrl + '/create', 'GET')
                .then((result) => {
                    if (result?.success) {
                        setFunctionOptions(getFormattedDropdownOptions(result.data.function_titles, 'id', 'name'));
                        setLocationArray(getFormattedDropdownOptions(result.data.locations, 'id', 'location_name'));
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            AXIOS.service(GetSectorFunctionsApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setFunctionOptions(getFormattedDropdownOptions(result.data.functions, 'id', 'name'));
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    useEffect(() => {
        if (update_id !== '0' && update_id !== undefined) {
            let editApiUrl = WorkstationApiUrl + '/' + update_id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = [];
                        response.push(result.data);
                        let loc_arr = []
                        let func_arr = []
                        setSelectedLocation(getFormattedDropdownOptions(result.data.locations, 'id', 'location_name'));
                        setSelectedFunction(getFormattedDropdownOptions(result.data.function_titles, 'id', 'name'));
                        let selected_locations = result.data.locations
                        let selected_function_titles = result.data.function_titles
                        selected_locations.map((loc, i) => {
                            loc_arr.push(loc.id);
                        })
                        selected_function_titles.map((func, i) => {
                            func_arr.push(func.id);
                        })
                        response[0]['locations'] = []
                        response[0]['locations'] = loc_arr
                        response[0]['function_titles'] = func_arr
                        setWorkstations(response);
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
        { title: t("WORKSTATION_NAME"), name: "workstation_name", required: false, type: "input_field" },
        { title: t("SEQUENCE_NUMBER"), name: "sequence_number", required: false, type: "input_field" },
        { title: t("LOCATIONS"), name: 'locations_index', options: locationArray, isMulti: true, selectedOptions: selectedLocation, required: false, type: "dropdown" },
        { title: t("FUNCTIONS"), name: "function_titles", options: functionOptions, isMulti: true, selectedOptions: selectedFunction, required: false, type: "dropdown" },
    ];

    return (
        <div className="flex-1">
            {workstations.map((x, i) => {
                return (
                    <div key={x}>
                        {view !== 'workstation-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {workstations.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline pointer" onClick={() => removeWorkstation(i)}>{t("REMOVE")}</p>}
                        </div>}
                        <CompanyForm
                            index={i}
                            view="workstation"
                            title1={view !== 'workstation-single' ? t("ADD_WORKSTATION") : ''}
                            data1={workstationFieldsArray}
                            formattedData1={workstations[i]}
                            SetValues={setValues}
                        ></CompanyForm>
                        {view !== 'workstation-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {i == workstations.length - 1 && <CustomButton buttonName={t("ADD_ANOTHER") + (" + ")} ActionFunction={() => AddNewWorkstation()} CustomStyle="mr-5"></CustomButton>}
                        </div>}
                    </div>
                );
            })}
        </div>
    );
}
