import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter, { InviteRoute } from "./routes/Routes";
import { AppContext } from "./routes/ContextLib";
import './App.css';
import "./static/common.css";
import Header from './commonComponents/Header';
import Sidebar from './commonComponents/Sidebar';
import Login from './pages/Login';
import { GetTranslatedConstants } from './translations/Translation';
import { useParams } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function App() {

   const [auth, setAuth] = useState(localStorage.getItem('auth'));
   const [selectedCompany, setSelectedCompany] = useState("");
   const [companyList, setCompanyList] = useState([]);

   const [company, setCompany] = useState('');
   const [path, setPath] = useState(window.location.pathname)
   const params = useParams()

   useEffect(() => {
      if (localStorage.getItem('auth') === null) {
         localStorage.setItem('auth', false);
      }
      setAuth(localStorage.getItem('auth'));
   }, [auth])

   useEffect(() => {
      GetTranslatedConstants();
      if (!localStorage.getItem('week_tab')) {
         localStorage.setItem('week_tab', 0)
      }
      if (!localStorage.getItem('active_language')) {
         localStorage.setItem('active_language', 'nl')
      }
   }, [])



   const onCompanySelect = (e, reload) => {
      if (e && e.value === undefined) {
         let companyData = companyList.filter(item => { return item.value === e })
         setSelectedCompany(companyData)
         localStorage.setItem('company_id', e);
      } else {
         if (!companyList.includes(e)) {
            let companies = [...companyList]
            companies.push(e);
            setCompanyList(companies);
         }
         setSelectedCompany(e);
         localStorage.setItem('company_id', e.value);
      }
      if (reload === '' || reload === undefined) {
         window.location.reload();
      }
   }

   useEffect(() => {
      if (company) {
         onCompanySelect(company, 'no-reload')
      }
   }, [company])

   return (
      <div>
         {/* check for authentication of user before displaying anything*/}
         <AppContext.Provider value=''>
            <Router>
               {/* Display the contents with base routes */}
               {/* Common layout with header and sidebar */}
               {auth === 'false' && path.startsWith('/employee-invitations/') && <InviteRoute></InviteRoute>}
               {auth === 'true' && !path.startsWith('/employee-invitations/') && <>
                  <Header
                     setAuth={setAuth}
                     selectedCompany={selectedCompany}
                     setSelectedCompany={setSelectedCompany}
                     onCompanySelect={onCompanySelect}
                     companyList={companyList}
                     setCompanyList={setCompanyList}
                  ></Header>
                  <div className='col-md-12 p-0 d-flex'>
                     <Sidebar></Sidebar>
                     <BaseRouter setAuth={setAuth} setCompany={setCompany}></BaseRouter>
                  </div>
               </>}
               {auth === 'false' && !path.startsWith('/employee-invitations/') &&
                  <Login setAuth={setAuth}></Login>
               }
            </Router>
         </AppContext.Provider>
      </div>
   );
}

export default App;
