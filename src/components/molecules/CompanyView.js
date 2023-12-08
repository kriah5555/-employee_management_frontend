import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyApiUrl, LocationApiUrl, LocationListApiUrl, WorkstationApiUrl, WorkstationListApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import indii from "../../static/icons/logo-temp.png"
export default function CompanyView() {

    const navigate = useNavigate();

    const params = useParams();
    const [companyData, setCompanyData] = useState({});
    const [address, setAddress] = useState({});
    const [sector, setSector] = useState("");
    const [socialSecretaryNumber, setSocialSecretaryNumber] = useState('')

    const TabsData = [
        { tabHeading: ("Company details"), tabName: 'company_details' },
        { tabHeading: ("Address"), tabName: 'address' },
    ]


    useEffect(() => {
        if (params.id !== '0') {
            let editApiUrl = CompanyApiUrl + '/' + params.id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        setCompanyData(result.data);
                        setAddress(result.data.address);
                        setSector(sectorString(result.data.sectors));
                        setSocialSecretaryNumber(result.data.company_social_secretary_details !== null ? result.data.company_social_secretary_details.social_secretary_number : '');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    //add company fields
    const CompanyFields = [
        { title: "Company name", name: "company_name", value: companyData.company_name },
        { title: "Sector name", name: "sectors", value: sector },
        { title: "Email", name: "email", value: companyData.email },
        { title: "Phone number", name: "phone", value: companyData.phone },
        { title: "Vat number", name: "vat_number", value: companyData.vat_number },
        { title: "Sender number", name: "sender_number", value: companyData.sender_number },
        { title: "Username", name: "username", value: companyData.username },
        { title: "RSZ number", name: "rsz_number", value: companyData.rsz_number },
        { title: "Social secretary number", name: "social_secretary_number", value: socialSecretaryNumber },
    ];

    const companyAddress = [
        { title: "Street and house number", name: "street_house_no", value: address.street_house_no },
        { title: "Postal code", name: "postal_code", value: address.postal_code },
        { title: "City", name: "city", value: address.city },
        { title: "Country", name: "country", value: address.country },
    ];


    // function to create string of sectors
    const sectorString = (sectors) => {
        let resultString = '';

        sectors.map((val, index) => {
            index == sectors.length - 1 ? resultString += val.name : resultString += val.name + ", ";
        })
        return resultString;
    }



    return (
        <div>
            <div className="col-md-12 row m-0 py-4 px-4 border-bottom">
                <img className="employee-icon-temp rounded-circle mx-2 " src={companyData.logo ? URL.createObjectURL(companyData.logo) : indii}></img>
                <div className="width-22 px-3 mt-2">
                    <h4 className="mb-1 font-22">{companyData.company_name}</h4>
                    <p className="text-secondary font-18">{sector}</p>
                </div>
            </div>
            <div className="col-md-12 p-0 employee-detail">
                <Tabs>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab> //selectedClassName="selected_emp_tab"
                            )
                        })}
                    </TabList>
                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0  m-3">
                            {CompanyFields.map((val, index) => {
                                if (index !== 0) {
                                    return (
                                        <div key={val.label} className={"font-weight-bold col-md-12 row m-0 my-4"}>
                                            <label className="col-md-4 mb-1 pr-0 text-secondary">{val.title}:</label>
                                            <p className="mb-0 col-md-8">{companyData !== undefined ? val.value : ''}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="customscroll employee-detail-height py-3 px-0 m-3">
                            {companyAddress.map((val, index) => {
                                return (
                                    <div key={val.label} className={"font-weight-bold col-md-12 row m-0 my-4"}>
                                        <label className="col-md-4 mb-1 pr-0 text-secondary">{val.title}:</label>
                                        <p className="mb-0 col-md-8">{companyData !== undefined ? val.value : ''}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
