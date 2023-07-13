import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from "./routes/Routes";
import { AppContext } from "./routes/ContextLib";
import './App.css';
import "./static/common.css";
import Header from './commonComponents/Header';
import Sidebar from './commonComponents/Sidebar';
import Login from './pages/Login';

function App() {

   const [auth, setAuth] = useState(localStorage.getItem('auth'));

   useEffect(() => {
      if (localStorage.getItem('auth') === null){
         localStorage.setItem('auth', false);
      }
      setAuth(localStorage.getItem('auth'));
   }, [localStorage.getItem('auth')])

   return (
      <div>
         {/* check for authentication of user before displaying anything*/}
         <AppContext.Provider value=''>
            <Router>
               {/* Display the contents with base routes */}
               {/* Common layout with header and sidebar */}
               {auth === 'true' && <>
                  <Header></Header>
                  <div className='col-md-12 p-0 d-flex'>
                     <Sidebar></Sidebar>
                     <BaseRouter></BaseRouter>
                  </div>
               </>}
               {auth === 'false' &&
                  <Login></Login>
               }
            </Router>
         </AppContext.Provider>
      </div>
   );
}

export default App;
