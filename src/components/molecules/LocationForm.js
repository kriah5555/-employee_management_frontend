import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";

export default function Addlocation() {

    const [locations, setLocations]=useState([{
        location:"",
        loc_street:"",
        loc_HouseNum:"",
        loc_postal_code:"",
        loc_postbox_num:"",
        loc_city:"",
        loc_country:"",
    }]);

    const handleAddAnotherLocation = () => {
        if (locations.length <= 3) {
            setLocations([...locations, { location: "", loc_street: "", loc_HouseNum: "", loc_postal_code: "", loc_postbox_num: "", loc_city: "", loc_country: "" }]);
        }
    }

    const removeLocation = (i) => {
        const newLocations = [...locations];
        newLocations.splice(i, 1);
        setLocations(newLocations);
    }

    const setValues = (index, name, value) => {
        const locationsArray = [...locations];
        locationsArray[index][name] = value
        setLocations(locationsArray);
    }

    //add location fields
    const locationFieldsArray = [
        { title: "Location", name: "location", placeholder: "Location", required: false, type: "input_field" },
        { title: "Street", name: "loc_street", placeholder: "Street", required: false, type: "input_field" },
        { title: "House Number", name: "loc_HouseNum", placeholder: "House number", required: false, type: "input_field" },
        { title: "Postbox Number", name: "loc_postbox_num", placeholder: "Postbox number", required: false, type: "input_field" },
        { title: "Postal code", name: "loc_postal_code", placeholder: "Postal code", required: false, type: "input_field" },
        { title: "City", name: "loc_city", placeholder: "City", required: false, type: "input_field" },
        { title: "Country", name: "loc_country", placeholder: "Country", required: false, type: "input_field" },
    ]

    //responsible person fields for company
    const companyResponsiblePersonFieldsArray = [
        { className: "col-md-6 mb-4", title: "Name", name: "name", required: false, value: '', setValue: '', placeholder: "Name", type: "input_field" },
        { className: "col-md-6 mb-4", title: "Email Id", name: "email", required: false, value: '', setValue: '', placeholder: "Email Id", type: "input_field" },
        { className: "col-md-6 mb-4", title: "Telephone number", name: "telephone", required: false, value: '', setValue: '', placeholder: "Telephone number", type: "input_field" },
    ];


    return (
        <div className="">
            {locations.map((x, i) => {
                return (
                    <div key={x}>
                        <div className="d-flex mb-3 pos-relative justify-content-end">
                            {locations.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline" onClick={() => removeLocation(i)}>Remove</p>}
                        </div>
                        <CompanyForm
                            index={i}
                            view="location"
                            title1='Add location'
                            data1={locationFieldsArray}
                            formattedData1={locations}
                            title3='Responsible person'
                            data3={companyResponsiblePersonFieldsArray}
                            formattedData2={locations}
                            SetValues={setValues}
                        ></CompanyForm>
                        <div className="d-flex mb-3 pos-relative justify-content-end">
                            {i == locations.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => handleAddAnotherLocation()} CustomStyle="mr-5"></CustomButton>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}