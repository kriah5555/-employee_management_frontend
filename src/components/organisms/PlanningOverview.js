import React, { useState } from "react";
import FormsNew from "../molecules/FormsNew";
import CalendarLayout from "../../utilities/calendar/CalendarLayout";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CloneIcon from "../../static/icons/Clone.svg";
import ImportIcon from "../../static/icons/Import.svg";
import AddLeaveIcon from "../../static/icons/addLeave.svg";
import WeeklyOverview from "../molecules/WeeklyOverview";
import Switch from "../atoms/Switch";

export default function PlanningOverview() {

    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedWorkstation, setSelectedWorkstation] = useState([]);
    const [selectedEmployeeType, setSelectedEmployeeType] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [enableShifts, setEnableshifts] = useState(false);


    // Planning overview tab list data
    const TabsData = [
        { tabHeading: ("Month"), tabName: 'month' },
        { tabHeading: ("Week"), tabName: 'week' },
        { tabHeading: ("Day"), tabName: 'day' },
    ]

    // Location dummy options
    const locationOptions = [
        { value: '1', label: 'Location 1' },
        { value: '2', label: 'Location 2' },
        { value: '3', label: 'Location 3' }
    ]

    // Workstation dummy options
    const workStationOptions = [
        { value: '1', label: 'Workstation 1' },
        { value: '2', label: 'Workstation 2' },
        { value: '3', label: 'Workstation 3' }
    ]

    // Employee type dummy options
    const employeeTypeOptions = [
        { value: '1', label: 'Employee type 1' },
        { value: '2', label: 'Employee type 2' },
        { value: '3', label: 'Employee type 3' }
    ]

    // Filter fields data
    const filterData = [
        { title: 'Location', name: 'location', required: true, options: locationOptions, selectedOptions: selectedLocation, isMulti: false, type: 'dropdown', style: "col-md-4 float-left" },
        { title: 'Workstation', name: 'workstation', required: false, options: workStationOptions, selectedOptions: selectedWorkstation, isMulti: true, type: 'dropdown', style: "col-md-4 float-left" },
        { title: 'Employee type', name: 'employee_type', required: false, options: employeeTypeOptions, selectedOptions: selectedEmployeeType, isMulti: true, type: 'dropdown', style: "col-md-4 float-left" },
    ]

    // Function set selected filters
    const setValues = (index, name, value, field) => {
        if (name === 'location') {
            setSelectedLocation(value);
        } else if (name === 'workstation') {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            setSelectedWorkstation(value);
        } else if (name === 'employee_type') {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            setSelectedEmployeeType(value);
        }
    }

    const OnSave = () => {

    }

    return (
        <div className="">
            <div className="bg-white">
                <FormsNew
                    view="filters"
                    formTitle={''}
                    formattedData={[]}
                    data={filterData}
                    SetValues={setValues}
                    OnSave={OnSave}
                ></FormsNew>
            </div>

            {tabIndex === 1 && <div className="d-flex justify-content-between">
                <Switch label="Show Availability for selected week" id="switch4" styleClass="" lableClick={true} onChange={() => console.log(true)} checked={false}/>
                <Switch label="Use preferred shifts" id="switch4" styleClass="" lableClick={true} onChange={() => setEnableshifts(!enableShifts)} checked={enableShifts} />
            </div>}

            <div className="monthly-overview bg-white mt-2">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}
                        <div className="react-tabs__tab border-0 pt-0 float-right">
                            <div className="d-flex justify-content-end">
                                <img className="planning-icon mr-4 mt-1 pointer" title="Import planning" src={AddLeaveIcon}></img>
                                <img className="planning-icon mr-4 mt-1 pointer" title="Import planning" src={ImportIcon}></img>
                                <img className="planning-icon mr-2 mt-1 pointer" title="Clone planning" src={CloneIcon}></img>
                            </div>
                        </div>
                    </TabList>

                    <TabPanel>
                        <div className="px-3 pb-3"><CalendarLayout></CalendarLayout></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="px-3 pb-3"><WeeklyOverview enableShifts={enableShifts} ></WeeklyOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="tablescroll"></div>
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    )
}
