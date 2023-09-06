import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { t } from "../../translations/Translation";
import 'react-tabs/style/react-tabs.css';
import AddLocationForm from "../molecules/LocationForm";
import AddCompanyForm from "../molecules/AddCompanyForm";
import WorkstationForm from "../molecules/WorkstationForm";
import ResponsiblePersonForm from "../molecules/ResponsiblePersonForm";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { CompanyApiUrl } from "../../routes/ApiEndPoints";



export default function CompanyCreation() {

    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [locationStatus, setLocationStatus] = useState(false);
    const [workstationStatus, setWorkstationStatus] = useState(false);

    const TabsData = [
        { tabHeading: t("COMPANY"), tabName: 'company' },
        { tabHeading: t("RESPONSIBLE_PERSONS"), tabName: 'responsible_persons' },
        { tabHeading: t("LOCATIONS"), tabName: 'location' },
        { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
        { tabHeading: t("RULES"), tabName: 'rules' },
    ]



    const [customers, setCustomers] = useState([{
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        rsz_number: "",
        role: "",
    }]);

    const [customerArray, setCustomerArray] = useState([])

    const getCustomerDropdownData = (index, value) => {
        let array = [...customerArray]
        array[index] = { value: index, label: value }
        setCustomerArray(array);
    }

    const [locations, setLocations] = useState([{
        location_name: "",
        responsible_persons: [],
        address: {
            street_house_no: "",
            postal_code: "",
            city: "",
            country: "",
        }
    }]);

    const [locationArray, setLocationArray] = useState([])

    const getLocationDropdownData = (index, value) => {
        let array = [...locationArray]
        array[index] = { value: index, label: value }
        setLocationArray(array);
    }

    const [workstations, setWorkstations] = useState([{
        workstation_name: "",
        function_titles: [],
        sequence_number: "",
        locations_index: [],
        status: 1
    }]);

    const [companyData, setCompanyData] = useState([{
        company_name: "",
        employer_id: "",
        sender_number: "",
        rsz_number: "",
        social_secretary_number: "",
        email: '',
        phone: '',
        username: "",
        status: 1,
        sectors: [],
        address: {
            street_house_no: "",
            postal_code: "",
            city: "",
            country: "",
            status: "1"
        },
        // responsible_persons: customers,
        // locations: locations,
        // workstations: workstations,
    }]);


    const SaveCompany = () => {
        let company = [...companyData]
        company[0]['responsible_persons'] = customers
        if (!locationStatus) {
            company[0]['locations'] = []
        } else {
            company[0]['locations'] = locations
        }

        if (!workstationStatus) {
            company[0]['workstations'] = []
        } else {
            company[0]['workstations'] = workstations
        }
        setCompanyData(company)

        AXIOS.service(CompanyApiUrl, 'POST', company[0])
            .then((result) => {
                if (result?.success) {
                    navigate('/manage-companies')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-companies')} src={BackIcon}></img> Create company</h4>
            </div>
            <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                    </TabList>

                    <TabPanel>
                        <div className=""><AddCompanyForm companyData={companyData} setCompanyData={setCompanyData}></AddCompanyForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(1)} CustomStyle="my-3 float-right"></CustomButton>
                    </TabPanel>

                    <TabPanel>
                        <div className=""><ResponsiblePersonForm customers={customers} setCustomers={setCustomers} getCustomerDropdownData={getCustomerDropdownData}></ResponsiblePersonForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(2)} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(0)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                        {/* <CustomButton buttonName={'Skip'} ActionFunction={() => setTabIndex(3)} CustomStyle="mr-3 my-3 float-right"></CustomButton> */}

                    </TabPanel>

                    <TabPanel>
                        <div className=""><AddLocationForm locations={locations} setLocations={setLocations} customerArray={customerArray} getLocationDropdownData={getLocationDropdownData} setLocationStatus={setLocationStatus}></AddLocationForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 ml-0 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(3)} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(1)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Skip'} ActionFunction={() => setTabIndex(3)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                    </TabPanel>

                    <TabPanel>
                        <div><WorkstationForm workstations={workstations} setWorkstations={setWorkstations} locationArray={locationArray} setWorkstationStatus={setWorkstationStatus}></WorkstationForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 ml-0 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(4)} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(2)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                    </TabPanel>

                    <TabPanel>
                        <h3 className="text-center mt-3">Rules</h3>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 float-left"></CustomButton>
                        <CustomButton buttonName={'Save'} ActionFunction={() => SaveCompany()} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(3)} CustomStyle=" mr-3 my-3 float-right"></CustomButton>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
