import React, { useEffect, useState } from "react";
import DeleteIcon from "../../static/icons/Delete.svg"
import AddIcon from "../../static/icons/AddPlusIcon.png";
import { BASE_URL, EmployeeTypeApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";

export default function AddEmployeeFunctionSalaries({ tabIndex, options, functionSalaries, setFunctionSalaries, locationTransport, setLocationTransport, functions, setFunctions, locations, setLocations, commute, setCommute, employeeContracts, setEmployeeContracts, }) {

    const FunctionSalariesHeaders = [
        { title: 'Function', style: 'col-md-3 pl-3' },
        { title: 'Minimum salary', style: 'col-md-2 text-center' },
        { title: 'Salary to be paid', style: 'col-md-3 text-center' },
        { title: 'Experience', style: 'col-md-2 text-center' },
        { title: 'Actions', style: 'col-md-2 text-right pr-5' },
    ]

    const TransportationHeaders = [
        { title: 'Location', style: 'col-md-3 pl-3' },
        { title: 'Commute', style: 'col-md-3 text-center' },
        { title: 'Distance(kms)', style: 'col-md-3 text-center' },
        { title: 'Actions', style: 'col-md-3 text-right pr-5' },
    ]

    const headers = (tabIndex === 2 ? FunctionSalariesHeaders : TransportationHeaders)
    const [rows, setRows] = useState([1])


    // Function to add new row in experience/age tab
    const AddNewRow = (type) => {
        const rowsInput = 1;
        // Adding empty object for each row on add row click
        if (tabIndex === 2) {
            const rowData = {
                'function_id': '',
                'min_salary': '',
                'salary': '',
                'experience': 0,
            }
            setFunctionSalaries([...functionSalaries, rowData])

        } else {
            const rowData = {
                'location_id': '',
                'commute_type_id': '',
                'distance': '',
            }
            setLocationTransport([...locationTransport, rowData])

        }
        if (rows !== undefined) {
            setRows([...rows, rowsInput])
        }
    }

    // Function to delete each row in function_salaries/transport tab
    function DeleteRow(index) {
        if (tabIndex === 2) {
            // Remove data from experience data
            const rows = [...functionSalaries];
            rows.splice(index, 1);
            setFunctionSalaries(rows);

        } else {
            // Remove data from age data
            const rows = [...locationTransport];
            rows.splice(index, 1);
            setLocationTransport(rows);
        }
        const data = [...rows];
        data.splice(index, 1);
        setRows(data);
    }

    const fetchMinSalary = (id, experience, index) => {
        let data = {
            "employee_type_id": employeeContracts.employee_type_id,
            "employee_subtype": employeeContracts["sub_type"],
            "function_title_id": id,
            "experience_in_months": experience,
        }

        let url = BASE_URL + '/masterdata/employee-function-salary-option'
        AXIOS.service(url, "POST", data)
            .then((result) => {
                if (result?.success) {
                    let response = result.data.minimumSalary
                    let function_salaries = [...functionSalaries]
                    let row = functionSalaries[index]
                    row["min_salary"] = response
                    function_salaries[index] = row
                    setFunctionSalaries(function_salaries)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (employeeContracts["employee_type_id"] != "" && employeeContracts["sub_type"] != "" && tabIndex === 2) {
            functionSalaries.map((obj, index) => {

                fetchMinSalary(obj["function_id"], obj["experience"], index)

            })
        }
        if (tabIndex === 2) setRows(functionSalaries)
    }, [])

    const SetValues = (value, type, index) => {
        const index_data = tabIndex === 2 ? [...functionSalaries] : [...locationTransport]
        if (type === 'function') {
            const data = [...functions]
            data[index] = value
            setFunctions(data)

            index_data[index]['function_id'] = value.value
            setFunctionSalaries(index_data)
            fetchMinSalary(functionSalaries[index]["function_id"], functionSalaries[index]["experience"], index)
        } else if (type === 'salary') {
            index_data[index]['salary'] = value
            setFunctionSalaries(index_data)
        } else if (type === 'experience') {
            index_data[index]['experience'] = value
            setFunctionSalaries(index_data)
            fetchMinSalary(functionSalaries[index]["function_id"], functionSalaries[index]["experience"], index)
        } else if (type === 'location') {
            const data = [...locations]
            data[index] = value
            setLocations(data)

            index_data[index]['location_id'] = value.value
            setLocationTransport(index_data)
        } else if (type === 'commute') {
            const data = [...commute]
            data[index] = value
            setCommute(data)

            index_data[index]['commute_type_id'] = value.value
            setLocationTransport(index_data)
        } else if (type === 'distance') {
            index_data[index]['distance'] = value
            setLocationTransport(index_data)
        }


    }


    return (
        <div className="d-flex p-3">
            <div className="col-md-12 px-0 border">
                <div className="row col-md-12 table-head-bg p-2 m-0">
                    {headers.map((head, i) => {
                        return (
                            <div className={head.style} key={head.title}>
                                <p className="mb-0 font-weight-bold">{head.title}</p>
                            </div>
                        )
                    })}
                </div>

                {rows.map((val, index) => {
                    return (
                        <div className="row col-md-12 p-3 m-0 border-bottom" key={index}>
                            <div className="col-md-3 pl-0">
                                <Dropdown
                                    options={tabIndex === 2 ? getFormattedDropdownOptions(options.functions) : getFormattedDropdownOptions(options.locations, 'id', 'location_name')}
                                    selectedOptions={tabIndex === 2 ? functions[index] : locations[index]}
                                    onSelectFunction={(e) => SetValues(e, (tabIndex === 2 ? 'function' : 'location'), index)}
                                    CustomStyle="col-md-8 pl-0 float-left"
                                    title={''}
                                    required={false}
                                    isMulti={false}
                                    error={''}
                                    styleMargin={''}
                                ></Dropdown>
                            </div>
                            {tabIndex === 2 && <div className="col-md-2">
                                <div className="row m-0 justify-content-center">
                                    <TextInput
                                        key={'min_salary' + val}
                                        title={''}
                                        name={'min_salary'}
                                        CustomStyle={"col-md-12 float-left"}
                                        required={false}
                                        value={functionSalaries[index]['min_salary']}
                                        setValue={(e) => SetValues(e, 'min_salary', index)}
                                        disabled={true}
                                    // error={''}
                                    ></TextInput>
                                </div>
                            </div>}
                            {tabIndex === 2 && <div className="col-md-3">
                                <div className="row m-0 justify-content-center">
                                    <TextInput
                                        key={'function' + val}
                                        title={''}
                                        name={'salary'}
                                        CustomStyle={"col-md-8 float-left"}
                                        required={false}
                                        value={functionSalaries[index]['salary']}
                                        setValue={(e) => SetValues(e, 'salary', index)}
                                    // error={''}
                                    ></TextInput>
                                </div>
                            </div>}
                            {tabIndex === 3 && <div className="col-md-3">
                                <div className="row m-0 justify-content-center">
                                    <Dropdown
                                        options={getFormattedDropdownOptions(options.commute_type_options)}
                                        selectedOptions={commute[index]}
                                        onSelectFunction={(e) => SetValues(e, 'commute', index)}
                                        CustomStyle="col-md-8 pl-0 float-left"
                                        title={''}
                                        required={false}
                                        isMulti={false}
                                        error={''}
                                        styleMargin={''}
                                    ></Dropdown>
                                </div>
                            </div>}
                            <div className={tabIndex === 3 ? "col-md-3" : "col-md-2"}>
                                <div className="row m-0 justify-content-center">
                                    <TextInput
                                        key={'location' + val}
                                        title={''}
                                        name={'experience'}
                                        CustomStyle={tabIndex === 3 ? "col-md-8 float-left" : "col-md-12 float-left"}
                                        required={false}
                                        value={tabIndex === 2 ? functionSalaries[index]['experience'] : locationTransport[index]['distance']}
                                        setValue={(e) => SetValues(e, (tabIndex === 2 ? 'experience' : 'distance'), index)}
                                    // error={''}
                                    ></TextInput>
                                </div>
                            </div>
                            {index === rows.length - 1 && <div className={tabIndex === 3 ? "col-md-3 text-right pr-4" : "col-md-2 text-right pr-4"}>
                                {<img className="header-icon mr-4" src={AddIcon} onClick={() => AddNewRow()}></img>}
                                {rows.length > 1 && <img className="header-icon" src={DeleteIcon} onClick={() => DeleteRow(index)}></img>}
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
