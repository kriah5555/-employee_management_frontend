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



export default function PlanningOverview() {

    // Filter options and selected filters
    const [locationArr, setLocationArr] = useState();
    const [workstationArr, setWorkstationArr] = useState([]);
    const [employeeTypeArr, setEmployeeTypeArr] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState({});
    const [selectedWorkstation, setSelectedWorkstation] = useState([]);
    const [selectedEmployeeType, setSelectedEmployeeType] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);
    const [enableShifts, setEnableshifts] = useState(false);
    const [addLeave, setAddLeave] = useState(false);

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
            "year": currentDate.getFullYear(),
            "employee_types": []
        }
    )

    // Weekly tab data
    const [monthNumber, setMonthNumber] = useState(currentDate.getMonth());
    const [weekNumberData, setWeekNumberData] = useState('Current week');
    const [lastWeek, setLastWeek] = useState(getWeekNumberByDate(year + '-12-31'))

    // Day tab data
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [dayData, setDayData] = useState(currentDate.getDate() + ' ' + Months[currentDate.getMonth()] + ', ' + currentDate.getFullYear());
    const [date, setDate] = useState(new Date());
    const [dayDate, setDayDate] = useState();


    // Planning overview tab list data
    const TabsData = [
        { tabHeading: ("Month"), tabName: 'month' },
        { tabHeading: ("Week"), tabName: 'week' },
        { tabHeading: ("Day"), tabName: 'day' },
    ]

    useEffect(() => {
        AXIOS.service(FilterOptionsApiUrl, 'POST')
            .then((result) => {
                if (result?.success) {
                    let locations = Object.entries(result.data.locations)
                    let arr = []
                    locations.map((val, i) => {
                        let option = { value: val[0], label: val[1] }
                        arr.push(option);
                    })
                    setSelectedLocation(arr.length === 1 ? arr[0] : '');
                    monthlyData['location'] = arr.length === 1 ? arr[0].value : ''
                    setLocationArr(arr);
                    setWorkstationArr(arr.length === 1 ? result.data.workstations[arr[0].value].workstations : result.data.workstations);
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
        AXIOS.service(GetMonthlyPlanningApiUrl, 'POST', month)
            .then((result) => {
                if (result?.success) {
                    setPlanningDates(result.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [selectedLocation, selectedWorkstation, selectedEmployeeType, monthNumber])


    useEffect(() => {
        if (weekNumber === weeknum) {
            setWeekNumberData('Current week')
        }
        setDayData(date.getDate() + ' ' + Months[date.getMonth()] + ', ' + date.getFullYear());

    }, [tabIndex])


    // Filter fields data
    const filterData = [
        { title: 'Location', name: 'location', required: true, options: locationArr, selectedOptions: selectedLocation, isMulti: false, type: 'dropdown', style: "col-md-4 float-left" },
        { title: 'Workstation', name: 'workstation', required: false, options: selectedLocation.value && workstationArr[selectedLocation.value] !== undefined ? workstationArr[selectedLocation.value].workstations : workstationArr, selectedOptions: selectedWorkstation, isMulti: true, type: 'dropdown', style: "col-md-4 float-left" },
        { title: 'Employee type', name: 'employee_type', required: false, options: employeeTypeArr, selectedOptions: selectedEmployeeType, isMulti: true, type: 'dropdown', style: "col-md-4 float-left" },
    ]

    // Function to set selected filters
    const setValues = (index, name, value, field) => {
        let monthData = { ...monthlyData }
        if (name === 'location') {
            if (selectedLocation !== value) {
                setSelectedWorkstation([])
                monthData['workstations'] = []
            }
            monthData['locations'] = value.value
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
            setDate(nextDate)
            setYear(nextDate.getFullYear());
            setDayData(nextDate.getDate() + ' ' + Months[nextDate.getMonth()] + ', ' + nextDate.getFullYear())
        }
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
                // OnSave={OnSave}
                ></FormsNew>
            </div>

            {tabIndex === 1 && <div className="d-flex justify-content-between">
                <Switch label="Show Availability for selected week" id="switch4" styleClass="" lableClick={true} onChange={() => console.log(true)} checked={false} />
                <Switch label="Use preferred shifts" id="switch4" styleClass="" lableClick={true} onChange={() => setEnableshifts(!enableShifts)} checked={enableShifts} />
            </div>}

            <div className="monthly-overview bg-white mt-2">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => { setTabIndex(index); setWeekNumber(weeknum); setYear(currentDate.getFullYear()); setDate(currentDate) }}>
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
                                <img className="planning-icon mr-4 mt-1 pointer" title="Import planning" src={AddLeaveIcon} onClick={() => setAddLeave(true)}></img>
                                <img className="planning-icon mr-4 mt-1 pointer" title="Import planning" src={ImportIcon}></img>
                                <a href="/clone-plannings"><img className="planning-icon mr-2 mt-1 pointer" title="Clone planning" src={CloneIcon}></img></a>
                            </div>
                        </div>
                    </TabList>

                    <TabPanel>
                        <div className="px-3 pb-3"><CalendarLayout planningDates={planningDates} ChangeTab={ChangeTab} setYear={setYear} setMonthNumber={setMonthNumber}></CalendarLayout></div>
                        {addLeave && <AddLeavePopup buttonName={'Cancel'} setAddLeave={setAddLeave} addLeave={addLeave}></AddLeavePopup>}
                    </TabPanel>

                    <TabPanel>
                        <div className="px-3 pb-3"><WeeklyOverview weekNumber={weekNumber} ChangeTab={ChangeTab} year={year} enableShifts={enableShifts} locId={selectedLocation.value}></WeeklyOverview></div>
                    </TabPanel>

                    <TabPanel>
                        <div className="px-3 pb-3"><DayOverview dayDate={dayDate} year={year} locId={selectedLocation.value} EmpTypeIds={monthlyData['employee_types']} wsIds={monthlyData['workstations']}></DayOverview></div>
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    )
}
