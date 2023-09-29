import React, { useState, useEffect, useRef } from "react";
import TimePicker from "../../utilities/TimePicker";
import { t } from "../../translations/Translation.js";
import { GET_CONSTANTS } from "../../applicationConstants/AppConstants";
import RequiredIcon from "../../static/icons/exclamation-mark1.png"


export default function TimeInput({ setTime, index, type, value, title, customStyle, required, error, styleMargin }) {
    const [startPicker, setStartPicker] = useState(false);
    let timePickerRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!timePickerRef.current.contains(e.target)) {

                setStartPicker(false);
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })
    return (
        <div className={"col-3 title-position font-weight-bold " + customStyle} >
            {/* {title && <label htmlFor="start_time" onClick={() => hideTimePopup()}  className="filter-title row m-0 mb-1">
                {t(GET_CONSTANTS.START_TIME)}
                <p className="text-danger mb-0 font-wieght-bold">{title}&nbsp;*</p>
            </label>} */}
            <div className={"d-flex justify-content-between " + (error ? '' : styleMargin)} >
                <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>}</label>
                {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {error}
                </p>}
            </div>
            <div ref={timePickerRef}>
                {startPicker && (
                    <TimePicker
                        hour={value ? value.split(':')[0] : '00'}
                        minute={value ? value.split(':')[1] : '00'}
                        index={index}
                        type={type}
                        setHourMin={setTime}
                    />
                )}
            </div>
            <input
                type=""
                name="start_time"
                onClick={() => setStartPicker(!startPicker)}
                value={value}
                onChange={(e) => { setTime(e.target.value, type, index); }}
                className="form-control m-0"
            />
        </div>

    );
}
