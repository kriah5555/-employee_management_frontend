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
import AddSector from '../components/organisms/AddSector';
import AddGroupFunction from '../components/organisms/AddGroupFunction';
import AddContractType from '../components/organisms/AddContractType';
import CompanyCreation from '../components/organisms/CompanyCreation';
import HolidayCodeCreation from '../components/molecules/HolidayCodeCreation';
import MyAccount from "../pages/MyAccount";
import EmployeeCreation from '../components/organisms/EmployeeCreation';
// const langRegex = "(en|nl|fr)?";
import HolidayCodeConfiguratuionOverview from '../components/organisms/HolidayCodeConfigurationOverview';
// const langRegex = "(en|nl|fr)?"; 
// const langPath =  `/:lang${langRegex}`;
import AddCostCenter from '../components/organisms/AddCostCenter';
const BaseRouter = ({ setAuth }) => (
    <Routes>
        {/* route starts here */}
        {/* <Route exact path={active language}  element={<Component name />} /> */}
        <Route exact path="/" element={<Dashboard></Dashboard>} />
        <Route exact path="/login" element={<Login></Login>} />

        <Route exact path="/manage-employees" element={<Employees></Employees>} />
        <Route exact path="/add-employees" element={<EmployeeCreation></EmployeeCreation>} />

        <Route exact path="/manage-companies" element={<Companies></Companies>} />
        <Route exact path="/manage-companies/:addType/:id" element={<CompanyCreation />} />

        <Route exact path='/configurations' element={<Configurations></Configurations>} />
        <Route exact path='/manage-configurations/:type' element={<ConfigurationOverviews></ConfigurationOverviews>} />
        {/* <Route exact path='/manage-configurations/:type/:id' element={<ConfigurationOverviews></ConfigurationOverviews>} /> */}

        <Route exact path='/add-function' element={<AddFunction></AddFunction>} />
        <Route exact path='/add-function/:id' element={<AddFunction></AddFunction>} />

        <Route exact path='/add-contract-type' element={<AddContractType></AddContractType>} />
        <Route exact path='/add-contract-type/:id' element={<AddContractType></AddContractType>} />

        <Route exact path='/add-employee-type' element={<AddEmployeeTypes></AddEmployeeTypes>} />
        <Route exact path='/add-employee-type/:id' element={<AddEmployeeTypes></AddEmployeeTypes>} />

        <Route exact path='/add-sector' element={<AddSector></AddSector>} />
        <Route exact path='/add-sector/:id' element={<AddSector></AddSector>} />

        <Route exact path='/add-group-function' element={<AddGroupFunction></AddGroupFunction>} />
        <Route exact path='/add-group-function/:id' element={<AddGroupFunction></AddGroupFunction>} />

        <Route exact path='/add-holiday-code' element={<HolidayCodeCreation></HolidayCodeCreation>} />
        <Route exact path='/add-holiday-code/:id' element={<HolidayCodeCreation></HolidayCodeCreation>} />

        <Route exact path='/my-account' element={<MyAccount setAuth={setAuth}></MyAccount>} />
        <Route exact path='/settings' element={<Settings></Settings>} />
        <Route exact path='/manage-holiday-configurations/:type' element={<HolidayCodeConfiguratuionOverview></HolidayCodeConfiguratuionOverview>} />

        <Route exact path='/add-cost-center' element={<AddCostCenter></AddCostCenter>} />
        <Route exact path='/add-cost-center/:id' element={<AddCostCenter></AddCostCenter>} />
    </Routes>
);

export default BaseRouter;