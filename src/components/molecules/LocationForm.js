import React, { useEffect, useState } from "react";
import CustomButton from "../atoms/CustomButton";
import CompanyForm from "./CompanyForm";
import { LocationApiUrl, ResponsiblePersonApiUrl } from "../../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../../services/AxiosServices";
import { t } from "../../translations/Translation";

export default function Addlocation({ locations, setLocations, customerArray, getLocationDropdownData, setLocationStatus, view, update_id, responsiblePerson, setResponsiblePerson, address }) {


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

    const [addressCheckbox, setAddressCheckbox] = useState([]);
    const [customerUpdateArr, setUpdateCustomerArr] = useState([]);

    useEffect(() => {
        AXIOS.service(ResponsiblePersonApiUrl, 'GET')
            .then((result) => {
                if (result?.success) {
                let options = []
                    result.data.map((val, i) => {
                        let option = {value: val.id, label: val.full_name}
                        options.push(option);
                    })
                    setUpdateCustomerArr(options);
                }
            })
            .catch((error) => {
                console.log(error);
            })

        if (update_id !== '0' && update_id !== undefined) {
            let editApiUrl = LocationApiUrl + '/' + update_id
            // Api call to get detail data
            AXIOS.service(editApiUrl, 'GET')
                .then((result) => {
                    if (result?.success) {
                        let response = [];
                        response['location_name'] = result.data.location_name
                        response['responsiblePerson'] = result.data.responsible_person_details !== null ? [{ value: result.data.responsible_person_details.employee_profile_id, label: result.data.responsible_person_details.full_name}] : []
                        setResponsiblePerson([result.data.responsible_person_details !== null ? { value: result.data.responsible_person_details.employee_profile_id, label: result.data.responsible_person_details.full_name} : ''])
                        response.push(result.data);
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
                status: 1,
                address: {
                    street_house_no: "",
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
        if (value === '' || value.length === 0 || value === undefined) {
            setLocationStatus(false)
        } else {
            setLocationStatus(true)
        }

        const locationsArray = [...locations];

        if (field === 'address') {
            locationsArray[index][field][name] = value
        } else if (field === 'checkbox') {
            let copydata = [...addressCheckbox]
            if (copydata[index]) {
                copydata[index] = false
                let add = {
                    street_house_no: "",
                    postal_code: "",
                    city: "",
                    country: "",
                }
                locationsArray[index]['address'] = add
            } else {
                copydata[index] = true
                locationsArray[index]['address'] = address
            }
            setAddressCheckbox(copydata)
        } else if (field !== 'dropdown') {
            locationsArray[index][name] = value
            if (name === 'location_name') { getLocationDropdownData(index, value) }
        } else {
            const resp_person = [...responsiblePerson]
            resp_person[index] = value
            setResponsiblePerson(resp_person);
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
        { title: t("LOCATION"), name: "location_name", required: false, type: "input_field" },
        { title: t("RESPONSIBLE_PERSONS"), options: view !== 'location-single' ? customerArray : customerUpdateArr, isMulti: true, selectedOptions: responsiblePerson, error: (responsiblePerson.length > 0) ? "" : 'Required', required: false, type: "dropdown" },
    ]

    //checkbox list
    const statusCheckBoxList = [
        {
            key: "copy",
            name: "Same as company address",
            // checked: addressCheckbox
        }
    ];


    //adress fields for company
    const locationAddressArray = [
        { title: "", checkboxList: statusCheckBoxList, changeCheckbox: setValues, type: "checkbox" },
        { title: t("SECTOR_HOUSE_NUMBER"), name: "street_house_no", required: false, type: "input_field" },
        { title: t("POSTAL_CODE"), name: "postal_code", required: false, type: "input_field" },
        { title: t("CITY"), name: "city", required: false, type: "input_field" },
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
                            formattedData2={locations[i]}
                            SetValues={setValues}
                            addressValues={addressCheckbox}
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