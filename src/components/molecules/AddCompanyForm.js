import React, { useState, useEffect } from "react";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import { SectorApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import Forms from "./Forms";
import CompanyForm from "./CompanyForm";

export default function AddCompanyForm() {


    const [companyName, setCompanyName] = useState("");
    const [sector, setSector] = useState([]);
    const [employerId, setEmployerId] = useState("");
    const [senderNumber, setSenderNumber] = useState("");
    const [username, setUsername] = useState("");
    const [RSZNumber, setRSZNumber] = useState("");
    const [socialSecretaryNumber, setSocialSecretaryNumber] = useState("");
    const [street, setStreet] = useState("");
    const [houseNum, setHouseNum] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [postboxNum, setPostboxNum] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [error, setErrorMessage] = useState("");
    const [sectorList, setSectorList] = useState([])

    const navigate = useNavigate();

    // Fetch dropdown data of sectors
    useEffect(() => {
    AXIOS.service(SectorApiUrl, 'GET')
        .then((result) => {
            if (result?.success && result.data.length !== sectorList.length) {
                result.data.map((val, index) => {
                    sectorList.push({ value: val.id, label: val.name })
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    const onSectorChange = (e) => {
        setSector(e);
    }


    //add company fields 
    const addCompanyFieldsArray = [
        { title: "Company name", name: "company_name", value: companyName, setValue: setCompanyName, placeholder: "Company name", error: companyName ? "" : error, required: true, type: "input_field" },
        { title: "Sector name", options: sectorList, isMulti: true, selectedOptions: sector, onSelectFunction: onSectorChange, error: (sector.length > 0) ? "" : error, required: true, type: "dropdown" },
        { title: "Employer Id", name: "employer_id", value: employerId, setValue: setEmployerId, placeholder: "Employer id", error: ``, required: false, type: "input_field" },
        { title: "Sender number", name: "sender_name", value: senderNumber, setValue: setSenderNumber, placeholder: "Sender number", error: ``, required: false, type: "input_field" },
        { title: "Username", name: "username", value: username, setValue: setUsername, placeholder: "Username", error: ``, required: false, type: "input_field" },
        { title: "RSZ number", name: "RSZNumber", value: RSZNumber, setValue: setRSZNumber, placeholder: "RSZ number", error: ``, required: false, type: "input_field" },
        { title: "Social secretary number", name: "socialSecretaryNumber", value: socialSecretaryNumber, setValue: setSocialSecretaryNumber, placeholder: "Social secretary number", error: ``, required: false, type: "input_field" },
    ];
    //adress fields for company
    const companyAddressFieldsArray = [
        { className: "col-md-12 d-block", title: "Street", name: "street", value: street, setValue: setStreet, placeholder: "Street", error: street ? "" : error, required: true, type: "input_field" },
        { className: "col-md-6 mt-4", title: "House Number", name: "house_num", value: houseNum, setValue: setHouseNum, placeholder: "House number", error: houseNum ? "" : error, required: true, type: "input_field" },
        { className: "col-md-6 mt-4", title: "Postal code", name: "postal_code", value: postalCode, setValue: setPostalCode, placeholder: "Postal code", error: postalCode ? "" : error, required: true, type: "input_field" },
        { className: "col-md-6 mt-4", title: "Postbox Number", name: "postbox_num", value: postboxNum, setValue: setPostboxNum, placeholder: "Postbox number", error: postboxNum ? "" : error, required: true, type: "input_field" },
        { className: "col-md-6 mt-4", title: "City", name: "city", value: city, setValue: setCity, placeholder: "City", error: city ? "" : error, required: true, type: "input_field" },
        { className: "col-md-6 mt-4", title: "Country", name: "country", value: country, setValue: setCountry, placeholder: "Country", error: country ? "" : error, required: true, type: "input_field" },
    ];

    //responsible person fields for company
    const companyResponsiblePersonFieldsArray = [
        { className: "col-md-6 mb-4", title: "Name", name: "name", required: true, value: name, setValue: setName, placeholder: "Name", error: name ? "" : error, type: "input_field" },
        { className: "col-md-6 mb-4", title: "Email Id", name: "email", required: true, value: email, setValue: setEmail, placeholder: "Email Id", error: email ? "" : error, type: "input_field" },
        { className: "col-md-6 mb-4", title: "Telephone number", name: "telephone", required: true, value: telephone, setValue: setTelephone, placeholder: "Telephone number", error: telephone ? "" : error, type: "input_field" },
    ];

    return (
        <div>
            <CompanyForm
                view="company"
                title1={'Add company'}
                data1={addCompanyFieldsArray}
                title2={'Address'}
                data2={companyAddressFieldsArray}
                // title3={'Responsible person'}
                // data3={companyResponsiblePersonFieldsArray}
            ></CompanyForm>
        </div>
    );
}       