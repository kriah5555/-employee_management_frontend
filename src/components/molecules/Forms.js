import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../atoms/formFields/TextInput";
import TextArea from "../atoms/formFields/TextArea";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import CustomButton from "../atoms/CustomButton";
import Dropdown from "../atoms/Dropdown";


export default function Forms({ formTitle, redirectURL, changeCheckbox, checkboxList, field1, field2, field3, field4, field5, field6, SetValues, onSave, view }) {

    const navigate = useNavigate();

    // Forms for functions, employee type and sectors

    return (
        <div className="form-container my-5 border bg-white">
            <h2 id="text-indii-blue" className="col-md-12 p-5 mb-0 ml-2">{formTitle}</h2>
            <div className="d-flex px-5">
                <form className="col-md-12 px-0">
                    {/* Text input field */}
                    <TextInput
                        title={field1.title}
                        name={field1.name}
                        placeholder={field1.placeholder}
                        CustomStyle={"col-md-6 float-left" + (view === 'group_function' ? ' mt-4' : '')}
                        required={field1.required}
                        value={field1.value}
                        setValue={(e) => SetValues(e, 1)}
                    ></TextInput>

                    {view !== 'employee_types' && view !== 'group_function' &&
                        <TextInput title={field2.title}
                            name={field2.name}
                            placeholder={field2.placeholder}
                            CustomStyle={"col-md-6 float-left"}
                            required={field2.required}
                            value={field2.value}
                            setValue={(e) => SetValues(e, 2)}
                        ></TextInput>
                    }
                    {view !== 'employee_types' && <Dropdown
                        options={field3.options}
                        selectedOptions={field3.value}
                        onSelectFunction={(e) => SetValues(e, 3)}
                        CustomStyle="col-md-6 mt-4 float-left"
                        title={field3.title}
                        required={field3.required}
                        isMulti={field3.isMulti}
                    ></Dropdown>}

                    {view !== 'employee_types' && view !== 'functions' && <Dropdown
                        options={field4.options}
                        selectedOptions={field4.value}
                        onSelectFunction={(e) => SetValues(e, 4)}
                        CustomStyle="col-md-6 mt-4 float-left"
                        title={field4.title}
                        required={field4.required}
                        isMulti={field4.isMulti}
                    ></Dropdown>}

                    {/* Text area input field */}
                    <TextArea
                        title={field5.title}
                        name={field5.name}
                        required={field5.required}
                        CustomStyle={"col-md-12 mt-4 float-left"}
                        value={field5.value}
                        setValue={(e) => SetValues(e, 5)}
                    ></TextArea>

                    {/* Check boxes for status */}
                    <CustomCheckBox
                        title={field6.title}
                        checkboxList={checkboxList}
                        changeCheckbox={changeCheckbox}
                        required={field6.required}
                        CustomStyle={"col-md-12 my-4 float-left"}
                    ></CustomCheckBox>
                </form>
            </div>
            <div className="col-md-12 mt-4 text-right pr-5">
                <CustomButton buttonName={'Save'} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate(redirectURL)} CustomStyle="mr-3"></CustomButton>
            </div>
        </div>
    )
}
