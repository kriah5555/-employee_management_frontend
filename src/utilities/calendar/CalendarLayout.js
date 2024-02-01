import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import AvailableIcon from "../../static/icons/Available.svg"
import UnAvailableIcon from "../../static/icons/Notavailable.svg"
import RemarkIcon from "../../static/icons/warning.svg"
import { GetFormattedDate, padTo2Digits } from '../CommonFunctions';
import { t } from '../../translations/Translation';
import { EmployeeAvailabilityApiUrl } from '../../routes/ApiEndPoints';
import { APICALL as AXIOS } from "../../services/AxiosServices";




export default function CalendarLayout({ view, planningDates, ChangeTab, setYear, setMonthNumber, eid }) {

  const [value, onChange] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([])
  const [unavailableDates, setUnavailableDates] = useState([])
  const [remarks, setRemarks] = useState({})


  const getAvailability = (data) => {

    AXIOS.service(EmployeeAvailabilityApiUrl, "POST", data)
      .then((result) => {
        if (result?.success) {
          setAvailableDates(result.data?.available_dates);
          setUnavailableDates(result.data?.not_available_dates);
          setRemarks(result.data?.remarks);

        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    let data = {
      "employee_profile_id": eid,
      "period": padTo2Digits(value.getMonth() + 1) + "-" + value.getFullYear()
    }
    getAvailability(data)
  }, [eid])



  const UpdateYear = (e) => {
    if (view === 'availability') {
      let data = {
        "employee_profile_id": eid,
        "period": padTo2Digits(e.activeStartDate.getMonth() + 1) + "-" + e.activeStartDate.getFullYear()
      }
      getAvailability(data)
    } else {
      setYear(e.activeStartDate.getFullYear());
      setMonthNumber(e.activeStartDate.getMonth());
    }
  }



  // Get available and unavailable and remark icons
  const getIcon = (date) => {
    if (view === 'availability') {
      if (availableDates.includes(date)) {
        return (
          <>
            <img className='m-0 p-0 calendar-icon h-0' src={AvailableIcon} alt={t("ICON")}></img>
            <br></br>
            {remarks[date] && <img className='m-0 p-0 remark-icon h-0' src={RemarkIcon} alt={t("ICON")} title={remarks[date]}></img>}
          </>
        )
      } else if (unavailableDates.includes(date)) {
        return (
          <>
            <img className='m-0 p-0 calendar-icon h-0' src={UnAvailableIcon} alt={t("ICON")}></img>
            <br></br>
            {remarks[date] && <img className='m-0 p-0 remark-icon h-0' src={RemarkIcon} alt={t("ICON")} title={remarks[date]}></img>}
          </>
        )
      }
    } else {
      if (planningDates[date]) {
        return (
          <p className='calendar-tile-content' id='text-indii-blue'>{planningDates[date]}</p>
        )
      }

    }
  }



  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        defaultValue={new Date()}
        className={view === 'availability' ? "col-md-12 p-0 mt-5" : "col-md-12 p-0"}
        showWeekNumbers={true}
        showNavigation={true}
        next2Label={null}
        prev2Label={null}
        locale={localStorage.getItem('active_language') || 'en'}
        onClickWeekNumber={(e) => {view !== 'availability' && ChangeTab('week', e)}}
        onActiveStartDateChange={(e) => { UpdateYear(e) }}
        onClickDay={(e) => {view !== 'availability' && ChangeTab('day', e)}}
        onClickMonth={(e) => { UpdateYear(e) }}
        tileContent={(e) => getIcon(GetFormattedDate(e.date, e.date.getFullYear()))}
      />
    </div>
  );
}