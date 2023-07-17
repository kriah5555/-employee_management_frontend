import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Companies from '../pages/Companies';
import Settings from '../pages/Settings';
import AddFunction from '../components/oganisms/AddFunction';
import AddEmployeeTypes from '../components/oganisms/AddEmployeeTypes';

import Login from '../pages/Login';
import Employees from '../pages/Employees';
import Logout from '../components/atoms/Logout';
import Configurations from '../pages/Configurations';
import ConfigurationOverviews from '../components/oganisms/ConfigurationOverviews';

// const langRegex = "(en|nl|fr)?";
// const langPath =  `/:lang${langRegex}`;

const BaseRouter = () => (
    <Routes>
        {/* route starts here */}
        {/* <Route exact path={active language}  element={<Component name />} /> */}
        <Route exact path="/"  element={<Dashboard></Dashboard>} />
        <Route exact path="/login"  element={<Login></Login>} />

        <Route exact path="/manage-employees"  element={<Employees></Employees>} />
        <Route exact path="/manage-companies"  element={<Companies></Companies>} />
        <Route exact path='/configurations' element={<Configurations></Configurations>} />
        <Route exact path='/settings' element={<Settings></Settings>} />

        <Route exact path='/manage-configurations/:type' element={<ConfigurationOverviews></ConfigurationOverviews>} />
        <Route exact path='/add-function' element={<AddFunction></AddFunction>} />
        <Route exact path='/add-employee-type' element={<AddEmployeeTypes></AddEmployeeTypes>} />
        <Route exact path='/add-sector' element={<AddFunction></AddFunction>} />
        <Route exact path='/add-group-function' element={<AddFunction></AddFunction>} />




    </Routes>
);

export default BaseRouter;