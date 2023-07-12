import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import AvailableIcon from "../../static/icons/Available.svg"
import UnAvailableIcon from "../../static/icons/Notavailable.svg"
import RemarkIcon from "../../static/icons/warning.svg"
import { GetFormattedDate } from '../CommonFunctions';


export default function CalendarLayout(props) {
  const [value, onChange] = useState(new Date());

  // Dummy data for showing availability and unavailability with remarks
  const availableDates = ['02-07-2023', '03-07-2023', '04-07-2023', '05-07-2023', '06-07-2023', '07-07-2023', '08-07-2023', '13-07-2023', '14-07-2023',
                          '15-07-2023', '18-07-2023', '19-07-2023', '20-07-2023', '21-07-2023', '22-07-2023', '23-07-2023', '28-07-2023', '29-07-2023']

  const remarks = ['10-07-2023', '12-07-2023', '27-07-2023', '16-07-2023', '27-07-2023', '01-07-2023']


  // Get available and unavailable and remark icons
  const getIcon = (date) => {
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
  }



  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        defaultValue={new Date()}
        className="col-md-12 p-0 mt-5"
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