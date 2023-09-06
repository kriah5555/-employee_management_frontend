import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import CompanyForm from "./CompanyForm";

export default function AddCompanyForm({companyData, setCompanyData}) {


    const [sector, setSector] = useState([]);
    const [error, setErrorMessage] = useState("");
    const [sectorList, setSectorList] = useState([])

    const navigate = useNavigate();

    // const [companyData, setCompanyData] = useState([{
    //     company_name: "",
    //     employer_id: "",
    //     sender_number: "",
    //     rsz_number: "",
    //     social_secretary_number: "",
    //     username: "",
    //     status: 1,
    //     sectors: [],
    //     address: {
    //         street_house_no: "",
    //         postal_code: "",
    //         city: "",
    //         country: "",
    //         status: "1"
    //     },
    //     locations: [],
    //     workstations: [],
    // }]);

    // Fetch dropdown data of sectors
    useEffect(() => {
        AXIOS.service(CompanyApiUrl + '/create', 'GET')
            .then((result) => {
                if (result?.success) {
                    setSectorList(result.data.sectors)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])



    const setValues = (index, name, value, field) => {
        const company = [...companyData];
        if (field === 'address') {
            company[0][field][name] = value
        } else if (field !== 'dropdown') {
            company[index][name] = value
        } else {
            // const sector_arr = [...sector]
            // sector_arr.push(value)
            setSector(value);
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            company[0]['sectors'] = arr
        }

        setCompanyData(company);
    }


    //add company fields 
    const addCompanyFieldsArray = [
        { title: "Company name", name: "company_name", required: true, type: "input_field" },
        { title: "Sector name", options: sectorList, isMulti: true, selectedOptions: sector, error: (sector.length > 0) ? "" : error, required: true, type: "dropdown" },
        { title: "Email", name: "email", required: true, type: "input_field" },
        { title: "Phone number", name: "phone", required: true, type: "input_field" },
        { title: "Employer Id", name: "employer_id", type: "input_field" },
        { title: "Sender number", name: "sender_number", required: false, type: "input_field" },
        { title: "Username", name: "username", required: false, type: "input_field" },
        { title: "RSZ number", name: "rsz_number", required: false, type: "input_field" },
        { title: "Social secretary number", name: "social_secretary_number", required: false, type: "input_field" },
    ];
    //adress fields for company
    const companyAddressFieldsArray = [
        { title: "Street and house number", name: "street_house_no", required: true, type: "input_field" },
        { title: "Postal code", name: "postal_code", required: true, type: "input_field" },
        { title: "City", name: "city", required: true, type: "input_field" },
        { title: "Country", name: "country", required: true, type: "input_field" },
    ];


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
                formattedData2={companyData}
                SetValues={setValues}
            ></CompanyForm>
        </div>
    );
}       