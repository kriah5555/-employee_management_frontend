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


export default function FormsNew({ view, data, formTitle, SetValues, formattedData, redirectURL, OnSave }) {

    const navigate = useNavigate();
    const params = useParams();

    return (
        <div className={view !== 'sectors' ? "form-container my-5 border bg-white" : "pt-2 pb-5"}>
            {view !== 'sectors' && <h2 id="text-indii-blue" className="col-md-12 px-5 pt-4 mb-0 ml-2"><img className="shortcut-icon mr-2 mb-1" onClick={() => navigate(redirectURL)} src={BackIcon}></img>{formTitle}</h2>}
            {data && <div className="d-flex px-5">
                <form className={"col-md-12 px-0 pb-4 border-blue"}>
                    {/* Text input field and dropdown based on the data given */}
                    {data.map((field, i) => {
                        if (field.type === "text") {
                            return (
                                <TextInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    CustomStyle="col-md-6 mt-4 float-left"
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
                                    CustomStyle="col-md-6 mt-2 float-left"
                                    title={field.title}
                                    required={field.required}
                                    isMulti={field.isMulti}
                                    error={''}
                                ></Dropdown>
                            )
                        } else if (field.type === 'color') {
                            return (
                                <ColorInput
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    CustomStyle="col-md-6 mt-5 mb-2 d-flex float-left"
                                    required={field.required}
                                    value={formattedData !== undefined ? (formattedData[field.name] ? formattedData[field.name] : '#61bfb5') : '#61bfb5'}
                                    setValue={(e) => SetValues(i, field.name, e)}
                                    error={''}
                                ></ColorInput>
                            )
                        } else if (field.type === 'switch') {
                            return (
                                <Switch
                                    label={field.title}
                                    id={field.name}
                                    styleClass="col-md-6 d-flex mt-4 float-left"
                                    lableClick={false}
                                    required={field.required}
                                    onChange={(e) => SetValues(i, field.name, e.target.checked)}
                                    defaultChecked={formattedData !== undefined ? formattedData[field.name] : false}
                                    checked={formattedData !== undefined ? formattedData[field.name]: false}
                                />
                            )
                        } else if (field.type === 'text-area') {
                            return (
                                <>
                                    <TextArea
                                        title={field.title}
                                        name={field.name}
                                        required={field.required}
                                        CustomStyle={"col-md-12 mt-4 mb-5 float-left"}
                                        value={formattedData !== undefined ? formattedData[field.name] : ''}
                                        setValue={(e) => SetValues(i, field.name, e)}
                                    ></TextArea>
                                    {view === 'employee_types' && <h4 id="text-indii-blue" className="col-md-12 float-left pb-3 mb-0"><u>Configurations:</u></h4>}
                                </>
                            )
                        } else if (field.type === 'checkbox') {
                            return (
                                <CustomCheckBox
                                    title={field.title}
                                    checkboxList={field.checkboxList}
                                    changeCheckbox={field.changeCheckbox}
                                    required={field.required}
                                    CustomStyle={"col-md-12 mt-4 mb-2 float-left"}
                                ></CustomCheckBox>
                            )
                        }
                    })}
                </form>
            </div>}
            {view !== 'sectors' && <div className={"col-md-12 mb-3 text-right pr-5" + (view === 'sectors' ? 'pb-5' : '')}>
                {((view === 'sectors' && params.id !== undefined) || view !== 'sectors') && <CustomButton buttonName={'Save'} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>}
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate(redirectURL)} CustomStyle="mr-3"></CustomButton>
            </div>}
        </div>
    );

}