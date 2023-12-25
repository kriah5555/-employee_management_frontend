import React, { useState, useEffect } from "react";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { CostCenterApiUrl } from "../../routes/ApiEndPoints"
import CompanyForm from "../molecules/CompanyForm";
import CustomButton from "../atoms/CustomButton";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";


export default function AddCostCenterForm() {

    const [costCenterData, setCostCenterData] = useState([{
        "name": "",
        "company_id": 1,
        "cost_center_number": "",
        "location_id": "",
        "status": "",
        "workstations": [],
        "employees": [],
    }]);

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
        AXIOS.service(CostCenterApiUrl + '/create', 'GET')
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

    // setting options based on location
    useEffect(() => {
        if (costCenterData[0].location_id !== "" && dropdownOptions.workstations) {
            let id = costCenterData[0].location_id;
            const options = getFormattedDropdownOptions(dropdownOptions.workstations[id], "id", "workstation_name") || [];
            setWorkstationsOptions(options)
            setWorkstations([])
        }
    }, [costCenterData[0]?.location_id])

    // Fetch data of cost center for update
    useEffect(() => {
        if (params.id && params.id != 0) {
            let editApiUrl = CostCenterApiUrl + '/' + params.id
            // Api call to get details from data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data
                        setLocation([{ value: response.location?.['id'], label: response.location?.['location_name'] }])
                        setWorkstations(getFormattedDropdownOptions(response.workstations, "id", "workstation_name"));
                        let work_stations = []
                        let workstationList = getFormattedDropdownOptions(response.workstations, "id", "workstation_name")
                        workstationList.map((val, i) => {
                            work_stations.push(val.value)
                        });
                        setEmployees(response?.employees?.employees||[])
                        let selected_employees = []
                        response.employees_value?.map((val, i) => {
                            selected_employees.push(val.value)
                        })
                        let data = [{
                            "name": response.name,
                            "company_id": response.company_id,
                            "cost_center_number": response.cost_center_number,
                            "cost_center_id": response.id,
                            "location_id": response.location?.id,
                            "workstations": work_stations,
                            "employees": selected_employees,
                            "status": response.status,
                        }]
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

    const location_options = getFormattedDropdownOptions(dropdownOptions.locations, 'id', 'location_name');

    const costCenterFields = [
        // cost center fields
        { title: 'Name', name: 'name', required: true, type: 'input_field', style: 'col-md-6 mt-4 float-left' },
        { title: 'Cost center number', name: 'cost_center_number', required: true, type: "input_field", style: 'col-md-6 mt-4 float-left' },
        { title: 'Location', name: 'location_id', required: true, options: getFormattedDropdownOptions(dropdownOptions.locations, "id", "location_name"), isMulti: false, selectedOptions: location, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Workstations', name: 'workstations', required: true, options: workstationOptions, isMulti: true, selectedOptions: workstations, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Employees', name: 'employees', required: false, options: getFormattedDropdownOptions(dropdownOptions.employees, "employee_profile_id", "full_name"), isMulti: true, selectedOptions: employees, type: 'dropdown', style: 'col-md-6 mt-2 float-left' },
        { title: 'Status', required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
    ];

    // Function to set values of cost center
    const setValues = (index, name, value, field) => {
        const cost_center_data = [...costCenterData];
        if (field !== 'dropdown') {
            cost_center_data[0][name] = value
        } else {
            if (name === 'workstations' || name === 'employees') {
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                name === "workstations" ? setWorkstations(value) : setEmployees(value);
                cost_center_data[0][name] = arr
            } else {
                setLocation(value);
                cost_center_data[0][name] = value.value;
            }

        }
        setCostCenterData(cost_center_data);
    }

    // On submit function for create and update cost center
    const OnSave = () => {
        if (costCenterData[0].name) {
            let status = 1
            if (inactive) { status = 0 }

            costCenterData[0]['status'] = status

            // Creation url and method
            let url = CostCenterApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined && params.id != 0) {
                url = CostCenterApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of cost center
            AXIOS.service(url, method, costCenterData[0])
                .then((result) => {
                    if (result?.success) {
                        setSuccessMessage(result.message);
                        navigate('/manage-companies#' + 'cost_center');
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
        <>
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <CompanyForm
                data1={costCenterFields}
                formattedData1={costCenterData[0]}
                SetValues={setValues}
                index={0}
            ></CompanyForm>
            <div className="col-md-12 my-4 text-right pr-5">
                <CustomButton buttonName={'Save'} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies#' + params.addType)} CustomStyle="mr-3"></CustomButton>
            </div>
        </>
    )
}
