import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyApiUrl, SocialSecretaryApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import CompanyForm from "./CompanyForm";
import { getFormattedDropdownOptions } from "../../utilities/CommonFunctions";

export default function AddCompanyForm({ companyData, setCompanyData, view, update_id, sector, setSector }) {

    const [sectorList, setSectorList] = useState([])
    const [socialSecretaryList, setSocialSecretaryList] = useState([])
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
                    setSectorList(getFormattedDropdownOptions(result.data.sectors))
                    setSocialSecretaryList(getFormattedDropdownOptions(result.data.social_secretaries))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    useEffect(() => {
        if (update_id !== '0' && update_id != undefined) {
            let editApiUrl = CompanyApiUrl + '/' + update_id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        // Get selected sectors
                        setSector(getFormattedDropdownOptions(result.data.sectors));

                        // Formatting sector data and converting to array of sector ids
                        let response = [];
                        response.push(result.data)
                        let selectedSectors = result.data.sectors
                        let id_arr = []
                        selectedSectors.map((val, i) => {
                            id_arr.push(val.id)
                        })
                        response[0]['sectors'] = id_arr;
                        setCompanyData(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])


    // Function to set new company data
    const setValues = (index, name, value, field) => {
        const company = [...companyData];
        if (field === 'address') {
            company[0][field][name] = value
        } else if (field !== 'dropdown') {
            company[index][name] = value
        } else {
            // const sector_arr = [...sector]
            // sector_arr.push(value)
            // sector_arr[index] = value
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
        { title: "VAT number", name: "employer_id", type: "input_field" },
        { title: "Company name", name: "company_name", required: true, type: "input_field" },
        { title: "Sector", options: sectorList, isMulti: true, selectedOptions: sector, required: true, type: "dropdown" },
        { title: "Email", name: "email", required: true, type: "input_field" },
        { title: "Phone number", name: "phone", required: true, type: "phone_input", style:"col-md-4 mt-1 float-left" },
        // { title: "VAT number", name: "employer_id", type: "input_field" },
        { title: "Sender number", name: "sender_number", required: false, type: "input_field" },
        { title: "Username", name: "username", required: false, type: "input_field" },
        { title: "RSZ number", name: "rsz_number", required: false, type: "input_field" },
    ];
    //adress fields for company
    const companyAddressFieldsArray = [
        { title: "Street and house number", name: "street_house_no", required: true, type: "input_field" },
        { title: "Postal code", name: "postal_code", required: true, type: "input_field" },
        { title: "City", name: "city", required: true, type: "input_field" },
        { title: "Country", name: "country", required: true, type: "input_field" },
    ];

    const companySocialSectretaryFieldsArray = [
        // { title: "Social secretary", name: "social_secretary", options: socialSecretaryList, isMulti: false, selectedOptions: sector, required: false, type: "dropdown" },
        { title: "Social secretary number", name: "social_secretary_number", required: false, type: "input_field" },
        { title: "Contact email", name: "contact_email", required: false, type: "input_field" },
    ]


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
                title3={'Social secretary details'}
                data3={companySocialSectretaryFieldsArray}
                formattedData3={companyData}
                SetValues={setValues}
            ></CompanyForm>
        </div>
    );
}