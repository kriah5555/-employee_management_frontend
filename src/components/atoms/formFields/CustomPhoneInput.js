import React, { useCallback, useState } from "react";
import RequiredIcon from "../../../static/icons/exclamation-mark1.png"
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css';
// import "react-phone-input-2/lib/style.css";
// import 'react-phone-input-2/lib/bootstrap.css';

export default function CustomPhoneInput({ title, name, placeholder, required, CustomStyle, value, setValue, error, styleMargin, disabled, countryArray, enableSearch }) {

  return (
    <div className={"font-weight-bold " + CustomStyle}>
      <div className={"d-flex justify-content-between " + (error ? '' : styleMargin)} >
        <label className="row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
        {error && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
          <img className="box mr-1 mb-1" src={RequiredIcon}></img>
          {error}
        </p>}
      </div>
      <div className="input-group">
        <PhoneInput
          // regions={["america", "europe", "asia", "oceania", "africa",'north-america', 'south-america', 'central-america', 'carribean', 'eu-union', 'ex-ussr', 'ex-yugos', 'baltic', 'middle-east', 'north-africa']}
          onlyCountries={countryArray}
          enableSearch={enableSearch}
          inputStyle={{ height: '100%', width: '100%', fontSize: '1rem' }}
          containerStyle={{ width: '100%', height: '3em' }}
          country={"be"}
          value={value}//it should be string
          onChange={e => setValue(e)}
          placeholder={placeholder ? placeholder : "+32 (123) 12 34 56"}
          searchPlaceholder="Search"
          searchNotFound="No entries to show"
          disabled={disabled}
          disableSearchIcon={true}
          inputProps={
            {
              name: { name }
            }
          }
        />
      </div>
    </div>
  );
}
