import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { t } from "../../translations/Translation";
import '../../static/common.css';

export default function PlanChart({refreshStatus}){

    const Plans = [
        {
            "start_time": "11:00",
            "end_time": "22:00",
            "midnight_end_time": "22:00",
            "workstation_name": "Zaal",
            "leave": false,
            "holiday_code": ""
        }
    ]

    const [data, setData] = useState([]);
    const [colour, setColors] = useState([""]);

    useEffect(() => {
        let day_data = [];
        if (data.length === 0){
        day_data.push(
            [
                { type: "string", id: "President" },
                { type: "string", id: "Name" },
                { role: "tooltip", type: "string", p: {html: true}},
                { type: "date", id: "Start" },
                { type: "date", id: "End" }
            ],
            [
                "Planning time",
                "",
                "",
                new Date(0, 0, 0, 0, 0, 0),
                new Date(0, 0, 0, 0, 0, 0)
            ]
        )

        Plans.map((plan, index) => {
            colour.push(plan['leave'] ? "red" : '#169c02')
            day_data.push([
                        "Planning time",
                        plan['workstation_name'],
                        '<ul class="list-group"><li class="list-group-item">'+t('WORKSTATION')+':&nbsp'+ plan['workstation_name'] + '</li><li class="list-group-item">'+t('PLANNING_TIME')+':&nbsp'+ plan['start_time']+"-"+plan['end_time'] + '</li></ul>',
                        new Date(0, 0, 0, plan['start_time'].split(':')[0], plan['start_time'].split(':')[1], 0),
                        new Date(0, 0, 0, plan['midnight_end_time'].split(':')[0], plan['midnight_end_time'].split(':')[1], 0),
                    ])
        })
           
        day_data.push([
                "Planning time",
                "",
                "",
                new Date(0, 0, 0, 23, 59, 59),
                new Date(0, 0, 0, 23, 59, 59)
            ])
        }
        setData(day_data)
    }, [refreshStatus])

    return(
      
        <Chart
            width={'100%'}
            height={'43px'}
            className="planning-timeline"
            chartType="Timeline"
            loader={<div>{t('LOAD_CHART')}</div>}
            data={data}
            options={{
                chartArea: { width: '100%', height: '100px' },
                legend: { position: "none" },
                alternatingRowStyle: false,
                timeline: {showRowLabels:false},
                avoidOverlappingGridLines:false,
                colors: colour,
                hAxis: {
                    minValue: 0,
                    ticks: [0, 1]
                },

            }}
        />            
    )
}
