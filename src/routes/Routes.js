import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Companies from '../pages/Companies';
import Settings from '../pages/Settings';
import AddFunction from '../components/molecules/AddFunction';
import Login from '../pages/Login';
import Employees from '../pages/Employees';
import Logout from '../components/atoms/Logout';

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
        <Route exact path='/settings' element={<Settings></Settings>} ></Route>

        <Route exact path='/add-function' element={<AddFunction></AddFunction>} ></Route>


    </Routes>
);

export default BaseRouter;