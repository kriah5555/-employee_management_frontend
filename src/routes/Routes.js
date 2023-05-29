import React from 'react';
import {Route, Routes} from 'react-router-dom';

// const langRegex = "(en|nl|fr)?";
// const langPath =  `/:lang${langRegex}`;

const BaseRouter = () => (
    <Routes>
        {/* route starts here */}
        {/* <Route exact path={active language}  element={<Component name />} /> */}
        <Route exact path="/"  element='' />
    </Routes>
);

export default BaseRouter;