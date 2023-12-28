import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { ContractTypeApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";
import { t } from "../../translations/Translation";

export default function AddContractType() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [contractType, setContractType] = useState('');
    const [contractRenewal, setContractRenewal] = useState('');
    const [description, setDescription] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const [renewalList, setRenewalList] = useState([])

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
            name: t("ACTIVE"),
            key: 'active',
            checked: active,
        },
        {
            name: t("INACTIVE"),
            key: 'inactive',
            checked: inactive,
        }
    ]

    //Fetch dropdown data of sectors
    useEffect(() => {
        AXIOS.service(ContractTypeApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    setRenewalList(getFormattedDropdownOptions(result.data.renewal_types));
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch group function data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = ContractTypeApiUrl + '/' + params.id
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setContractType(result.data.name);
                        setDescription(result.data.description);
                        setContractRenewal(getFormattedDropdownOptions(result.data.contract_renewal_type))
                        if (result.data.status) { setActive(true) } else { setInactive(true); setActive(false) }
                    } else {
                        setErrors(result.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])


    // Fields data
    const contract_type_name = {
        title: t("CONTRACT_TYPE_NAME"),
        name: 'contract_type_name',
        placeholder: 'Enter contract type',
        required: true,
        value: contractType,
    }
    const contract_renewal_period = {
        title: t("CONTRACT_RENEWAL_PERIOD"),
        name: 'contract_renewal',
        placeholder: '',
        required: true,
        value: contractRenewal,
        options: renewalList,
        isMulti: false
    }
    const desc = {
        title: t("DESCRIPTION"),
        name: 'description',
        required: false,
        value: description
    }
    const contract_type_status = {
        title: 'Status',
        required: true
    }


    // Type:
    // 1: contract type name
    // 3: contract renewal period
    // 5: Description
    // 6: Active status

    const SetValues = (value, type) => {
        if (type === 1) {
            setContractType(value);
        } else if (type === 3) {
            setContractRenewal(value);
        } else {
            setDescription(value);
        }
    }


    // On submit function for create and update group function
    const OnSave = () => {
        if (contractType && contractRenewal) {
            let status = 1
            if (inactive) { status = 0 }

            let data = {
                'name': contractType,
                'contract_renewal_type_id': contractRenewal.value,
                'description': description,
                'status': status
            }

            // Creation url and method
            let url = ContractTypeApiUrl
            let method = 'POST'

            // Updation url and method
            if (params.id !== undefined) {
                url = ContractTypeApiUrl + '/' + params.id
                method = 'PUT'
            }

            // APICall for creating and updating group function
            AXIOS.service(url, method, data)
                .then((result) => {
                    if (result?.success) {
                        // setSuccessMessage(result.message);
                        navigate('/manage-configurations/contract_type');
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
            setErrors([t("PLEASE_FILL_REQUIRED_FIELDS")])
        }
    }

    return (
        <div className="right-container">
            {/* {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/contract_type')}
            ></ModalPopup>} */}
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={t("VALIDATION_ERROR")}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            <Forms
                formTitle={t("ADD_CONTRACT_TYPE")}
                redirectURL={'/manage-configurations/contract_type'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={contract_type_name}
                field3={contract_renewal_period}
                field5={desc}
                field6={contract_type_status}
                SetValues={SetValues}
                onSave={OnSave}
                view={'contract_type'}
            ></Forms>
        </div>
    )
}