import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { t } from "../../translations/Translation";
import 'react-tabs/style/react-tabs.css';
import AddLocationForm from "../molecules/LocationForm";
import AddCompanyForm from "../molecules/AddCompanyForm";
import WorkstationForm from "../molecules/WorkstationForm";
import BackIcon from "../../static/icons/BackIcon.png";
import { useNavigate } from "react-router-dom";


export default function CompanyCreation() {

    const navigate = useNavigate();

    const TabsData = [
        { tabHeading: t("COMPANY"), tabName: 'company' },
        { tabHeading: t("LOCATIONS"), tabName: 'location' },
        { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
        { tabHeading: t("RULES"), tabName: 'rules' },
    ]

    return (
        <div className="right-creation-container ">
            <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
                <h4 className="mb-0 text-color"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate('/manage-companies')} src={BackIcon}></img> Create company</h4>
            </div>
            <div className="company-tab-width mt-2 mb-3 mx-auto border bg-white">
                <Tabs>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                    </TabList>

                    <TabPanel>
                        <div className=""><AddCompanyForm></AddCompanyForm></div>
                    </TabPanel>

                    <TabPanel>
                        <div className=""><AddLocationForm ></AddLocationForm></div>
                    </TabPanel>

                    <TabPanel>
                        <div className=""><WorkstationForm></WorkstationForm></div>
                    </TabPanel>

                    <TabPanel>
                        <h3 className="text-center mt-3">Rules</h3>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
