import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { t } from "../../translations/Translation";
import CompanyOverview from "../molecules/CompanyOverview";
import 'react-tabs/style/react-tabs.css';
import LocationOverview from "../molecules/LocationOverview";
import WorkstationOverview from "../molecules/WorkstationOverview";
import AddCompanyIcon from "../../static/icons/AddCompany.svg";
import FilterIcon from "../../static/icons/Filter.svg";
import ExportIcon from "../../static/icons/Export.svg";
import AddLocationIcon from "../../static/icons/AddLocation.svg"
import AddWorkstationIcon from "../../static/icons/Workstation.svg"


export default function OverviewTabs() {

    const [addIcon, setAddIcon] = useState(AddCompanyIcon);
    const [addTitle, setAddTitle] = useState('Add company');
    const [addUrl, setAddUrl] = useState('/manage-companies/add-company');

    const getRightHeaderContent = (tabName) => {

        if (tabName === 'company') {
            setAddIcon(AddCompanyIcon);
            setAddTitle('Add company');
        } else if (tabName === 'location') {
            setAddIcon(AddLocationIcon);
            setAddTitle('Add location');
        } else if (tabName === 'workstation') {
            setAddIcon(AddWorkstationIcon);
            setAddTitle('Add workstation');
        } else {
            setAddIcon('');
            setAddTitle('');
        }
    }

    const TabsData = [
        { tabHeading: t("COMPANY"), tabName: 'company' },
        { tabHeading: t("LOCATIONS"), tabName: 'location' },
        { tabHeading: t("WORKSTATION"), tabName: 'workstation' },
        { tabHeading: t("CONTRACTS"), tabName: 'contracts' },
        { tabHeading: t("DIMONA"), tabName: 'dimona' },
        { tabHeading: t("RULES"), tabName: 'rules' },
    ]


    return (
        <Tabs>
            <TabList>
                {TabsData.map((val) => {
                    return (
                        <Tab key={val.tabName} onClick={() => getRightHeaderContent(val.tabName)} >{val.tabHeading}</Tab>
                    )
                })}
                {addIcon && <div className="react-tabs__tab border-0 right-end-tab">
                    <div className="d-flex justify-content-end">
                        {addTitle === 'Add company' &&<a href="/manage-companies/add-company"><p className="mb-0 mr-3 text-dark"><img className="header-icon mr-2" src={addIcon}></img>{addTitle}</p></a>}
                        {addTitle !== 'Add company' &&<p className="mb-0 mr-3 text-dark"><img className="header-icon mr-2" src={addIcon}></img>{addTitle}</p>}
                        <img src={FilterIcon} className="header-icon ml-4"></img>
                        <img src={ExportIcon} className="header-icon ml-4"></img>
                    </div>
                </div>}
            </TabList>

            <TabPanel>
                <div className="tablescroll"><CompanyOverview></CompanyOverview></div>
            </TabPanel>

            <TabPanel>
                <div className="tablescroll"><LocationOverview></LocationOverview></div>
            </TabPanel>

            <TabPanel>
                <div className="tablescroll"><WorkstationOverview></WorkstationOverview></div>
            </TabPanel>

            <TabPanel>
                <h3 className="text-center mt-3">Contracts Overview</h3>
            </TabPanel>

            <TabPanel>
                <h3 className="text-center mt-3 ">Dimona</h3>
            </TabPanel>

            <TabPanel>
                <h3 className="text-center mt-3">Rules</h3>
            </TabPanel>
        </Tabs>
    )
}
