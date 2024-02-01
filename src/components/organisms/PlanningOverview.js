import React, { useState, useEffect } from "react";
import FormsNew from "../molecules/FormsNew";
import CalendarLayout from "../../utilities/calendar/CalendarLayout";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CloneIcon from "../../static/icons/Clone.svg";
import ImportIcon from "../../static/icons/Import.svg";
import AddLeaveIcon from "../../static/icons/addLeave.svg";
import WeeklyOverview from "../molecules/WeeklyOverview";
import Switch from "../atoms/Switch";
import DayOverview from "../molecules/DayOverview";
import AddLeavePopup from "../molecules/AddLeavePopup";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { FilterOptionsApiUrl, GetMonthlyPlanningApiUrl, GetWeeklyPlanningApiUrl } from "../../routes/ApiEndPoints";
import { GetFormattedDate, getWeekNumberByDate, getCurrentWeek } from '../../utilities/CommonFunctions';
import { t } from "../../translations/Translation";
import DimonaIcon from "../../static/icons/Dimona.svg";
import DimonaWhite from "../../static/icons/DimonaWhite";
import SendDimonaPopup from "../molecules/SendDimonaPopup";
import Popup from "../../utilities/popup/Popup"
import Dropdown from "../atoms/Dropdown";

export default function PlanningOverview() {

    // Filter options and selected filters
    const [locationArr, setLocationArr] = useState();
    const [workstationArr, setWorkstationArr] = useState([]);
    const [employeeTypeArr, setEmployeeTypeArr] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState({});
    const [selectedWorkstation, setSelectedWorkstation] = useState([]);
    const [selectedEmployeeType, setSelectedEmployeeType] = useState([]);

    const [tabIndex, setTabIndex] = useState(localStorage.getItem('week_tab') ? parseInt(localStorage.getItem('week_tab')) : 0);
    const [enableShifts, setEnableshifts] = useState(false);
    const [addLeave, setAddLeave] = useState(false);
    const [availableSwitch, setAvailableSwitch] = useState(false);
    const [dimonaStatus, setDimonaStatus] = useState(false)

    const currentDate = new Date();
    let weeknum = getCurrentWeek()

    // Monthly tab data
    const [planningDates, setPlanningDates] = useState([]);
    const [year, setYear] = useState(currentDate.getFullYear());
    const [weekNumber, setWeekNumber] = useState(weeknum);
    const [monthlyData, setMonthlyData] = useState(
        {
            'month': currentDate.getMonth(),
            "location": "",
            "workstations": [],
            "year": year,
            "employee_types": []
        }
    )

    // Weekly tab data
    const [monthNumber, setMonthNumber] = useState(currentDate.getMonth());
    const [weekNumberData, setWeekNumberData] = useState('Current week');
    const [lastWeek, setLastWeek] = useState(getWeekNumberByDate(year + '-12-31'))

    // Day tab data
    const Months = [t("JANUARY"), t("FEBRUARY"), t("MARCH"), t("APRIL"), t("MAY"), t("JUNE"), t("JULY"), t("AUGUST"), t("SEPTEMBER"), t("OCTOBER"), t("NOVEMBER"), t("DECEMBER")]
    const [dayData, setDayData] = useState(currentDate.getDate() + ' ' + Months[currentDate.getMonth()] + ', ' + currentDate.getFullYear());
    const [date, setDate] = useState(new Date());
    const [dayDate, setDayDate] = useState(GetFormattedDate(currentDate, currentDate.getFullYear()));
    const [showlocationPopup, setLocationPopup] = useState(false)

    // Planning overview tab list data
    const TabsData = [
        { tabHeading: t("MONTH"), tabName: 'month' },
        { tabHeading: t("WEEK"), tabName: 'week' },
        { tabHeading: t("DAY"), tabName: 'day' },
    ]

    useEffect(() => {
        AXIOS.service(FilterOptionsApiUrl, 'POST')
            .then((result) => {
                if (result?.success) {
                    setSelectedLocation(result.data.locations?.length === 1 ? result.data.locations[0] : '');
                    monthlyData['location'] = result.data.locations?.length === 1 ? result.data.locations[0].value : ''
                    setLocationArr(result.data.locations);
                    if (result.data.locations.length >=1) {
                        setLocationPopup(true)
                    }

                    setWorkstationArr(result.data.workstations)
                    setEmployeeTypeArr(result.data.employee_types);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        let month = { ...monthlyData }
        month['month'] = monthNumber + 1
        month['year'] = year
        if (tabIndex === 0) {
            AXIOS.service(GetMonthlyPlanningApiUrl, 'POST', month)
                .then((result) => {
                    if (result?.success) {
                        setPlanningDates(result.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [selectedLocation, selectedWorkstation, selectedEmployeeType, monthNumber, tabIndex])


    useEffect(() => {
        if (weekNumber === weeknum) {
            setWeekNumberData(t("CURRENT_WEEK"))
        }
        setDayData(date.getDate() + ' ' + Months[date.getMonth()] + ', ' + date.getFullYear());

    }, [tabIndex])

    // Filter fields data
    const filterData = [
        { title: t("LOCATION"), name: 'location', required: true, options: locationArr, selectedOptions: selectedLocation, isMulti: false, type: 'dropdown', style: "col-md-4 float-left" },
        { title: t("WORK_STATION"), name: 'workstation', required: false, options: selectedLocation.value ? workstationArr[selectedLocation.value] : [], selectedOptions: selectedWorkstation, isMulti: true, type: 'dropdown', style: "col-md-4 float-left" },
        { title: t("EMPLOYEE_TYPE"), name: 'employee_type', required: false, options: employeeTypeArr, selectedOptions: selectedEmployeeType, isMulti: true, type: 'dropdown', style: "col-md-4 float-left" },
    ]

    // Function to set selected filters
    const setValues = (index, name, value, field) => {
        let monthData = { ...monthlyData }
        if (name === 'location') {
            if (selectedLocation !== value) {
                setSelectedWorkstation([])
                monthData['workstations'] = []
            }
            monthData['location'] = value.value
            setSelectedLocation(value);
        } else if (name === 'workstation') {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            monthData['workstations'] = arr
            setSelectedWorkstation(value);
        } else if (name === 'employee_type') {
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            monthData['employee_types'] = arr
            setSelectedEmployeeType(value);
        }
        setMonthlyData(monthData)
    }

    // Function for changing date and week number on tab change
    const ChangeTab = (type, e) => {
        if (type === 'day') {
            setTabIndex(2);
            setDayDate(GetFormattedDate(e, e.getFullYear()))
            setDate(e)
            setDayData(e.getDate() + ' ' + Months[e.getMonth()] + ', ' + e.getFullYear())
        } else {
            setTabIndex(1);
            setWeekNumber(e);
            setWeekNumberData('Week ' + e)
        }
    }

    // Next or previous arrow action
    const setNextPrev = (type) => {
        if (type === 'prev' && tabIndex === 1) {
            let val = weekNumber - 1
            if (val === 0) {
                setYear(year - 1);
                setWeekNumber(getWeekNumberByDate((year - 1) + '-12-31'));
                setLastWeek(getWeekNumberByDate((year - 1) + '-12-31'))
                setWeekNumberData('Week ' + getWeekNumberByDate((year - 1) + '-12-31'))
            } else {
                setWeekNumber(val);
                setWeekNumberData('Week ' + val)
            }
        } else if (type === 'prev' && tabIndex === 2) {
            const prevDate = new Date(date);
            prevDate.setDate(date.getDate() - 1);
            setDate(prevDate);
            setDayDate(GetFormattedDate(prevDate, prevDate.getFullYear()))
            setYear(prevDate.getFullYear());
            setDayData(prevDate.getDate() + ' ' + Months[prevDate.getMonth()] + ', ' + prevDate.getFullYear())

        } else if (type === 'next' && tabIndex === 1) {
            let val = weekNumber + 1
            if (val > lastWeek) {
                setWeekNumber(1);
                setYear(year + 1);
                setLastWeek(getWeekNumberByDate((year + 1) + '-12-31'))
                setWeekNumberData('Week ' + 1)
            } else {
                setWeekNumber(val)
                setWeekNumberData('Week ' + val)
            }
        } else {
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            setDayDate(GetFormattedDate(nextDate, nextDate.getFullYear()))
            setDate(nextDate)
            setYear(nextDate.getFullYear());
            setDayData(nextDate.getDate() + ' ' + Months[nextDate.getMonth()] + ', ' + nextDate.getFullYear())
        }
    }


    return (
        <div className="planning_body">
            {!selectedLocation && showlocationPopup && <Popup
                body={
                    <>
                        <Dropdown
                            options={locationArr}
                            selectedOptions={selectedLocation}
                            onSelectFunction={(e) => setValues("", "location", e, "dropdown")}
                            CustomStyle="company-dropdown"
                            styleClass=""
                            isMulti={false}
                        ></Dropdown>
                    </>
                }
                onHide={() => setLocationPopup(false)}
                backdrop="static"
                title={t("PLEASE_SELECT_LOCATION")}
            ></Popup>}
            <div className="bg-white">
                <FormsNew
                    view="filters"
                    formTitle={''}
                    formattedData={[]}
                    data={filterData}
                    SetValues={setValues}
                // OnSave={OnSave}
                ></FormsNew>
            </div>
            {addLeave && <AddLeavePopup buttonName={t("CANCEL")} setAddLeave={setAddLeave} addLeave={addLeave}></AddLeavePopup>}
            {dimonaStatus && <SendDimonaPopup setDimonaStatus={setDimonaStatus} date={dayDate} setDate={setDayDate} selectedLocation={selectedLocation}></SendDimonaPopup>}

            {tabIndex === 1 && <div className="d-flex justify-content-between">
                <Switch label={t("AVAILABILITY_TEXT")} id="switch4" styleClass="" lableClick={true} onChange={() => setAvailableSwitch(!availableSwitch)} checked={availableSwitch} />
                <Switch label={t("PREFERRED_SHIFTS")} id="switch3" styleClass="" lableClick={true} onChange={() => setEnableshifts(!enableShifts)} checked={enableShifts} />
            </div>}

            <div className="monthly-overview bg-white mt-2 flex-1">
                <Tabs selectedIndex={parseInt(tabIndex)} onSelect={(index) => { setTabIndex(index); setWeekNumber(weeknum); setYear(currentDate.getFullYear()); setDate(currentDate); setDayDate(GetFormattedDate(currentDate, currentDate.getFullYear())); localStorage.setItem('week_tab', index) }}>
                    <TabList>
                        {tabIndex !== 0 && <div className="border-0 pt-0 d-flex float-left">
                            <button className="arrowButtons" onClick={() => setNextPrev('prev')}>‹</button>
                            <p className="monthText my-auto">{tabIndex === 1 ? weekNumberData : dayData}</p>
                            <button className="arrowButtons" onClick={() => setNextPrev('next')}>›</button>
                        </div>}

                        {TabsData.map((val) => {
                            return (
                                <Tab key={val.tabName} >{val.tabHeading}</Tab>
                            )
                        })}

                        <div className="react-tabs__tab border-0 pt-0 float-right">
                            <div className="d-flex justify-content-end">
                                <span className={'planning-icon mr-4 pointer'} title={t("SEND_DIMONA")} onClick={() => setDimonaStatus(true)}><DimonaWhite color={"#000"} /></span>
                                <img className="planning-icon mr-4 mt-1 pointer" title={t("IMPORT_PLANNING")} src={AddLeaveIcon} onClick={() => setAddLeave(true)}></img>
                                <img className="planning-icon mr-4 mt-1 pointer" title={t("IMPORT_PLANNING")} src={ImportIcon}></img>
                                <a href="/clone-plannings"><img className="planning-icon mr-2 mt-1 pointer" title={t("CLONE_PLANNING")} src={CloneIcon}></img></a>
                            </div>
                        </div>
                    </TabList>

                    <TabPanel>
                        <div className="px-3 pb-3"><CalendarLayout planningDates={planningDates} ChangeTab={ChangeTab} setYear={setYear} setMonthNumber={setMonthNumber}></CalendarLayout></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="px-3 pb-3"><WeeklyOverview weekNumber={weekNumber} ChangeTab={ChangeTab} year={year} availableSwitch={availableSwitch} enableShifts={enableShifts} locId={selectedLocation.value}></WeeklyOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="px-3 pb-3"><DayOverview dayDate={dayDate} year={year} locId={selectedLocation.value} EmpTypeIds={monthlyData['employee_types']} wsIds={monthlyData['workstations']}></DayOverview></div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
