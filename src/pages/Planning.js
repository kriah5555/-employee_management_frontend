import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ToastContainer } from "react-toastify";
import { t } from "../translations/Translation";
import PlanningOverview from "../components/organisms/PlanningOverview";
import HolidayOverview from "../components/organisms/HolidayOverview"
import OpenShiftOverview from "../components/organisms/OpenShiftOverview"
import OpenShiftListWithDetails from "../components/organisms/OpenShiftListWithDetails";
import BackIcon from "../static/icons/BackIcon.png"
import AddOthPlans from "../components/organisms/AddOthPlans";
import DimonaOverview from "../components/organisms/DimonaOverview";
import OthPlanning from "../components/organisms/OthPlanning";

export default function Planning({ setHeaderCompanyDropdown }) {

    const [tabIndex, setTabIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        let hash = window.location.hash
        if (hash === '#dimona') {
            setTabIndex(5)
        } else if (hash === '#holiday') {
            setTabIndex(2)
        } else if (hash === '#open_shift') {
            setTabIndex(4)
        }
        window.location.hash = ''
    }, [])

    // Planning tabs list data
    const TabsData = [
        { tabHeading: t("OVERVIEW"), tabName: 'company' },
        { tabHeading: t("PLANNING_LOGS"), tabName: 'location' },
        { tabHeading: t("HOLIDAY_LEAVE"), tabName: 'workstation' },
        { tabHeading: t("EVENT_PLANNING"), tabName: 'cost center' },
        { tabHeading: t("OPEN_SHIFT"), tabName: 'open shift' },
        { tabHeading: t("DIMONA_OVERVIEW"), tabName: 'dimona overview' },
        { tabHeading: t("OTH_PLANNING"), tabName: 'oth planning' }
    ]
    return (
        <div className="right-container">
            <div className="company-tab-width mt-3">
                <Tabs className="h-100" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
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
                    <TabList className="d-flex p-0 mb-0">
                        {TabsData.map((val) => {
                            return (
                                <Tab className="planing_tabs" key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                    </TabList>

                    <TabPanel>
                        <div className="mt-1"><PlanningOverview></PlanningOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll"></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll"><HolidayOverview></HolidayOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll"></div>
                    </TabPanel>

                    <TabPanel className="open_shift_Main react-tabs__tab-panel">
                        <div className="tablescroll h-100"><OpenShiftOverview setHeaderCompanyDropdown={setHeaderCompanyDropdown}></OpenShiftOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="mt-1"><DimonaOverview></DimonaOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll h-100"><OthPlanning></OthPlanning></div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>

    )
}
