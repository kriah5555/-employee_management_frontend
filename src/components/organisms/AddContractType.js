import React, { useEffect, useState } from "react";
import Forms from "../molecules/Forms";
import { ContractTypeApiUrl, GroupFunctionApiUrl, SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import ModalPopup from "../../utilities/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";

export default function AddContractType() {

    const [active, setActive] = useState(true);
    const [inactive, setInactive] = useState(false);

    const [contractType, setContractType] = useState('');
    const [contractRenewal, setContractRenewal] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [titleError, SetTitleError] = useState('');
    const [contractRenewalError, setContractRenewalError] = useState('');

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

    //Fetch dropdown data of sectors
    useEffect(() => {
        AXIOS.service(ContractTypeApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    let renewals = Object.entries(result.data.renewal_types);
                    if (renewals.length !== renewalList.length) {
                        renewals.map((val, index) => {
                            renewalList.push({ value: val[0], label: val[1] })
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Fetch group function data based on param id to add default inputs
    useEffect(() => {
        if (params.id) {
            let editApiUrl = ContractTypeApiUrl + '/' + params.id +'/edit'
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setContractType(result.data.details.name);
                        setDescription(result.data.details.description);
                        setContractRenewal(result.data.details.renewal)
                        if (result.data.details.status) { setActive(true) } else { setInactive(true); setActive(false) }

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])


    // Fields data
    const contract_type_name = {
        title: 'Contract type name',
        name: 'contract_type_name',
        placeholder: 'Enter contract type',
        required: true,
        value: contractType,
    }
    const contract_renewal_period = {
        title: 'Contract renewal period',
        name: 'contract_renewal',
        placeholder: '',
        required: true,
        value: contractRenewal,
        options: renewalList,
        isMulti: false
    }
    const desc = {
        title: 'Description',
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
            if (value) { SetTitleError(''); } else { SetTitleError('Required'); }
        } else if (type === 3) {
            setContractRenewal(value);
            if (value) { setContractRenewalError(''); } else { setContractRenewalError('Required'); }
        } else {
            setDescription(value);
        }
    }


    // On submit function for create and update group function
    const OnSave = () => {

        if (contractType === '') {
            SetTitleError('Required');
        }
        if (contractRenewal === '') {
            setContractRenewalError('Required');
        }


        if (contractType && contractRenewal) {

            let status = 1
            if (inactive) { status = 0 }

            let data = {
                'name': contractType,
                'renewal': contractRenewal.value,
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
                        setSuccessMessage(result.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="right-container">
            {successMessage && <ModalPopup
                title={('SUCCESS')}
                body={(successMessage)}
                onHide={() => navigate('/manage-configurations/contract_type')}
            ></ModalPopup>}
            <Forms
                formTitle={'Add Contract type'}
                redirectURL={'/manage-configurations/contract_type'}
                changeCheckbox={changeCheckbox}
                checkboxList={checkboxList}
                field1={contract_type_name}
                field3={contract_renewal_period}
                field5={desc}
                field6={contract_type_status}
                error1={titleError}
                error3={contractRenewalError}
                SetValues={SetValues}
                onSave={OnSave}
                view={'contract_type'}
            ></Forms>
        </div>
    )
}