import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import TextArea from "../atoms/formFields/TextArea";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import CustomButton from "../atoms/CustomButton";
import BackIcon from "../../static/icons/BackIcon.png"
import ColorInput from "../atoms/formFields/ColorInput";
import Switch from "../atoms/Switch";
import DateInput from "../atoms/formFields/DateInput";
import CustomPhoneInput from "../atoms/formFields/CustomPhoneInput";
import Editor from "../atoms/Editor";
import FileInput from "../atoms/FileInput";

export default function FormsNew({ view, data, formTitle, SetValues, formattedData, redirectURL, OnSave }) {

    const navigate = useNavigate();
    const params = useParams();

    return (
        <div className={view !== 'sectors' && view !== 'holiday codes' && view !== 'email template' && view !== 'contracts template' && formTitle ? "form-container my-3 border bg-white" : (view === 'filters' ? "pb-3" : "pt-2 pb-3")}>
            {view !== 'sectors' && view !== 'holiday codes' && view !== 'email template' && view !== 'contracts template' && formTitle && <h2 id="text-indii-blue" className="col-md-12 px-5 pt-4 mb-0 ml-2"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate(redirectURL)} src={BackIcon}></img>{formTitle}</h2>}
            {data && <div className={view === 'filters' ? "d-flex px-2" : "d-flex px-5"}>
                <form className={view === 'filters' ? "col-md-12 px-0 border-blue" : "col-md-12 px-0 pb-4 border-blue"}>
                    {/* Text input field and dropdown based on the data given */}
                    {data.map((field, i) => {
                        if (field.type === "text") {
                            return (
                                <TextInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    CustomStyle={field.style}
                                    required={field.required}
                                    value={formattedData !== undefined ? formattedData[field.name] : ''}
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
                        } else if (field.type === 'color') {
                            return (
                                <ColorInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    CustomStyle={field.style}
                                    required={field.required}
                                    value={formattedData !== undefined ? (formattedData[field.name] ? formattedData[field.name] : '#61bfb5') : '#61bfb5'}
                                    setValue={(e) => SetValues(i, field.name, e)}
                                    error={''}
                                ></ColorInput>
                            )
                        } else if (field.type === 'switch') {
                            return (
                                <Switch
                                    key={field.name}
                                    label={field.title}
                                    id={field.name}
                                    styleClass={field.style}
                                    lableClick={false}
                                    required={field.required}
                                    onChange={(e) => SetValues(i, field.name, e.target.checked)}
                                    defaultChecked={formattedData !== undefined ? formattedData[field.name] : false}
                                    checked={formattedData !== undefined ? formattedData[field.name] : false}
                                />
                            )
                        } else if (field.type === 'text-area') {
                            return (
                                <>
                                    <TextArea
                                        key={field.name}
                                        title={field.title}
                                        name={field.name}
                                        required={field.required}
                                        CustomStyle={field.style}
                                        value={formattedData !== undefined ? formattedData[field.name] : ''}
                                        setValue={(e) => SetValues(i, field.name, e)}
                                    ></TextArea>
                                    {view === 'employee_types' && <h4 id="text-indii-blue" className="col-md-12 float-left pb-3 mb-0"><u>Configurations:</u></h4>}
                                </>
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
                        } else if (field.type === 'date') {
                            return (
                                <DateInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    CustomStyle={field.style}
                                    required={field.required}
                                    value={formattedData !== undefined ? formattedData[field.name] : ''}
                                    setValue={(e) => SetValues(i, field.name, e)}
                                ></DateInput>
                            )
                        } else if (field.type === 'phone_input') {
                            return (
                                <CustomPhoneInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    value={formattedData !== undefined ? formattedData[field.name] : ''}
                                    setValue={(e) => SetValues(i, field.name, e)}
                                    CustomStyle={field.style}
                                    required={field.required}
                                />
                            )
                        } else if (field.type === 'editor') {
                            return (
                                <Editor
                                    title={field.title}
                                    name={field.name}
                                    value={formattedData !== undefined ? formattedData[field.name] : ''}
                                    setValue={SetValues}
                                    index={i}
                                    CustomStyle={field.style}
                                    required={field.required}
                                />
                            )
                        } else if (field.type === 'file') {
                            return (
                                <FileInput
                                    title={field.title}
                                    name={field.name}
                                    index={i}
                                    setValue={SetValues}
                                    CustomStyle={field.style}
                                    required={field.required}
                                />
                            )
                        }
                    })}
                </form>
            </div>}
            {view !== 'sectors' && view !== 'holiday codes' && formTitle && <div className={"col-md-12 mb-3 text-right pr-5" + (view === 'sectors' ? 'pb-5' : '')}>
                {((view === 'sectors' && params.id !== undefined) || view !== 'sectors') && <CustomButton buttonName={'Save'} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>}
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate(redirectURL)} CustomStyle="mr-3"></CustomButton>
            </div>}
        </div>
    );

}