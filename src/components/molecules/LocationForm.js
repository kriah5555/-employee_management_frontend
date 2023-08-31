import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";

export default function Addlocation() {

    const [locations, setLocations] = useState([{
        location_name: "",
        responsible_persons: [],
        address: {
            street: "",
            house_no: "",
            postal_code: "",
            city: "",
            country: "",
        }
    }]);
    const [responsiblePerson, setResponsiblePerson] = useState([]);

    const handleAddAnotherLocation = () => {
        if (locations.length <= 3) {
            setLocations([...locations, { location: "", street: "", house_no: "", postal_code: "", loc_postbox_num: "", city: "", country: "" }]);
        }
    }

    const removeLocation = (i) => {
        const newLocations = [...locations];
        newLocations.splice(i, 1);
        setLocations(newLocations);
    }

    const setValues = (index, name, value, field) => {
        const locationsArray = [...locations];

        if (index === 'address') {
            locationsArray[0][index][name] = value
        } else {
            if (field !== 'dropdown') {
                locationsArray[index][name] = value
            } else {
                const resp_person = [...responsiblePerson]
                resp_person.push(value)
                setResponsiblePerson(resp_person);
                let arr = []
                value.map((val, i) => {
                    arr.push(val.value)
                })
                locations[0]['responsible_persons'] = arr
            }
        }
        setLocations(locationsArray);
    }

    const responsible_persons = [
        {value: 'admin' , label: 'admin' },
        {value: 'user' , label: 'user' },
        {value: 'person' , label: 'person' },
    ]


    //add location fields
    const locationFieldsArray = [
        { title: "Location", name: "location_name", required: false, type: "input_field" },
        { title: "Responsible persons", options: responsible_persons, isMulti: true, selectedOptions: responsiblePerson, error: (responsiblePerson.length > 0) ? "" : 'Required', required: true, type: "dropdown" },
        // { title: "Street", name: "street", placeholder: "Street", required: false, type: "input_field" },
        // { title: "House Number", name: "house_no", placeholder: "House number", required: false, type: "input_field" },
        // { title: "Postbox Number", name: "loc_postbox_num", placeholder: "Postbox number", required: false, type: "input_field" },
        // { title: "Postal code", name: "postal_code", placeholder: "Postal code", required: false, type: "input_field" },
        // { title: "City", name: "city", placeholder: "City", required: false, type: "input_field" },
        // { title: "Country", name: "country", placeholder: "Country", required: false, type: "input_field" },
    ]

    //adress fields for company
    const locationAddressArray = [
        { title: "Street", name: "street", required: false, type: "input_field" },
        { title: "House Number", name: "house_no", required: false, type: "input_field" },
        { title: "Postal code", name: "postal_code", required: false, type: "input_field" },
        { title: "City", name: "city", required: false, type: "input_field" },
        { title: "Country", name: "country", required: true, false: "input_field" },
    ];

    //responsible person fields for company
    // const companyResponsiblePersonFieldsArray = [
    //     { className: "col-md-6 mb-4", title: "Name", name: "name", required: false, value: '', setValue: '', placeholder: "Name", type: "input_field" },
    //     { className: "col-md-6 mb-4", title: "Email Id", name: "email", required: false, value: '', setValue: '', placeholder: "Email Id", type: "input_field" },
    //     { className: "col-md-6 mb-4", title: "Telephone number", name: "telephone", required: false, value: '', setValue: '', placeholder: "Telephone number", type: "input_field" },
    // ];


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
                            title2={'Address'}
                            data2={locationAddressArray}
                            formattedData2={locations[0].address}
                            // title3='Responsible person'
                            // data3={companyResponsiblePersonFieldsArray}
                            // formattedData2={locations}
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