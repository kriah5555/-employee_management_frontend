import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import  BaseRouter  from "./routes/Routes";
import { AppContext } from "./routes/ContextLib";
import * as React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {

       return (  
         <div>  
          {/* check for authentication of user before displaying anything*/}
            <AppContext.Provider value=''>
               <Router>
                  {/* Display the contents with base routes */}
                  <h2 className='text-center mt-5 font-weight-bold'>Your react project is ready, you can start adding projects. </h2>
                  <img src={logo} className='App-logo App-logo-spin' alt="logo"></img>
                  {/* <BaseRouter></BaseRouter> */}
               </Router>
            </AppContext.Provider>
         </div>  
       );  
}

export default App;
