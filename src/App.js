import { BrowserRouter as Router } from 'react-router-dom';
import  BaseRouter  from "./routes/Routes";
import { AppContext } from "./routes/ContextLib";
import * as React from 'react';
import './App.css';
import "./static/common.css";
import Header from './commonComponents/Header';
import Sidebar from './commonComponents/Sidebar';

function App() {

       return (  
         <div>  
          {/* check for authentication of user before displaying anything*/}
            <AppContext.Provider value=''>
               <Router>
                  {/* Display the contents with base routes */}
                  {/* Common layout with header and sidebar */}
                  <Header></Header>
                  <div className='col-md-12 p-0 d-flex'>
                     <Sidebar></Sidebar>
                     <BaseRouter></BaseRouter>
                  </div>
               </Router>
            </AppContext.Provider>
         </div>  
       );  
}

export default App;
