import React, { useState } from 'react';
import '../static/common.css';

export default function TimePicker(props) {

    const [selectedHour, setSelectedHour] = useState(0);
    return (
        <table className="time-picker ui-timepicker-table ui-widget-content ui-corner-all">
            <tbody>
                <tr>
                    <td className="ui-timepicker-hours">
                        <div className="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">Hour</div>
                        <table className="ui-timepicker">
                            <tbody>
                                {[0, 1, 2, 3].map((hourRow) => {
                                    return (
                                        <tr key={hourRow}>
                                            {[0, 1, 2, 3, 4, 5].map((hourCol, i) => {
                                                const hour = hourRow * 6 + hourCol;
                                                const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
                                                return (
                                                    <td onClick={() => { props.setHourMin(formattedHour + ':00', props.type, props.index, 1); setSelectedHour(formattedHour); }}>
                                                        <a className={props.hour !== formattedHour ? "ui-state-default" : "ui-state-active"}>{formattedHour}</a>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </td>
                    <td className="ui-timepicker-minutes">
                        <div className="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">Minute</div>
                        <table className="ui-timepicker">
                            <tbody>
                                {[0, 15, 30, 45].map((minute) => {
                                    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
                                    const value = `${selectedHour}:${formattedMinute}`;
                                    return (
                                        <tr>
                                            <td key={minute} onClick={() => props.setHourMin(value, props.type, props.index, 2)}>
                                                <a className={props.minute !== formattedMinute ? "ui-state-default" : "ui-state-active"}>{formattedMinute}</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
