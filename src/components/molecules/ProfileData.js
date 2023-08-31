import React from "react";
import CustomButton from "../atoms/CustomButton";

export default function ProfileData({ title, edit, setEditStatus, type }) {
    const profile = [
        { label: 'First name', value: 'Employee' },
        { label: 'Last name', value: '01' },
        { label: 'Mobile number', value: '1234567891' },
        { label: 'Gender', value: 'Female' },
        { label: 'Email', value: 'example1@gmail.com' },
        { label: 'DOB', value: '04/02/1992' },
        { label: 'Place of birth', value: 'Merksem' },
        { label: 'Address', value: 'Rietschoorvelden 101' },
        { label: 'Postal code', value: '2101' },
        { label: 'City', value: 'Antwerpen' },
        { label: 'Country', value: 'België' },
        { label: 'Nationality', value: 'Belgium' },
        { label: 'Social security number', value: '84071938582' },
    ]
    const address = [
        { label: 'Street', value: '8th' },
        { label: 'House Number', value: 'Rietschoorvelden 101' },
        { label: 'Box Number', value: 'Rietschoorvelden 101' },
        { label: 'Postal code', value: '2101' },
        { label: 'City', value: 'Antwerpen' },
        { label: 'Country', value: 'België' },
    ]

    let fieldData = [];
    if (type == "address") {
        fieldData = address;
    } else {
        fieldData = profile;
    }

    return (<>
        <h2 className="col-md-10 p-0 mt-5 mb-5 ml-5 " id="text-indii-blue">{title}</h2>
        <div className="col-md-12 font-details pt-4">
            {fieldData.map((val, index) => {
                return (
                    <div key={val.label} className={"font-weight-bold col-md-12 row m-0 mb-1"}>
                        <label className="col-md-3 mb-1 pr-0 text-secondary">{val.label}:</label>
                        {edit && <input type="text" className="col-md-9 mb-3 form-control font-weight-bold" name={val.label} value={val.value} />}
                        {!edit && <p className="mb-0 col-md-9 mb-4">{val.value}</p>}
                    </div>
                )
            })}
        </div>
        {edit && <div className="float-right col-md-12 text-right mt-3 mr-3">
            <CustomButton buttonName={'Save'} ActionFunction={() => setEditStatus(false)}></CustomButton>
            <CustomButton buttonName={'Cancel'} ActionFunction={() => setEditStatus(false)}></CustomButton>
        </div>}
    </>
    );
}

