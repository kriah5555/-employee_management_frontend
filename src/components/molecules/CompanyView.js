import React, { useEffect, useState } from "react";
import { CompanyApiUrl, LocationApiUrl, LocationListApiUrl, WorkstationApiUrl, WorkstationListApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "../../static/icons/BackIcon.png";


export default function CompanyView() {
    const navigate = useNavigate();
    const params = useParams();
    const [companyData, setCompanyData] = useState();

    //add company fields 
    const CompanyFields = [
        { title: "Company name", name: "company_name" },
        // { title: "Sector name", name: "sectors" },
        { title: "Email", name: "email" },
        { title: "Phone number", name: "phone" },
        { title: "Employer Id", name: "employer_id" },
        { title: "Sender number", name: "sender_number" },
        { title: "Username", name: "username" },
        { title: "RSZ number", name: "rsz_number" },
        { title: "Social secretary number", name: "social_secretary_number" },
        { title: "Street and house number", name: "street_house_no" },
        { title: "Postal code", name: "postal_code" },
        { title: "City", name: "city" },
        { title: "Country", name: "country" },
    ];

    useEffect(() => {
        if (params.id !== '0') {
            let editApiUrl = CompanyApiUrl + '/' + params.id + '/edit'
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        // let response = [];
                        // response.push(result.data.details)
                        // let selectedSectors = result.data.details.sectors
                        // let id_arr = []
                        // response[0]['sectors'] = []
                        // selectedSectors.map((val, i) => {
                        //     id_arr.push(val.id)
                        // })
                        // response[0]['sectors'] = id_arr
                        // setSector(result.data.details.sectors_value);
                        setCompanyData(result.data.details);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    console.log(companyData);
    return (
        <div className="mt-3">
            {CompanyFields.map((val, index) => {
                return (
                    <div key={val.label} className={"font-weight-bold col-md-12 row m-0 my-3"}>
                        <label className="col-md-3 mb-1 pr-0 text-secondary">{val.title}:</label>
                        {/* <p className="mb-0 col-md-9">{companyData!==undefined ? companyData[val.name]: ''}</p> */}
                    </div>
                )
            })}
        </div>
    )
}
