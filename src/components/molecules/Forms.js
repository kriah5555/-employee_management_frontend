import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../atoms/formFields/TextInput";
import TextArea from "../atoms/formFields/TextArea";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import CustomButton from "../atoms/CustomButton";
import Dropdown from "../atoms/Dropdown";


export default function Forms({ formTitle, redirectURL, changeCheckbox, checkboxList, field1, field2, field3, field4, field5, field6, field7, error1, error2, error3, error4, error7, SetValues, onSave, view }) {

    const navigate = useNavigate();
    const params = useParams();

    // Forms for functions, employee type and sectors
    return (
        <div className={view !== 'sectors' ? "form-container my-5 border bg-white" : "pt-5 pb-5"}>
            {view !== 'sectors' && <h2 id="text-indii-blue" className="col-md-12 p-5 mb-0 ml-2">{formTitle}</h2>}
            <div className="d-flex px-5">
                <form className="col-md-12 px-0">
                    {/* Text input field */}
                    <TextInput
                        title={field1.title}
                        name={field1.name}
                        placeholder={field1.placeholder}
                        CustomStyle={"col-md-6 float-left" + ((view === 'group_function' || view === 'employee_types' || view === 'contract_type') ? ' mt-4' : '')}
                        required={field1.required}
                        value={field1.value}
                        setValue={(e) => SetValues(e, 1)}
                        error={error1}
                        styleMargin={error1 ? '' : (view === 'group_function' ? 'my-2' : 'mt-2 mb-1')}
                    ></TextInput>

                    {view !== 'employee_types' && view !== 'group_function' && view !== 'contract_type' &&
                        <TextInput title={field2.title}
                            name={field2.name}
                            placeholder={field2.placeholder}
                            CustomStyle={"col-md-6 float-left"}
                            required={field2.required}
                            value={field2.value}
                            setValue={(e) => SetValues(e, 2)}
                            error={error2}
                            styleMargin={error2 ? 'mt-2 mb-1' : 'my-2'}
                        ></TextInput>
                    }
                    {<Dropdown
                        options={field3.options}
                        selectedOptions={field3.value}
                        onSelectFunction={(e) => SetValues(e, 3)}
                        CustomStyle="col-md-6 mt-4 float-left"
                        title={field3.title}
                        required={field3.required}
                        isMulti={field3.isMulti}
                        error={error3}
                        styleMargin={error2 ? '' : 'my-2'}
                    ></Dropdown>}

                    {view !== 'functions' && view !== 'contract_type' && <Dropdown
                        options={field4.options}
                        selectedOptions={field4.value}
                        onSelectFunction={(e) => SetValues(e, 4)}
                        CustomStyle="col-md-6 mt-4 float-left"
                        title={field4.title}
                        required={field4.required}
                        isMulti={field4.isMulti}
                        error={error4}
                    ></Dropdown>}

                    {view === 'employee_types' && <Dropdown
                        options={field7.options}
                        selectedOptions={field7.value}
                        onSelectFunction={(e) => SetValues(e, 7)}
                        CustomStyle="col-md-6 mt-4 float-left"
                        title={field7.title}
                        required={field7.required}
                        isMulti={field7.isMulti}
                        error={error7}
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
            {view !== 'sectors' && <div className={"col-md-12 mt-4 text-right pr-5" + (view === 'sectors' ? 'pb-5' : '')}>
                {((view === 'sectors' && params.id !== undefined) || view !== 'sectors') && <CustomButton buttonName={'Save'} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>}
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate(redirectURL)} CustomStyle="mr-3"></CustomButton>
            </div>}
        </div>
    )
}
