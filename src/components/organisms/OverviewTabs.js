import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { t } from "../../translations/Translation";
import CompanyOverviews from "../molecules/CompanyOverviews";
import 'react-tabs/style/react-tabs.css';

import BackIcon from "../../static/icons/BackIcon.png"
import FilterIcon from "../../static/icons/Filter.svg";
import ExportIcon from "../../static/icons/Export.svg";

import { ToastContainer } from 'react-toastify';
import Rules from "../molecules/Rules";
import AddCompany from "../../static/icons/AddCompany";
import AddLocation from "../../static/icons/AddLocation";
import Workstation from "../../static/icons/Workstation";
import Salaries from "../../static/icons/Salaries";
import ContractType from "../../static/icons/ContractType";
import Switch from "../../components/atoms/Switch"

export default function OverviewTabs({ setCompany }) {

    const [addIcon, setAddIcon] = useState(<AddCompany />);
    const [addTitle, setAddTitle] = useState('Add company');
    const [addUrl, setAddUrl] = useState('/manage-companies/company/0');
    const [tabIndex, setTabIndex] = useState(0);
    const [TabsData, setTabsData] = useState([{ tabHeading: t("COMPANY"), tabName: 'company' }])

    const [companySelected, setCompanySelected] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
    const [showAllCompanies, setShowAllCompanies] = useState(false);

    useEffect(() => {
        if (window.location.hash !== '' && window.location.hash !== '#') {
            // setTabIndex(parseInt(window.location.hash.split('#')[1]));
            if (window.location.hash === '#location') {
                setCompanySelected(true);
                setTabIndex(0);
                getRightHeaderContent('location');
                window.location.hash = ''
            } else if (window.location.hash === '#workstation') {
                setTabIndex(1);
                getRightHeaderContent('workstation');
                setCompanySelected(true);
                window.location.hash = ''
            } else if (window.location.hash === '#responsible_person') {
                setTabIndex(2);
                getRightHeaderContent('responsible person');
                setCompanySelected(true);
                window.location.hash = ''
            } else if (window.location.hash === '#cost_center') {
                setTabIndex(3)
                getRightHeaderContent('cost center');
                window.location.hash = ''
                setCompanySelected(true);
            }
            window.location.hash = ''
        }
    }, [companySelected])


    const getRightHeaderContent = (tabName) => {

        if (tabName === 'company') {
            setAddIcon(<AddCompany />);
            setAddTitle(t("ADD_COMPANY"));
            setAddUrl('/manage-companies/company/0');
        } else if (tabName === 'location') {
            setAddIcon(<AddLocation />);
            setAddTitle(t("ADD_LOCATION"));
            setAddUrl('/manage-companies/location/0')
        } else if (tabName === 'workstation') {
            setAddIcon(<Workstation />);
            setAddTitle(t("ADD_WORKSTATION"));
            setAddUrl('/manage-companies/workstation/0')
        } else if (tabName === 'responsible_person') {
            setAddIcon(<Workstation />);
            setAddTitle(t("ADD_RESPONSIBLE_PERSON"));
            setAddUrl('/manage-companies/responsible_person/0')
        } else if (tabName === 'cost center') {
            setAddIcon(<Salaries />);
            setAddTitle(t("ADD_COST_CENTER"));
            setAddUrl('/manage-companies/cost_center/0')
        } else if (tabName === 'contracts') {
            setAddIcon(<ContractType />)
            setAddTitle(t("ADD_CONTRACT"));
            setAddUrl('/add-contracts-template/company');
        } else {
            setAddIcon('');
            setAddTitle('');
        }
    }

    // const TabsData = [
    //     { tabHeading: t("COMPANY"), tabName: 'company' },
    //     { tabHeading: t("LOCATIONS"), tabName: 'location' },
    //     { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
    //     { tabHeading: t("COST_CENTER"), tabName: 'cost center' },
    //     { tabHeading: t("CONTRACTS"), tabName: 'contracts' },
    //     { tabHeading: t("DIMONA"), tabName: 'dimona' },
    //     { tabHeading: t("RULES"), tabName: 'rules' },
    // ]

    useEffect(() => {
        if (companySelected) {
            getRightHeaderContent('location');
            setTabsData([
                { tabHeading: t("LOCATIONS"), tabName: 'location' },
                { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
                { tabHeading: t("RESP_PERSON"), tabName: 'responsible_person' },
                { tabHeading: t("COST_CENTER"), tabName: 'cost center' },
                { tabHeading: t("CONTRACTS"), tabName: 'contracts' },
                { tabHeading: t("DIMONA"), tabName: 'dimona' },
                { tabHeading: t("RULES"), tabName: 'rules' },
            ])
        } else {
            getRightHeaderContent('company')
            // setTabIndex(0)
            setTabsData([
                { tabHeading: t("COMPANY"), tabName: 'company' },
            ])
        }
    }, [companySelected])

    const getArchived = () => {
        setIsArchived(!isArchived)

    }


    return (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <TabList>
                <div className="d-flex align-items-center manage_company_header">
                    <div className="w-100 d-flex">
                        {TabsData.map((val) => {
                            return (
                                <Tab className="manage_company_tabs" key={val.tabName} onClick={() => getRightHeaderContent(val.tabName)} >{val.tabHeading}</Tab>
                            )
                        })}
                    </div>

                    {addIcon && <div className=" border-0  add_company_block">
                        <div className="d-flex justify-content-end mx-3">
                            {addTitle === t("ADD_COMPANY") && !isArchived && <div><Switch label={"Show all the companies"} id="switch4" lableClick={true} styleClass="text-nowrap mb-0 pr-3 " checked={showAllCompanies} onChange={() => setShowAllCompanies(!showAllCompanies)} ></Switch></div>}
                            {addTitle === t("ADD_COMPANY") && <div><Switch label={"Archived"} id="switch3" lableClick={true} styleClass="text-nowrap mb-0 px-3 " onChange={() => setIsArchived(!isArchived)} checked={isArchived}></Switch></div>}
                            {addTitle !== t("ADD_COMPANY") && <div><p className="mb-0 text-dark text-nowrap pr-3" onClick={() => setCompanySelected(false)}><img className="header-icon mr-2 pointer" src={BackIcon}></img>{t("COMPANY_OVERVIEW")}</p></div>}
                            {<div className="align-self-center"><a href={addUrl}><span className="mb-0 text-nowrap mt-5 add_btn">{addIcon}<span>{addTitle}</span></span></a></div>}
                            {/* {addTitle !== 'Add company' &&<p className="mb-0 mr-3 text-dark"><img className="header-icon mr-2" src={addIcon}></img>{addTitle}</p>} */}
                            {/* <img src={FilterIcon} className="header-icon ml-2"></img>
                        <img src={ExportIcon} className="header-icon ml-2"></img> */}
                        </div>
                    </div>}
                </div>

            </TabList>

            <div>
                {!companySelected && <TabPanel>
                    <div className="tablescroll"><CompanyOverviews setCompany={setCompany} overviewContent={'company'} setCompanySelected={setCompanySelected} isArchived={isArchived} showAllCompanies={showAllCompanies}></CompanyOverviews></div>
                </TabPanel>}

                <TabPanel>
                    <div className="tablescroll"><CompanyOverviews setCompany={setCompany} overviewContent={'location'}></CompanyOverviews></div>
                </TabPanel>

                <TabPanel>
                    <div className="tablescroll"><CompanyOverviews setCompany={setCompany} overviewContent={'workstation'}></CompanyOverviews></div>
                </TabPanel>
                <TabPanel>
                    <div className="tablescroll"><CompanyOverviews setCompany={setCompany} overviewContent={'responsible_person'}></CompanyOverviews></div>
                </TabPanel>
                <TabPanel>
                    <div className="tablescroll"><CompanyOverviews setCompany={setCompany} overviewContent={'cost center'}></CompanyOverviews></div>
                </TabPanel>

                <TabPanel>
                    <h3 className="text-center mt-3"><CompanyOverviews setCompany={setCompany} overviewContent={'contracts'}></CompanyOverviews></h3>
                </TabPanel>

                <TabPanel>
                    <div className="text-center mt-3 "><CompanyOverviews setCompany={setCompany} overviewContent={'dimona'}></CompanyOverviews></div>
                </TabPanel>

                <TabPanel>
                    {/* <div className="tablescroll"> */}
                    <Rules overviewContent={'rules'}></Rules>
                    {/* </div> */}
                </TabPanel>
            </div>
        </Tabs>
    )
}
