import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ToastContainer } from "react-toastify";
import { t } from "../translations/Translation";
import PlanningOverview from "../components/organisms/PlanningOverview";
import HolidayOverview from "../components/organisms/HolidayOverview"
import OpenShiftOverview from "../components/organisms/OpenShiftOverview"
import OpenShiftListWithDetails from "../components/organisms/OpenShiftListWithDetails";
import BackIcon from "../static/icons/BackIcon.png"
export default function Planning({ setHeaderCompanyDropdown }) {

    const [tabIndex, setTabIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [shiftId, setShiftId] = useState();
    // Planning tabs list data
    const TabsData = [
        { tabHeading: t("OVERVIEW"), tabName: 'company' },
        { tabHeading: t("PLANNING_LOGS"), tabName: 'location' },
        { tabHeading: t("HOLIDAY_LEAVE"), tabName: 'workstation' },
        { tabHeading: t("EVENT_PLANNING"), tabName: 'cost center' },
        { tabHeading: t("OPEN_SHIFT"), tabName: 'workstation' }
    ]
    return (
        !showDetails ? (<div className="right-container">
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
                        <div className="tablescroll"><HolidayOverview></HolidayOverview></div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tablescroll"></div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tablescroll">< OpenShiftOverview setHeaderCompanyDropdown={setHeaderCompanyDropdown} setShowDetails={setShowDetails} showDetails={showDetails} shiftId={shiftId} setShiftId={setShiftId}></OpenShiftOverview></div>
                        {/* <div className="tablescroll"><OpenShiftListWithDetails handleView={handleView} ></OpenShiftListWithDetails></div> */}
                    </TabPanel>
                </Tabs>
            </div>
        </div>) : (<div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <div className="col-md-12 row mt-3 mx-0 px-0 "> 
                    <div className="col-md-6 float-left">
                        <h4>{showDetails && <img className="shortcut-icon mr-2 mb-1" onClick={() => setShowDetails(false)} src={BackIcon}></img>}Open shifts</h4>
                    </div>
                    <div className="col-md-6 float-right">

                    </div>
                </div>
                <OpenShiftListWithDetails setShowDetails={setShowDetails} showDetails={showDetails} shiftId={shiftId} setShiftId={setShiftId}></OpenShiftListWithDetails>
            </div></div>)

    )
}
