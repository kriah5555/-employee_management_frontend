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

    const [companyData, setCompanyData] = useState([{
        company_name: "",
        employer_id: "",
        sender_number: "",
        rsz_number: "",
        social_secretary_number: "",
        username: "",
        // phone:"",
        // email:"",
        status: 1,
        sectors: [],
        address: {
            street: "",
            house_no: "",
            postal_code: "",
            city: "",
            country: "",
            status: "1"
        },
        locations: [],
        workstations: [],
    }]);

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



    const setValues = (index, name, value, field) => {
        const company = [...companyData];
        if (index === 'address') {
            company[0][index][name] = value
        } else {
            if (field !== 'dropdown') {
                company[index][name] = value
            } else {
                const sector_arr = [...sector]
                sector_arr.push(value)
                setSector(sector_arr);
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                company[0]['sectors'] = arr
            }
        }
        setCompanyData(company);
    }


    //add company fields 
    const addCompanyFieldsArray = [
        { title: "Company name", name: "company_name", value: companyName, error: companyName ? "" : error, required: true, type: "input_field" },
        { title: "Sector name", options: sectorList, isMulti: true, selectedOptions: sector, error: (sector.length > 0) ? "" : error, required: true, type: "dropdown" },
        { title: "Employer Id", name: "employer_id", value: employerId, error: ``, required: false, type: "input_field" },
        { title: "Sender number", name: "sender_number", value: senderNumber, error: ``, required: false, type: "input_field" },
        { title: "Username", name: "username", value: username, error: ``, required: false, type: "input_field" },
        { title: "RSZ number", name: "rsz_number", value: RSZNumber, error: ``, required: false, type: "input_field" },
        { title: "Social secretary number", name: "social_secretary_number", value: socialSecretaryNumber, error: ``, required: false, type: "input_field" },
    ];
    //adress fields for company
    const companyAddressFieldsArray = [
        { title: "Street", name: "street", value: street, setValue: setStreet, error: street ? "" : error, required: true, type: "input_field" },
        { title: "House Number", name: "house_no", value: houseNum, setValue: setHouseNum, error: houseNum ? "" : error, required: true, type: "input_field" },
        { title: "Postal code", name: "postal_code", value: postalCode, setValue: setPostalCode, error: postalCode ? "" : error, required: true, type: "input_field" },
        { title: "City", name: "city", value: city, setValue: setCity, error: city ? "" : error, required: true, type: "input_field" },
        { title: "Country", name: "country", value: country, setValue: setCountry, error: country ? "" : error, required: true, type: "input_field" },
    ];
    // //responsible person fields for company
    // const companyResponsiblePersonFieldsArray = [
    //     { className: "col-md-6 mb-4", title: "Name", name: "name", required: true, value: name, setValue: setName, placeholder: "Name", error: name ? "" : error, type: "input_field" },
    //     { className: "col-md-6 mb-4", title: "Email Id", name: "email", required: true, value: email, setValue: setEmail, placeholder: "Email Id", error: email ? "" : error, type: "input_field" },
    //     { className: "col-md-6 mb-4", title: "Telephone number", name: "telephone", required: true, value: telephone, setValue: setTelephone, placeholder: "Telephone number", error: telephone ? "" : error, type: "input_field" },
    // ];

    return (
        <div>
            <CompanyForm
                view="company"
                title1={'Add company'}
                index={0}
                data1={addCompanyFieldsArray}
                formattedData1={companyData}
                title2={'Address'}
                data2={companyAddressFieldsArray}
                formattedData2={companyData[0].address}
                // title3={'Responsible person'}
                // data3={companyResponsiblePersonFieldsArray}
                SetValues={setValues}
            ></CompanyForm>
        </div>
    );
}       