import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import TextInput from "../atoms/formFields/TextInput";
import CustomPhoneInput from "../atoms/formFields/CustomPhoneInput";
export default function ProfileData({ title, edit, setEditStatus, type }) {

    //set Profile data from api call
    const [firstName, setFirstName] = useState("Employee");
    const [lastName, setLastName] = useState("01");
    const [mobileNumber, setMobileNumber] = useState("32123456789");
    const [gender, setGender] = useState("male");
    const [email, setEmail] = useState("example1@gmail.com");
    const [DOB, setDOB] = useState("04/02/1992");
    const [placeOfBirth, setPlaceofBirth] = useState("Merksem");
    const [nationality, setNationality] = useState("Belgium");
    const [SSCNumber, setSSCNumber] = useState("84071938582");

    const [street, setStreet] = useState("8th");
    const [houseNumber, setHouseNumber] = useState("Rietschoorvelden 101");
    const [boxNumber, setBoxNumber] = useState("Rietschoorvelden 101");
    const [postalCode, setPostalCode] = useState("2101");
    const [city, setCity] = useState("Antwerpen");
    const [country, setCountry] = useState("België");

    //data to set fields if edit is enabled and edited
    const [updatedFirstname, setUpdatedFirstName] = useState("Employee");
    const [updatedLastName, setUpdatedLastName] = useState("01");
    const [updatedMobileNumber, setUpdatedMobileNumber] = useState("32123456789");
    const [updatedGender, setUpdatedGender] = useState("male");
    const [updatedEmail, setUpdatedEmail] = useState("example1@gmail.com");
    const [updatedDOB, setUpdatedDOB] = useState("04/02/1992");
    const [updatedPlaceOfBirth, setUpdatedPlaceofBirth] = useState("Merksem");
    const [updatedNationality, setUpdatedNationality] = useState("Belgium");
    const [updatedSSCNumber, setUpdatedSSCNumber] = useState("84071938582");

    const [updatedStreet, setUpdatedStreet] = useState("8th");
    const [updatedHouseNumber, setUpdatedHouseNumber] = useState("Rietschoorvelden 101");
    const [updatedBoxNumber, setUpdatedBoxNumber] = useState("Rietschoorvelden 101");
    const [updatedpostalCode, setUpdatedPostalCode] = useState("2101");
    const [updatedCity, setUpdatedCity] = useState("Antwerpen");
    const [updatedCountry, setUpdatedCountry] = useState("België");



    const profile = [
        { label: 'First name', value: firstName, setValue: setFirstName },
        { label: 'Last name', value: lastName, setValue: setLastName },
        { label: 'Email', value: email, setValue: setEmail },
        { label: 'Mobile number', value: mobileNumber, setValue: setMobileNumber },
        { label: 'Gender', value: gender, setValue: setGender },
        { label: 'DOB', value: DOB, setValue: setDOB },
        { label: 'Place of birth', value: placeOfBirth, setValue: setPlaceofBirth },
        { label: 'Nationality', value: city, setValue: setNationality },
        { label: 'Social security number', value: SSCNumber, setValue: setSSCNumber },
    ]

    // updatedProfileData
    const updatedProfile = [
        { label: 'First name', value: updatedFirstname, setValue: setUpdatedFirstName },
        { label: 'Last name', value: updatedLastName, setValue: setUpdatedLastName },
        { label: 'Email', value: updatedEmail, setValue: setUpdatedEmail },
        { label: 'Mobile number', value: updatedMobileNumber, setValue: setUpdatedMobileNumber, type: 'phoneInput' },
        { label: 'Gender', value: updatedGender, setValue: setUpdatedGender },
        { label: 'DOB', value: updatedDOB, setValue: setUpdatedDOB },
        { label: 'Place of birth', value: updatedPlaceOfBirth, setValue: setUpdatedPlaceofBirth },
        { label: 'Nationality', value: updatedNationality, setValue: setUpdatedNationality },
        { label: 'Social security number', value: SSCNumber, setValue: setUpdatedSSCNumber, disabled: true },
    ]

    const address = [
        { label: 'Street', value: street, setValue: setStreet },
        { label: 'House Number', value: houseNumber, setValue: setHouseNumber },
        { label: 'Box Number', value: boxNumber, setValue: setBoxNumber },
        { label: 'Postal code', value: postalCode, setValue: setPostalCode },
        { label: 'City', value: city, setValue: setCity },
        { label: 'Country', value: country, setValue: setCountry },
    ]
    //updated Address 
    const updatedAddress = [
        { label: 'Street', value: updatedStreet, setValue: setUpdatedStreet },
        { label: 'House Number', value: updatedHouseNumber, setValue: setUpdatedHouseNumber },
        { label: 'Box Number', value: updatedBoxNumber, setValue: setUpdatedBoxNumber },
        { label: 'Postal code', value: updatedpostalCode, setValue: setUpdatedPostalCode },
        { label: 'City', value: updatedCity, setValue: setUpdatedCity },
        { label: 'Country', value: updatedCountry, setValue: setUpdatedCountry },
    ]

    let fieldData = [];
    if (type == "address") {
        edit ? fieldData = updatedAddress : fieldData = address;
    } else {
        edit ? fieldData = updatedProfile : fieldData = profile;
    }

    const resetProfileData = () => {
        setUpdatedFirstName(firstName);
        setUpdatedLastName(lastName);
        setUpdatedMobileNumber(mobileNumber);
        setUpdatedGender(gender);
        setUpdatedEmail(email);
        setUpdatedDOB(DOB);
        setUpdatedPlaceofBirth(placeOfBirth);
        setUpdatedNationality(nationality);
    }

    const resetAddress = () => {
        setUpdatedStreet(street);
        setUpdatedHouseNumber(houseNumber);
        setUpdatedBoxNumber(boxNumber);
        setUpdatedPostalCode(postalCode);
        setUpdatedCity(city);
        setUpdatedCountry(country);
    }

    return (<>
        <h2 className="col-md-10 p-0 mt-4 mb-3 ml-5 " id="text-indii-blue">{title}</h2>
        <div className="col-md-12 font-details pt-2">
            {(fieldData).map((val, index) => {
                return (
                    <div key={val.label} className={"font-weight-bold col-md-12 row m-0 mb-1"}>
                        <label className="col-md-3 mb-1 pr-0 text-secondary">{val.label}:</label>
                        {(edit && val.type === 'phoneInput') && (<CustomPhoneInput value={val.value} setValue={val.setValue} CustomStyle={"col-md-9 mb-3 font-weight-bold"} />)}
                        {(edit && val.type !== 'phoneInput') && (<TextInput name={val.label} CustomStyle={"col-md-9 mb-3 font-weight-bold"} value={val.value} setValue={val.setValue} disabled={val.disabled} />)}
                        {!edit && <p className="mb-0 col-md-9 mb-3">{val.value}</p>}
                    </div>
                )
            })}
        </div>
        {edit && <div className="float-right col-md-12 text-right mr-3 mb-1">
            <CustomButton buttonName={'Save'} ActionFunction={() => setEditStatus(false)}></CustomButton>
            <CustomButton buttonName={'Cancel'} ActionFunction={() => { setEditStatus(false); resetProfileData(); resetAddress() }}></CustomButton>
        </div>}
    </>
    );
}

