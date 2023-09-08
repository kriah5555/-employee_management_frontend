import React, { useEffect, useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";
import { LocationApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices"

export default function Addlocation({ locations, setLocations, customerArray, getLocationDropdownData, setLocationStatus, view, update_id }) {


    // const [locations, setLocations] = useState([{
    //     location_name: "",
    //     responsible_persons: [],
    //     address: {
    //         street_house_no: "",
    //         postal_code: "",
    //         city: "",
    //         country: "",
    //     }
    // }]);
    const [responsiblePerson, setResponsiblePerson] = useState([]);

    useEffect(() => {
        if (update_id !== '0') {
            let editApiUrl = LocationApiUrl + '/' + update_id + '/edit'
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = [];
                        response.push(result.data.details);
                        setLocations(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    const handleAddAnotherLocation = () => {
        if (locations.length <= 3) {
            setLocations([...locations, {
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
        }
    }

    const removeLocation = (i) => {
        const newLocations = [...locations];
        newLocations.splice(i, 1);
        setLocations(newLocations);
    }

    const setValues = (index, name, value, field) => {
        if (value === '' || value.length === 0) {
            setLocationStatus(false)
        } else {
            setLocationStatus(true)
        }

        const locationsArray = [...locations];

        if (field === 'address') {
            locationsArray[index][field][name] = value
        } else if (field !== 'dropdown') {
            locationsArray[index][name] = value
            if (name === 'location_name') { getLocationDropdownData(index, value) }
        } else {
            // const resp_person = [...responsiblePerson]
            // resp_person[index] = value
            setResponsiblePerson(value);
            let arr = []
            value.map((val, i) => {
                arr.push(val.value)
            })
            locations[index]['responsible_persons'] = arr
        }

        setLocations(locationsArray);
    }

    //add location fields
    const locationFieldsArray = [
        { title: "Location", name: "location_name", required: false, type: "input_field" },
        { title: "Responsible persons", options: customerArray, isMulti: true, selectedOptions: responsiblePerson, error: (responsiblePerson.length > 0) ? "" : 'Required', required: false, type: "dropdown" },
    ]

    //adress fields for company
    const locationAddressArray = [
        { title: "Street and house number", name: "street_house_no", required: false, type: "input_field" },
        { title: "Postal code", name: "postal_code", required: false, type: "input_field" },
        { title: "City", name: "city", required: false, type: "input_field" },
        { title: "Country", name: "country", required: false, type: "input_field" },
    ];


    return (
        <div className="">
            {locations.map((x, i) => {
                return (
                    <div key={x}>
                        {view !== 'location-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {locations.length > 1 && <p className="pos-absolute mx-5 text-danger text-decoration-underline" onClick={() => removeLocation(i)}>Remove</p>}
                        </div>}
                        <CompanyForm
                            index={i}
                            view="location"
                            title1={view !== 'location-single' ? 'Add location' : ''}
                            data1={locationFieldsArray}
                            formattedData1={locations}
                            title2={'Address'}
                            data2={locationAddressArray}
                            formattedData2={locations}
                            SetValues={setValues}
                        ></CompanyForm>
                        {view !== 'location-single' && <div className="d-flex mb-3 pos-relative justify-content-end">
                            {i == locations.length - 1 && <CustomButton buttonName={'Add another +'} ActionFunction={() => handleAddAnotherLocation()} CustomStyle="mr-5"></CustomButton>}
                        </div>}
                    </div>
                );
            })}
        </div>
    );
}