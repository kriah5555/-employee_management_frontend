import React, { useEffect, useState } from "react";
import CustomButton from "../atoms/CustomButton";

export default function EmployeeUpdate({ tab, edit, setEditStatus }) {

    // Dummy data of employee details
    // Personal data
    const tab1Left = [
        { label: 'First name', value: 'Employee' },
        { label: 'Last name', value: '01' },
        { label: 'Gender', value: 'Female' },
        { label: 'DOB', value: '04/02/1992' },
        { label: 'Place of birth', value: 'Merksem' },
        { label: 'Address', value: 'Rietschoorvelden 101' },
        { label: 'Postal code', value: '2101' },
        { label: 'City', value: 'Antwerpen' },
        { label: 'Country', value: 'België' },
        { label: 'Nationality', value: 'Belgium' }
    ]

    // Personal data
    const tab1Right = [
        { label: 'Mobile number', value: '1234567891' },
        { label: 'Email', value: 'example1@gmail.com' },
        { label: 'Social security number', value: '84071938582' },
        { label: 'Date of joining', value: '22-04-2022' },
        { label: 'Expiry date', value: '22-05-2023' },
        { label: 'Bank account number', value: 'BE01 1234 4567 7812' },
        { label: 'INSS number', value: '84071938582' },
    ]

    // Functions and salary data
    const tab2Data = [
        { label: 'Function name', value: 'Chef' },
        { label: 'Minimum salary', value: '€220.10' },
        { label: 'Salary to be paid', value: '€235.20' }
    ]

    // Employee type data
    const tab3Data = [
        { label: 'Employee type', value: 'Student' },
        { label: 'Contract type', value: 'Daily' }
    ]

    // Counters data
    const tab4Left = [
        { label: 'Public', value: '10 days' },
        { label: 'Optional', value: '05 days' }
    ]
    const tab4Right = [
        { label: 'Total', value: '100 days' },
        { label: 'Used', value: '40 days' },
        { label: 'Remaining', value: '60 days' }
    ]

    const [dataLeft, setDataLeft] = useState([]);
    const [dataRight, setDataRight] = useState([]);

    useEffect(() => {
        if (tab === 'tab1') {
            setDataLeft(tab1Left);
            setDataRight(tab1Right);
        } else if (tab === 'tab2') {
            setDataLeft(tab2Data);
            setDataRight([]);
        } else if (tab === 'tab3') {
            setDataLeft(tab3Data);
            setDataRight([]);
        } else if (tab === 'tab4') {
            setDataLeft(tab4Left);
            setDataRight(tab4Right);
        } else {
            setDataLeft([]);
            setDataRight([]);
        }
    }, [tab])


    return (
        <div className="row m-0">
            <div className="col-md-6 font-details">
                {tab === 'tab4' && <h4 className="pl-4 ml-1 pb-2 font-weight-bold">Holidays counter</h4>}
                {dataLeft.map((val, index) => {
                    return (
                        <div key={val.label} className={"font-weight-bold col-md-12 row m-0 mb-1"}>
                            <label className="col-md-3 mb-1 pr-0 text-secondary">{val.label}:</label>
                            {edit && <input type="text" className="col-md-9 mb-3 form-control font-weight-bold pt-0" name={val.label} value={val.value} />}
                            {!edit && <p className="mb-0 col-md-9">{val.value}</p>}
                        </div>
                    )
                })}
            </div>
            <div className="col-md-6 font-details">
                {tab === 'tab4' && <h4 className="pl-4 ml-1 pb-2 font-weight-bold">EXT counter</h4>}
                {dataRight.map((val, index) => {
                    return (
                        <div key={val.label} className={"font-weight-bold col-md-12 row m-0 mb-1"}>
                            <label className="col-md-4 mb-1 pr-0 text-secondary">{val.label}:</label>
                            {edit && <input type="text" className="col-md-8 mb-3 form-control font-weight-bold pt-0" name={val.label} value={val.value} />}
                            {!edit && <p className="mb-0 col-md-8">{val.value}</p>}
                        </div>
                    )
                })}
            </div>
            {edit && <div className="float-right col-md-12 text-right">
                <CustomButton buttonName={'Save'} ActionFunction={() => setEditStatus(false)}></CustomButton>
                <CustomButton buttonName={'Cancel'} ActionFunction={() => setEditStatus(false)}></CustomButton>
            </div>}

        </div>

    )
}
