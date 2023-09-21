import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { ReasonsApiUrl } from "../../routes/ApiEndPoints"
export default function AddReasons() {

    const [reasonsData, setReasonsData] = useState({
        name: "",
        category: "",
        status: "",
    });
    const [category, setCategory] = useState('');
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
        AXIOS.service(ReasonsApiUrl + '/create', 'GET')
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

    // Fetch data of reasons for update
    useEffect(() => {
        if (params.id) {
            let editApiUrl = ReasonsApiUrl + '/' + params.id + '/edit'
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = result.data.details
                        setCategory(response.category)
                        let data = {
                            "name": response.name,
                            "category": category,
                        }
                        setReasonsData(data);
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
        // Reasons fields
        { title: 'Reason name', name: 'name', required: true, type: 'text', style: 'col-md-12 mt-4 float-left' },
        { title: 'Category', name: 'category', required: true, options: dropdownOptions.categories, isMulti: false, selectedOptions: category, type: 'dropdown', isDisabled: params.id !== 0 && params.id !== undefined ? true : false, style: 'col-md-6 mt-2 float-left' },
        { title: 'Status', required: true, type: 'checkbox', checkboxList: checkboxList, changeCheckbox: changeCheckbox, style: 'col-md-12 mt-4 float-left' },
    ];

    // Function to set values of reasons
    const setValues = (index, name, value, field) => {
        const reasons_data = { ...reasonsData };
        if (field !== 'dropdown') {
            reasons_data[name] = value
        } else {
            setCategory(value);
            reasons_data[name] = value.value;
        }
        setReasonsData(reasons_data);
    }

    // On submit function for create and update reasons
    const OnSave = () => {
        if (reasonsData.name) {
            let status = 1
            if (inactive) { status = 0 }

            reasonsData['status'] = status

            // Creation url and method
            let url = ReasonsApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = ReasonsApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for create and updation of reasons
            AXIOS.service(url, method, reasonsData)
                .then((result) => {
                    if (result?.success) {
                        setSuccessMessage(result.message);
                        navigate('/manage-configurations/reasons');
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
            onHide={() => navigate('/manage-configurations/reasons')}
        ></ModalPopup>} */}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <FormsNew
                view="reasons"
                formTitle={'Add Reasons'}
                redirectURL={'/manage-configurations/reasons'}
                formattedData={reasonsData}
                data={reasonFields}
                SetValues={setValues}
                OnSave={OnSave}
            ></FormsNew>
        </div>
    );
}