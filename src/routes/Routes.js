import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Companies from '../pages/Companies';
import Settings from '../pages/Settings';

import Login from '../pages/Login';
import Employees from '../pages/Employees';
import Configurations from '../pages/Configurations';
import ConfigurationOverviews from '../components/organisms/ConfigurationOverviews';
import AddFunction from '../components/organisms/AddFunction';
import AddEmployeeTypes from '../components/organisms/AddEmployeeTypes';
import AddInterimAgency from '../components/organisms/AddInterimAgency';
import AddSector from '../components/organisms/AddSector';
import AddGroupFunction from '../components/organisms/AddGroupFunction';
import AddContractType from '../components/organisms/AddContractType';
import CompanyCreation from '../components/organisms/CompanyCreation';
import HolidayCodeCreation from '../components/molecules/HolidayCodeCreation';
import MyAccount from "../pages/MyAccount";
import EmployeeCreation from '../components/organisms/EmployeeCreation';
import HolidayCodeConfigurationOverview from '../components/organisms/HolidayCodeConfigurationOverview';
import CommunicationConfigurationOverview from '../components/organisms/CommunicationConfigurationOverview';
// const langRegex = "(en|nl|fr)?";
// const langPath =  `/:lang${langRegex}`;
import AddReasons from '../components/organisms/AddReasons';
import AddSocialSecretary from '../components/organisms/AddSocialSecretary';
import LinkHolidayCodeToSocialSecretary from "../components/molecules/LinkHolidayCodeToSocialSecretary"
import Planning from '../pages/Planning';
import AddEmailTemplate from '../components/organisms/AddEmailTemplate';
import AddContractsTemplate from '../components/organisms/AddContractsTemplate'
import Uurrooster from '../pages/Uurrooster';
import ClonePlanning from '../components/molecules/ClonePlanning';
import OthPlanning from '../components/organisms/OthPlanning';

const BaseRouter = ({ setAuth, setCompany}) => (
    <Routes>
        {/* route starts here */}
        {/* <Route exact path={active language}  element={<Component name />} /> */}
        <Route exact path="/" element={<Dashboard></Dashboard>} />
        <Route exact path="/login" element={<Login></Login>} />

        <Route exact path="/manage-employees" element={<Employees></Employees>} />
        <Route exact path="/add-employees" element={<EmployeeCreation></EmployeeCreation>} />

        <Route exact path="/manage-companies" element={<Companies setCompany={setCompany}></Companies>} />
        <Route exact path="/manage-companies/:addType/:id" element={<CompanyCreation setCompany={setCompany} />} />

        <Route exact path='/configurations' element={<Configurations></Configurations>} />
        <Route exact path='/manage-configurations/:type' element={<ConfigurationOverviews></ConfigurationOverviews>} />
        {/* <Route exact path='/manage-configurations/:type/:id' element={<ConfigurationOverviews></ConfigurationOverviews>} /> */}

        <Route exact path='/add-function' element={<AddFunction></AddFunction>} />
        <Route exact path='/add-function/:id' element={<AddFunction></AddFunction>} />

        <Route exact path='/add-contract-type' element={<AddContractType></AddContractType>} />
        <Route exact path='/add-contract-type/:id' element={<AddContractType></AddContractType>} />

        <Route exact path='/add-employee-type' element={<AddEmployeeTypes></AddEmployeeTypes>} />
        <Route exact path='/add-employee-type/:id' element={<AddEmployeeTypes></AddEmployeeTypes>} />
        <Route exact path='/add-interim-agency' element={<AddInterimAgency></AddInterimAgency>} />
        <Route exact path='/add-interim-agency/:id' element={<AddInterimAgency></AddInterimAgency>} />

        <Route exact path='/add-sector' element={<AddSector></AddSector>} />
        <Route exact path='/add-sector/:id' element={<AddSector></AddSector>} />

        <Route exact path='/add-group-function' element={<AddGroupFunction></AddGroupFunction>} />
        <Route exact path='/add-group-function/:id' element={<AddGroupFunction></AddGroupFunction>} />

        <Route exact path='/add-holiday-code' element={<HolidayCodeCreation></HolidayCodeCreation>} />
        <Route exact path='/add-holiday-code/:id' element={<HolidayCodeCreation></HolidayCodeCreation>} />

        <Route exact path='/my-account' element={<MyAccount setAuth={setAuth}></MyAccount>} />
        <Route exact path='/settings' element={<Settings></Settings>} />
        <Route exact path='/manage-holiday-configurations/:type' element={<HolidayCodeConfigurationOverview></HolidayCodeConfigurationOverview>} />

        <Route exact path='/add-reasons' element={<AddReasons></AddReasons>} />
        <Route exact path='/add-reasons/:id' element={<AddReasons></AddReasons>} />

        <Route exact path='/add-social-secretary' element={<AddSocialSecretary></AddSocialSecretary>} />
        <Route exact path='/add-social-secretary/:id' element={<AddSocialSecretary></AddSocialSecretary>} />

        <Route exact path='/link-holiday-code/:id' element={<LinkHolidayCodeToSocialSecretary></LinkHolidayCodeToSocialSecretary>} />


        <Route exact path="/manage-plannings" element={<Planning></Planning>} />
        <Route exact path="/clone-plannings" element={<ClonePlanning></ClonePlanning>} />

        <Route exact path='/add-email-template' element={<AddEmailTemplate></AddEmailTemplate>} />
        <Route exact path='/add-email-template/:id' element={<AddEmailTemplate></AddEmailTemplate>} />

        <Route exact path='/manage-communication-configurations/:type' element={<CommunicationConfigurationOverview></CommunicationConfigurationOverview>} />

        <Route exact path='/add-contracts-template/:addType' element={<AddContractsTemplate></AddContractsTemplate>} />
        <Route exact path='/add-contracts-template/:addType/:id' element={<AddContractsTemplate></AddContractsTemplate>} />

        <Route exact path='/uurrooster' element={<Uurrooster></Uurrooster>} />

        <Route exact path='/oth-planning' element={<OthPlanning></OthPlanning>} />
        
    </Routes>
);

export default BaseRouter;