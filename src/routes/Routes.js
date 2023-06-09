import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Companies from '../pages/Companies';

// const langRegex = "(en|nl|fr)?";
// const langPath =  `/:lang${langRegex}`;

const BaseRouter = () => (
    <Routes>
        {/* route starts here */}
        {/* <Route exact path={active language}  element={<Component name />} /> */}
        <Route exact path="/"  element={<Dashboard></Dashboard>} />
        <Route exact path="/manage-companies"  element={<Companies></Companies>} />

    </Routes>
);

export default BaseRouter;