import React from "react";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";

export default function CompanyForm({ view, data1, data2, data3, title1, title2, title3, SetValues, index, formattedData}) {

    return (
        <div className="mt-3">
            {title1 && <span className="col-md-12 pl-5 form-subHeading pos-relative">{title1}</span>}
            {data1 && <div className="d-flex mb-4 px-5">
                <form className={"col-md-12 px-0 pb-4 mt-1 border"}>
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
                                    value={formattedData !== undefined ? formattedData[index][field.name] : ''}
                                    setValue={(e) => SetValues(index, field.name, e)}
                                    error={''}
                                ></TextInput>
                            )
                        } else if (field.type === 'dropdown') {
                            return (
                                <Dropdown
                                    key={field.name}
                                    options={field.options}
                                    selectedOptions={field.value}
                                    onSelectFunction={(e) => SetValues(index, field.name, e)}
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
            {title2 &&<span className="col-md-12 pl-5 form-subHeading">{title2}</span>}
            {data2 && <div className="d-flex mb-4 px-5">
                <form className="col-md-12 px-0 pb-4 mt-1 border">
                    {/* Text input field */}
                    {data2.map((field, index) => {
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
            {title3 && <span className="col-md-12 pl-5 form-subHeading">{title3}</span>}
            {data3 && <div className="d-flex mb-3 px-5">
                <form className="col-md-12  px-0 pb-4 mt-1 border">
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
        </div>
    );

}