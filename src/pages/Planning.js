import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ToastContainer } from "react-toastify";
import { t } from "../translations/Translation";
import PlanningOverview from "../components/organisms/PlanningOverview";
import AddLeavePopup from "../components/molecules/AddLeavePopup"
export default function Planning() {

    const [tabIndex, setTabIndex] = useState(0);

    // Planning tabs list data
    const TabsData = [
        { tabHeading: t("OVERVIEW"), tabName: 'company' },
        { tabHeading: t("PLANNING_LOGS"), tabName: 'location' },
        { tabHeading: t("HOLIDAY_LEAVE"), tabName: 'workstation' },
        { tabHeading: t("EVENT_PLANNING"), tabName: 'cost center' },
    ]


    return (
        <div className="right-container">
            <div className="company-tab-width mt-3">
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
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
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
                        <div className="tablescroll"><AddLeavePopup buttonName={'Cancel'} onConfirm={"save"}></AddLeavePopup></div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tablescroll"></div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>

    )
}
