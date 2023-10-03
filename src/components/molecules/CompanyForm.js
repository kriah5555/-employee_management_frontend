import React from "react";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import CustomPhoneInput from "../atoms/formFields/CustomPhoneInput";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
export default function CompanyForm({ view, data1, data2, data3, data4, title1, title2, title3, title4, SetValues, index, formattedData1, formattedData2 }) {


    return (
        <div className="mt-3">
            {title1 && <span className="col-md-12 pl-5 ml-3 form-subHeading pos-relative">{title1}</span>}
            {data1 && <div className="d-flex mb-4 px-5">
                <form className={"col-md-12 px-0 pb-4 mt-1 border-blue"}>
                    {/* Text input field and dropdown based on the data given */}
                    {data1.map((field, i) => {
                        if (field.type === "input_field") {
                            return (
                                <TextInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    CustomStyle="col-md-6 mt-4 float-left"
                                    required={field.required}
                                    value={formattedData1 !== undefined ? formattedData1[index][field.name] : ''}
                                    setValue={(e) => SetValues(index, field.name, e)}
                                    error={''}
                                ></TextInput>
                            )
                        } else if (field.type === 'phone_input') {
                            return (
                                <CustomPhoneInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    value={formattedData1 !== undefined ? formattedData1[index][field.name] : ''}
                                    setValue={(e) => SetValues(index, field.name, e)}
                                    CustomStyle={"col-md-6 mt-4 mb-1 float-left"}
                                    required={field.required}
                                />
                            )
                        } else if (field.type === 'dropdown') {
                            return (
                                <Dropdown
                                    key={field.name}
                                    options={field.options}
                                    selectedOptions={field.selectedOptions}
                                    onSelectFunction={(e) => SetValues(index, field.name, e, field.type)}
                                    CustomStyle="col-md-6 mt-2 float-left"
                                    title={field.title}
                                    required={field.required}
                                    isMulti={field.isMulti}
                                    error={''}
                                ></Dropdown>
                            )
                        }
                    })}
                </form>
            </div>}
            {title2 && <span className="col-md-12 pl-5 ml-3 form-subHeading">{title2}</span>}
            {data2 && <div className="d-flex mb-4 px-5">
                <form className="col-md-12 px-0 pb-4 mt-1 border-blue">
                    {/* Text input field */}
                    {data2.map((field, i) => {
                        if (field.type === "input_field") {
                            return (
                                <TextInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    CustomStyle={field.name === 'street_house_no' ? "col-md-12 mt-4 float-left" : "col-md-6 mt-4 float-left"}
                                    required={field.required}
                                    value={formattedData2 !== undefined ? formattedData2[index]['address'][field.name] : ''}
                                    setValue={(e) => SetValues(index, field.name, e, 'address')}
                                    error={''}
                                ></TextInput>
                            )
                        } else if (field.type === 'dropdown') {
                            return (
                                <Dropdown
                                    key={field.name}
                                    options={field.options}
                                    selectedOptions={field.selectedOptions[index]}
                                    onSelectFunction={(e) => SetValues(index, field.name, e, field.type)}
                                    CustomStyle="col-md-6 mt-2 float-left"
                                    title={field.title}
                                    required={field.required}
                                    isMulti={field.isMulti}
                                    error={''}
                                ></Dropdown>
                            )
                        }
                    })}
                </form>
            </div>}
            {title3 && <span className="col-md-12 pl-5 form-subHeading">{title3}</span>}
            {data3 && <div className="d-flex mb-3 px-5">
                <form className="col-md-12  px-0 pb-4 mt-1 border-blue">
                    {/* Text input field */}
                    {data3.map((field, index) => {
                        if (field.type === "input_field") {
                            return (
                                <TextInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    CustomStyle={"col-md-6 mt-4 float-left"}
                                    required={field.required}
                                    value={field.value}
                                    setValue={(e) => SetValues(e, field.name)}
                                    error={''}
                                ></TextInput>
                            )
                        } else if (field.type === 'dropdown') {
                            return (
                                <Dropdown
                                    key={field.name}
                                    options={field.options}
                                    selectedOptions={field.value}
                                    onSelectFunction={(e) => SetValues(e, field.name)}
                                    CustomStyle="col-md-6 mt-2 float-left"
                                    title={field.title}
                                    required={field.required}
                                    isMulti={field.isMulti}
                                    error={''}
                                ></Dropdown>
                            )
                        }
                    })}
                </form>
            </div>}
            {title4 && <span className="col-md-12 pl-5 form-subHeading">{title3}</span>}
            {data4 && <div className="d-flex mb-3 px-5">
                <form className={"col-md-12 px-0 pb-4 border-blue"}>
                    {data4.map((field, i) => {
                        if (field.type === "text") {
                            return (
                                <TextInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    CustomStyle={field.style}
                                    required={field.required}
                                    value={formattedData1 !== undefined ? formattedData1[field.name] : ''}
                                    setValue={(e) => SetValues(i, field.name, e)}
                                    error={''}
                                ></TextInput>
                            )
                        } else if (field.type === 'dropdown') {
                            return (
                                <Dropdown
                                    key={field.name}
                                    options={field.options}
                                    selectedOptions={field.selectedOptions}
                                    onSelectFunction={(e) => SetValues(i, field.name, e, field.type)}
                                    CustomStyle={field.style}
                                    title={field.title}
                                    required={field.required}
                                    isMulti={field.isMulti}
                                    isDisabled={field.isDisabled}
                                    error={''}
                                ></Dropdown>
                            )
                        } else if (field.type === 'checkbox') {
                            return (
                                <CustomCheckBox
                                    key={field.name}
                                    title={field.title}
                                    checkboxList={field.checkboxList}
                                    changeCheckbox={field.changeCheckbox}
                                    required={field.required}
                                    CustomStyle={field.style}
                                ></CustomCheckBox>
                            )
                        }
                    })}
                </form>
            </div>}
        </div>
    );

}