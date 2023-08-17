import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { t } from "../../translations/Translation";
import CompanyOverview from "../molecules/CompanyOverview";
import 'react-tabs/style/react-tabs.css';
import AddCompany from "../../pages/Add_company";
import AddLocationForm from "../molecules/LocationForm";
import AddCompanyForm from "../molecules/AddCompanyForm";
import WorkstationForm from "../molecules/WorkstationForm";


export default function CompanyCreation() {

    const TabsData = [
        { tabHeading: t("COMPANY"), tabName: 'company' },
        { tabHeading: t("LOCATIONS"), tabName: 'location' },
        { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
        { tabHeading: t("RULES"), tabName: 'rules' },
    ]

    const [locations, setLocations]=useState([{
        location:"",
        loc_street:"",
        loc_HouseNum:"",
        loc_postal_code:"",
        loc_postbox_num:"",
        loc_city:"",
        loc_country:"",
    }]);

    const [workstations, setWorkstations]=useState([{
        workstation_name:"",
        blocked:"",
        sequence_num:"",
        addFunctions:[]
    }]);



    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 mb-3 border bg-white">
                <Tabs>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}

                    </TabList>

                    <TabPanel>
                        <div className="tablescroll"><AddCompanyForm></AddCompanyForm></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll"><AddLocationForm locations={locations} setLocations={setLocations}></AddLocationForm></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll"><WorkstationForm workstations={workstations} setWorkstations={setWorkstations}></WorkstationForm></div>
                    </TabPanel>

                    <TabPanel>
                        <h3 className="text-center mt-3">Rules</h3>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
