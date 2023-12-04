import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { t } from "../../translations/Translation";
import 'react-tabs/style/react-tabs.css';
import AddLocationForm from "../molecules/LocationForm";
import AddCompanyForm from "../molecules/AddCompanyForm";
import WorkstationForm from "../molecules/WorkstationForm";
import ResponsiblePersonForm from "../molecules/ResponsiblePersonForm";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import { APICALL as AXIOS } from "../../services/AxiosServices"
import { CompanyApiUrl, LocationApiUrl, WorkstationApiUrl } from "../../routes/ApiEndPoints";
import CompanyView from "../molecules/CompanyView";
import ErrorPopup from "../../utilities/popup/ErrorPopup";
import { toast } from 'react-toastify';
import AddCostCenterForm from "../molecules/AddCostCenterForm";

export default function CompanyCreation() {

    const navigate = useNavigate();
    const params = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const [locationStatus, setLocationStatus] = useState(false);
    const [workstationStatus, setWorkstationStatus] = useState(false);

    const [sector, setSector] = useState([]);
    const [selectedRole, setSelectedRole] = useState([]);
    const [responsiblePerson, setResponsiblePerson] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState([]);
    const [socialSecretary, setSocialSecretary] = useState("");
    const [interimAgency, setInterimAgency] = useState([]);

    const [errors, setErrors] = useState([]);

    // Tabs data array for super admin
    const TabsData = [
        { tabHeading: t("COMPANY"), tabName: 'company' },
        { tabHeading: t("RESPONSIBLE_PERSONS"), tabName: 'responsible_persons' },
        { tabHeading: t("LOCATIONS"), tabName: 'location' },
        { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
        // { tabHeading: t("RULES"), tabName: 'rules' },
    ]

    // Customer default data
    const [customers, setCustomers] = useState([{
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        rsz_number: "",
        role: "",
    }]);

    const [customerArray, setCustomerArray] = useState([])

    // Create customer dropdown data for location form by using added customer data from responsible person form
    const getCustomerDropdownData = (index, value) => {
        let array = [...customerArray]
        array[index] = { value: index, label: value }
        setCustomerArray(array);
    }

    // Location default data
    const [locations, setLocations] = useState([{
        location_name: "",
        responsible_persons: [],
        company: 1,
        status: 1,
        address: {
            street_house_no: "",
            postal_code: "",
            city: "",
            country: "",
        }
    }]);

    const [locationArray, setLocationArray] = useState([])

    // Create location dropdown data for workstation form by using added location data from location form
    const getLocationDropdownData = (index, value) => {
        let array = [...locationArray]
        array[index] = { value: index, label: value }
        setLocationArray(array);
    }

    // Workstation default data
    const [workstations, setWorkstations] = useState([{
        workstation_name: "",
        function_titles: [],
        sequence_number: "",
        locations_index: [],
        company: 1,
        status: 1
    }]);

    // Company default data
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
        social_secretary_id:"",
        interim_agency_id:"",
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


    // Function to call Api for create and update of company, location and workstation
    const SaveCompany = () => {
        let requestData;
        let ApiUrl;
        let Method;

        if (params.addType === 'company' || params.addType === 'company-single') {
            // For company create and edit
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
            requestData = company[0]
            ApiUrl = params.id !== '0' ? CompanyApiUrl + '/' + params.id : CompanyApiUrl
            Method = params.id !== '0' ? 'PUT' : 'POST'
        } else if (params.addType === 'location') {
            // For location create and edit
            requestData = locations[0]
            ApiUrl = params.id !== '0' ? LocationApiUrl + '/' + params.id : LocationApiUrl
            Method = params.id !== '0' ? 'PUT' : 'POST'
        } else {
            // For workstation create and edit
            requestData = workstations[0]
            ApiUrl = params.id !== '0' ? WorkstationApiUrl + '/' + params.id : WorkstationApiUrl
            Method = params.id !== '0' ? 'PUT' : 'POST'
        }

        // Api call for create and update
        AXIOS.service(ApiUrl, Method, requestData)
            .then((result) => {
                if (result?.success) {
                    navigate('/manage-companies#' + params.addType)
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
                    window.location.reload()
                } else {
                    setErrors(result.message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color">
                    <img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-companies#' + params.addType)} src={BackIcon}></img>
                    {params.addType !== 'company-view' ? ((params.id !== '0' ? 'Edit ' : 'Create ') + (params.addType === 'company-single' ? "company" : (params.addType === 'cost_center' ? 'cost center' : params.addType))) : 'Company details'}
                </h4>
            </div>
            {errors !== undefined && errors.length !== 0 && <ErrorPopup
                title={('Validation error!')}
                body={(errors)}
                onHide={() => setErrors([])}
            ></ErrorPopup>}
            {/* Company creation multi step form */}
            {params.addType === 'company' && <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                    </TabList>

                    <TabPanel>
                        <div className=""><AddCompanyForm companyData={companyData} setCompanyData={setCompanyData} sector={sector} setSector={setSector} socialSecretary ={socialSecretary} setSocialSecretary={setSocialSecretary} interimAgency={interimAgency} setInterimAgency = {setInterimAgency}></AddCompanyForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(1)} CustomStyle="my-3 float-right"></CustomButton>
                    </TabPanel>

                    <TabPanel>
                        <div className=""><ResponsiblePersonForm customers={customers} setCustomers={setCustomers} getCustomerDropdownData={getCustomerDropdownData} selectedRole={selectedRole} setSelectedRole={setSelectedRole}></ResponsiblePersonForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(2)} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(0)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                    </TabPanel>

                    <TabPanel>
                        <div className=""><AddLocationForm locations={locations} setLocations={setLocations} customerArray={customerArray} getLocationDropdownData={getLocationDropdownData} setLocationStatus={setLocationStatus} responsiblePerson={responsiblePerson} setResponsiblePerson={setResponsiblePerson}></AddLocationForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 ml-0 float-left"></CustomButton>
                        <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(3)} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(1)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Skip'} ActionFunction={() => setTabIndex(3)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                    </TabPanel>

                    <TabPanel>
                        <div><WorkstationForm workstations={workstations} setWorkstations={setWorkstations} locationArray={locationArray} setWorkstationStatus={setWorkstationStatus} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} selectedFunction={selectedFunction} setSelectedFunction={setSelectedFunction} sector={companyData[0]['sectors']}></WorkstationForm></div>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 ml-0 float-left"></CustomButton>
                        {/* <CustomButton buttonName={'Next'} ActionFunction={() => setTabIndex(4)} CustomStyle="my-3 float-right"></CustomButton> */}
                        <CustomButton buttonName={'Save'} ActionFunction={() => SaveCompany()} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(2)} CustomStyle="mr-3 my-3 float-right"></CustomButton>
                        {/* <CustomButton buttonName={'Skip'} ActionFunction={() => setTabIndex(4)} CustomStyle="mr-3 my-3 float-right"></CustomButton> */}
                    </TabPanel>

                    {/* <TabPanel>
                        <h3 className="text-center mt-3">Rules</h3>
                        <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies')} CustomStyle="my-3 float-left"></CustomButton>
                        <CustomButton buttonName={'Save'} ActionFunction={() => SaveCompany('company')} CustomStyle="my-3 float-right"></CustomButton>
                        <CustomButton buttonName={'Prev'} ActionFunction={() => setTabIndex(3)} CustomStyle=" mr-3 my-3 float-right"></CustomButton>
                    </TabPanel> */}
                </Tabs>
            </div>}
            {/* Code for single forms */}
            {params.addType !== 'company' && <div className="company-tab-width company_creation mt-2 mb-3 mx-auto border bg-white">
                {/* Edit company details form */}
                {params.addType === 'company-single' && <AddCompanyForm
                    view='company-single'
                    companyData={companyData}
                    setCompanyData={setCompanyData}
                    sector={sector}
                    setSector={setSector}
                    update_id={params.id}
                    socialSecretary={socialSecretary}
                    setSocialSecretary={setSocialSecretary}
                    interimAgency={interimAgency}
                    setInterimAgency={setInterimAgency}
                ></AddCompanyForm>}

                {/* Create and edit location details form */}
                {params.addType === 'location' && <AddLocationForm
                    view='location-single'
                    locations={locations}
                    setLocations={setLocations}
                    customerArray={customerArray}
                    getLocationDropdownData={getLocationDropdownData}
                    setLocationStatus={setLocationStatus}
                    update_id={params.id}
                    responsiblePerson={responsiblePerson}
                    setResponsiblePerson={setResponsiblePerson}
                ></AddLocationForm>}

                {/* Create and edit workstation details form */}
                {params.addType === 'workstation' && <WorkstationForm
                    view='workstation-single'
                    workstations={workstations}
                    setWorkstations={setWorkstations}
                    locationArray={locationArray}
                    setLocationArray={setLocationArray}
                    setWorkstationStatus={setWorkstationStatus}
                    update_id={params.id}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    selectedFunction={selectedFunction}
                    setSelectedFunction={setSelectedFunction}
                ></WorkstationForm>}
                {params.addType === 'cost_center' && <AddCostCenterForm></AddCostCenterForm>}
                {params.addType === 'company-view' && <CompanyView></CompanyView>}
                {params.addType !== 'company-view' && params.addType !== 'cost_center' && <div className="col-md-12 my-4 text-right pr-5">
                    <CustomButton buttonName={'Save'} ActionFunction={() => SaveCompany()} CustomStyle=""></CustomButton>
                    <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/manage-companies#' + params.addType)} CustomStyle="mr-3"></CustomButton>
                </div>}
            </div>}
        </div>
    )
}
