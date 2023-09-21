import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { CostCenterApiUrl } from "../../routes/ApiEndPoints"

export default function AddCostCenter() {

    const [costCenterData, setCostCenterData] = useState({
        "name": "",
        "company_id": 1,
        "cost_center_number": "",
        "location_id": "",
        "status": "",
        "workstations": [],
        "employees": [],
    });

    //for dropdown options
    const [location, setLocation] = useState('');
    const [workstationOptions, setWorkstationsOptions] = useState([]);
    const [workstations, setWorkstations] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState({});

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    // Checkbox status data
    const changeCheckbox = (type) => {
        if (type === 'active') {
            setActive(true);
            setInactive(false);
        } else {
            setActive(false);
            setInactive(true);
        }
    }
    const checkboxList = [
        {
            name: 'Active',
            key: 'active',
            checked: active,
        },
        {
            name: 'Inactive',
            key: 'inactive',
            checked: inactive,
        }
    ]

    // Fetch options for dropdown
    useEffect(() => {
        AXIOS.service(CostCenterApiUrl + '/create/1', 'GET')
            .then((result) => {
                if (result?.success) {
                    let resp = result.data
                    setDropdownOptions(resp);
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    //setting options based on location
    useEffect(() => {
        if (costCenterData.location_id !== "" && dropdownOptions.workstations) {
            let id = costCenterData.location_id;
                const options = dropdownOptions.workstations[id] || [];
                setWorkstationsOptions(options)
                setWorkstations([])
        }
    }, [costCenterData.location_id])

    // Fetch data of cost center for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = CostCenterApiUrl + '/' + params.id + '/edit'
            // Api call to get details from data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data.details
                        setLocation(response.location_value)
                        setWorkstations(response.workstations_value);
                        let work_stations = []
                        response.workstations_value.map((val, i) => {
                            work_stations.push(val.value)
                        });
                        setEmployees(response.employees_value)
                        let selected_employees = []
                        response.employees_value.map((val, i) => {
                            selected_employees.push(val.value)
                        })
                        let data = {
                            "name": response.name,
                            "company_id": response.company_id,
                            "cost_center_number": response.cost_center_number,
                            "cost_center_id": response.id,
                            "location_id": response.location_value.value,
                            "workstations": work_stations,
                            "employees": selected_employees,
                            "status": response.status,
                        }
                        setCostCenterData(data);
                        if (response.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    const reasonFields = [
        // cost center fields
        { title: 'Name', name: 'name', required: true, type: 'text', style: 'col-md-6 mt-4 float-left' },
        { title: 'Cost center number', name: 'cost_center_number', required: true, type: "text", style: 'col-md-6 mt-4 float-left' },
        { title: 'Location', name: 'location_id', required: true, options: dropdownOptions.locations, isMulti: false, selectedOptions: location, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Workstations', name: 'workstations', required: true, options: workstationOptions, isMulti: true, selectedOptions: workstations, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Employees', name: 'employees', required: false, options: dropdownOptions.employees, isMulti: true, selectedOptions: employees, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Status', required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
    ];

    // Function to set values of cost center
    const setValues = (index, name, value, field) => {
        const cost_center_data = { ...costCenterData };
        if (field !== 'dropdown') {
            cost_center_data[name] = value
        } else {
            if (name === 'workstations' || name === 'employees') {
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                name === "workstations" ? setWorkstations(value) : setEmployees(value);
                cost_center_data[name] = arr
            } else {
                setLocation(value);
                cost_center_data[name] = value.value;
            }

        }
        setCostCenterData(cost_center_data);
    }

    // On submit function for create and update cost center
    const OnSave = () => {
        if (costCenterData.name) {
            let status = 1
            if (inactive) { status = 0 }

            costCenterData['status'] = status

            // Creation url and method
            let url = CostCenterApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = CostCenterApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of cost center
            AXIOS.service(url, method, costCenterData)
                .then((result) => {
                    if (result?.success) {
                        setSuccessMessage(result.message);
                        navigate('/manage-configurations/cost_center');
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
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setErrors(['Please fill required fields'])
        }
    }
    return (
        <div className="right-container">
            {/* {successMessage && <ModalPopup
            title={('SUCCESS')}
            body={(successMessage)}
            onHide={() => navigate('/manage-configurations/cost_center')}
        ></ModalPopup>} */}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="cost center"
                formTitle={'Add cost center'}
                redirectURL={'/manage-configurations/cost_center'}
                formattedData={costCenterData}
                data={reasonFields}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew>
        </div>
    );
}
