import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import AvailableIcon from "../../static/icons/Available.svg"
import UnAvailableIcon from "../../static/icons/Notavailable.svg"
import RemarkIcon from "../../static/icons/warning.svg"
import { GetFormattedDate } from '../CommonFunctions';


export default function CalendarLayout({ view }) {
  const [value, onChange] = useState(new Date());

  // Dummy data for showing availability and unavailability with remarks
  const availableDates = []

  const remarks = []


  // Get available and unavailable and remark icons
  const getIcon = (date) => {
    if (view === 'availability') {
      if (availableDates.includes(date)) {
        return (
          <img className='m-0 p-0 calendar-icon h-0' src={AvailableIcon}></img>
        )
      } else if (remarks.includes(date)) {
        return (
          <>
            <img className='m-0 p-0 calendar-icon h-0' src={UnAvailableIcon}></img>
            <br></br>
            <img className='m-0 p-0 remark-icon h-0' src={RemarkIcon}></img>
          </>
        )
      } else {
        return (
          <img className='m-0 p-0 calendar-icon h-0' src={UnAvailableIcon}></img>
        )
      }
    } else {
      // return (
      //   <p className='calendar-tile-content'>0</p>
      // )
    }
  }



  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        defaultValue={new Date()}
        className={view === 'availability' ? "col-md-12 p-0 mt-5": "col-md-12 p-0"}
        showWeekNumbers={true}
        showNavigation={true}
        next2Label={null}
        prev2Label={null}
        locale={localStorage.getItem('active_language') || 'en'}
        onClickDay={(e) => { console.log(e) }}
        tileContent={(e) => getIcon(GetFormattedDate(e.date, e.date.getFullYear()))}
      />
    </div>
  );
}