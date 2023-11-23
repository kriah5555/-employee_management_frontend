import React from "react";
import LocationIcon from "../static/icons/Location.svg";
import CalendarIcon from "../static/icons/UurroosterCalendar.svg";
import QrcodeIcon from "../static/icons/UurroosterQrcode.svg";
import ExportIcon from "../static/icons/Export.svg";
import FilterIcon from "../static/icons/Filter.svg";
import RedIcon from "../static/icons/RedDot.svg";
import LeftArrowIcon from "../static/icons/LeftArrow.png";
import RightArrowIcon from "../static/icons/RightArrow.png";
import Dropdown from "../components/atoms/Dropdown";


export default function Uurrooster() {

    const head_arr = [
        { label: 'WS', colSpan: 0 },
        { label: 'Employee', colSpan: 0 },
        { label: 'Function', colSpan: 0 },
        { label: 'Start work', colSpan: 3 },
        { label: 'Pause', colSpan: 0 },
        { label: 'End work', colSpan: 3 },
        { label: 'Total', colSpan: 0 },
    ]
    // ['ws', 'Employee', 'Function', 'Start work', 'Pause', 'End work', 'Total']

    const body_arr = [
        ['', '', '', 'Planning', 'Started', 'Dimona', '', 'Planning', 'Stopped', 'Dimona', 'Cost'],
        ['Kitchen', 'Alain provist', 'Chef', '10:00', '10:01', 'Green', '13:30-14:30', '18:00', '18:45', 'Green', ''],
        ['Zaal', 'Robin', 'Chef', '10:00', '10:01', 'Green', '13:30-14:30', '18:00', '18:45', 'Green', ''],
    ]

    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <div className="col-md-12 d-flex mt-4">
                    <div className="col-md-3">
                        <p className=""><img className="mr-2 planning-icon" src={LocationIcon}></img>Location 01</p>
                        <p className=""><img className="mr-2 planning-icon" src={CalendarIcon}></img>08 November 2023</p>
                        <img className="" src={RedIcon}></img>
                    </div>
                    <div className="col-md-6">
                        <p className="text-center">Select location</p>
                        <Dropdown
                            styleClass={"col-md-8 px-0 mx-auto"}
                        ></Dropdown>
                        <div className="d-flex mt-1 border col-md-8 p-0 mx-auto">
                            <div className="button-style mr-5"><img className="planning-icon" src={LeftArrowIcon}></img></div>
                            <input className="px-5 mx-5 border-0" value={"16 January 2022, Friday"}></input>
                            <div className="button-style ml-5"><img className="planning-icon" src={RightArrowIcon}></img></div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end">
                        <div className="float-left">
                            <img className="mr-4" src={FilterIcon}></img>
                            <br></br>
                            <img className="mr-4 mt-4" src={ExportIcon}></img>
                        </div>
                        <img className="float-right d-flex" src={QrcodeIcon}></img>

                    </div>
                </div>

                <table className="table table-bordered company-tab-width mt-3 mx-auto bg-right-container">
                    <thead>
                        <tr>
                            {head_arr.map((title, index) => {
                                return (
                                    <th key={title.label} className={"text-center"} colSpan={title.colSpan}>{title.label}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {body_arr.map((arr_data, index) => {
                            return (
                                <tr key={index}>
                                    {arr_data.map((data, index) => {
                                        return (
                                            <td key={data} className="text-center">{data}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

            </div>
        </div>
    )
}
