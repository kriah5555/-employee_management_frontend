import React, { useEffect, useState } from "react";
import { InterimAgencyApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";


export default function AddInterimAgency() {

    const [active, setActive] = useState(true);

    const [inactive, setInactive] = useState(false);

    const [companies, setCompanies] = useState([]);

    const [errors, setErrors] = useState([]);

    const [companiesList, setCompaniesList] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const [interimAgencyData, setInterimAgencyData] = useState({
        "name": '',
        "email": '',
        "companies": [],
        "employer_id": '',
        "sender_number": '',
        "username": '',
        "joint_commissioner_number": '',
        "rsz_number": '',
        "street_house_no": '',
        "postal_code": '',
        "city": '',
        "country": '',
        "status": 1,
    });

    // Status checkbox data
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

    useEffect(() => {
        AXIOS.service(InterimAgencyApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    setCompaniesList(getFormattedDropdownOptions(result.data.companies, 'id', 'company_name'));
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    // Fetch data of employee type for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = InterimAgencyApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data
                        setCompanies(getFormattedDropdownOptions(response.companies, 'id', 'company_name'));
                        let company_ids = []
                        response.companies.map((val, i) => {
                            company_ids.push(val.id)
                        })
                        let data = {
                            "name": response.name,
                            "email": response.email,
                            "companies": company_ids,
                            "employer_id": response.employer_id,
                            "sender_number": response.sender_number,
                            "username": response.username,
                            "joint_commissioner_number": response.joint_commissioner_number,
                            "rsz_number": response.rsz_number,
                            "street_house_no": response.street_house_no,
                            "postal_code": response.postal_code,
                            "city": response.city,
                            "country": response.country,
                            "status": response.status,
                        }
                        setInterimAgencyData(data);
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


    // Interim agency fields data
    const interimAgencyFields = [
        // Interim agency fields
        { title: 'Name', name: 'name', required: true, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: 'Companies', name: 'companies', required: false, options: companiesList, selectedOptions: companies, isMulti: true, type: 'dropdown', style: "col-md-6 mt-2 float-left" },
        { title: 'Email', name: 'email', required: true, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: 'Employer id', name: 'employer_id', required: false, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: 'Sender number', name: 'sender_number', required: false, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: 'Username', name: 'username', required: false, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: 'Joint commissioner number', name: 'joint_commissioner_number', required: false, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: 'RSZ number', name: 'rsz_number', required: false, type: 'text', style: "col-md-6 mt-4 float-left" },
        { title: "Street and house number", name: "street_house_no", required: false, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Postal code", name: "postal_code", required: false, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "City", name: "city", required: false, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: "Country", name: "country", required: false, type: "text", style: "col-md-6 mt-4 float-left" },
        { title: 'Status', required: false, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: "col-md-12 mt-4 mb-2 float-left" },
    ]


    // Function to set values of employee type
    const setValues = (index, name, value, field) => {
        const interim_agency = { ...interimAgencyData };
        if (field !== 'dropdown') {
            if (name === 'rsz_number') {
                if (value.length <= 15) {
                    interim_agency[name] = [2, 5, 8, 12].includes(value.length) ? (value + (value.length === 8 ? '-' : '.')) : value
                }
            } else {
                interim_agency[name] = value
            }
        } else {
            if (name === 'companies') {
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                setCompanies(value);
                interim_agency[name] = arr
            } else {
                interim_agency[name] = value.value
            }
        }
        setInterimAgencyData(interim_agency);
    }

    // On submit function for create and update employee type
    const OnSave = () => {
        if (interimAgencyData.name && interimAgencyData.email) {
            let status = 1
            if (inactive) { status = 0 }

            interimAgencyData['status'] = status

            // Creation url and method
            let url = InterimAgencyApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = InterimAgencyApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of employee types
            AXIOS.service(url, method, interimAgencyData)
                .then((result) => {
                    if (result?.success) {
                        navigate('/manage-configurations/interim-agencies');
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
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="employee_types"
                formTitle={'Add Interim agency'}
                redirectURL={'/manage-configurations/interim-agencies'}
                formattedData={interimAgencyData}
                data={interimAgencyFields}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew>
        </div>
    )
}