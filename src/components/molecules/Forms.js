import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../atoms/formFields/TextInput";
import TextArea from "../atoms/formFields/TextArea";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import CustomButton from "../atoms/CustomButton";


export default function Forms({ formTitle, redirectURL, changeCheckbox, checkboxList, field1, field2, field3, field4, SetValues, onSave, view }) {

    const navigate = useNavigate();

    // Forms for functions, employee type and sectors

    return (
        <div className="form-container my-5 border bg-white">
            <h2 id="text-indii-blue" className="col-md-12 p-5 ml-2">{formTitle}</h2>
            <div className="d-flex px-5">
                <form className="col-md-12 px-0">
                    {/* Text input field */}
                    <TextInput
                        title={field1.title}
                        name={field1.name}
                        placeholder={field1.placeholder}
                        CustomStyle={"col-md-6 float-left"}
                        required={field1.required}
                        value={field1.value}
                        setValue={(e) => SetValues(e, 1)}
                    ></TextInput>
                    
                    {view === 'functions' && 
                        <TextInput title={field2.title}
                            name={field2.name}
                            placeholder={field2.placeholder}
                            CustomStyle={"col-md-6 float-left"}
                            required={field2.required}
                            value={field2.value}
                            setValue={(e) => SetValues(e, 2)}
                        ></TextInput>
                    }

                    {/* Text area input field */}
                    <TextArea
                        title={field3.title}
                        name={field3.name}
                        required={field3.required}
                        CustomStyle={"col-md-12 mt-5 float-left"}
                        value={field3.value}
                        setValue={(e) => SetValues(e, 3)}
                    ></TextArea>

                    {/* Check boxes for status */}
                    <CustomCheckBox
                        title={field4.title}
                        checkboxList={checkboxList}
                        changeCheckbox={changeCheckbox}
                        required={field4.required}
                        CustomStyle={"col-md-12 my-5 float-left"}
                    ></CustomCheckBox>

                </form>
            </div>
            <div className="col-md-12 mt-5 text-right pr-5">
                <CustomButton buttonName={'Save'} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate(redirectURL)} CustomStyle="mr-3"></CustomButton>
            </div>
        </div>
    )
}
