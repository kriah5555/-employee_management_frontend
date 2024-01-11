import React, { useState } from "react";
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
import AddIcon from "../../static/icons/AddPlusIcon.png"
import DeleteIcon from "../../static/icons/Delete.svg"
import TimeInput from "../atoms/TimeInput";
import FlagDropdown from "../atoms/FlagDropdown";

import { t } from "../../translations/Translation";

export default function FormsNew({ view, data, formTitle, SetValues, formattedData, redirectURL, OnSave, planIndex, functionIndex }) {
    const navigate = useNavigate();
    const params = useParams();
    const [multipleHolidayCodeCount, setMultipleHolidayCodeCount] = useState([1]);
    const [multipleHolidayCodes, setMultipleHolidayCodes] = useState([{ 'hour': "", 'holiday_code': '' }]);

    const AddNewRow = () => {
        const rowsInput = 1;
        // Adding empty object for each row on add row click
        const rowData = {
            'hour': '',
            'holiday_code': '',
        }
        setMultipleHolidayCodes([...multipleHolidayCodes, rowData])
        if (multipleHolidayCodeCount !== undefined) {
            setMultipleHolidayCodeCount([...multipleHolidayCodeCount, rowsInput])
        }

    }

    function DeleteRow(index, type) {
        // Remove data from multipleHolidayCodes data
        const rows = [...multipleHolidayCodeCount];
        rows.splice(index, 1);
        setMultipleHolidayCodeCount(rows);

        const data = [...multipleHolidayCodes];
        data.splice(index, 1);
        setMultipleHolidayCodes(data);
    }


    return (
        <div className={view !== 'sectors' && view !== 'holiday codes' && view !== 'email template' && view !== 'contracts template' && formTitle ? "form-container mt-3 border bg-white d-flex flex-column" : (view === 'filters' ? "pb-3" : "pt-2 pb-3")}>
            {view !== 'sectors' && view !== 'holiday codes' && view !== 'email template' && view !== 'contracts template' && formTitle && <h2 id="text-indii-blue" className=" px-4 pt-4 mb-0 ml-2 d-flex align-items-center"><img className="shortcut-icon mr-2 pointer" onClick={() => navigate(redirectURL)} src={BackIcon}></img>{formTitle}</h2>}
            {data && <div className={view === 'filters' ? "d-flex px-2" : "d-flex px-4" + " flex-1 overflow-auto"}>
                <form className={view === 'filters' ? " px-0 border-blue row w-100" : "col-md-12 px-0 pb-4 border-blue"}>
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
                                    value={formattedData !== undefined ? field.name === 'contract_hours' && formattedData[planIndex] !== undefined ? formattedData[planIndex][field.name] : formattedData[field.name] : ''}
                                    setValue={(e) => SetValues((field.name === 'contract_hours' ? planIndex : i), field.name, e, field.type, functionIndex)}
                                    error={''}
                                    placeholder={field.placeholder ? field.placeholder : ''}
                                    disabled={field.disabled}
                                ></TextInput>
                            )
                        } else if (field.type === 'dropdown') {
                            return (
                                <Dropdown
                                    key={field.name}
                                    options={field.options}
                                    selectedOptions={field.selectedOptions}
                                    onSelectFunction={(e) => SetValues(i, field.name, e, field.type, functionIndex)}
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
                                <div>
                                    <TextArea
                                        key={field.name}
                                        title={field.title}
                                        name={field.name}
                                        required={field.required}
                                        CustomStyle={field.style}
                                        value={formattedData !== undefined ? formattedData[field.name] : ''}
                                        setValue={(e) => SetValues(i, field.name, e, field.type)}
                                    ></TextArea>
                                    {view === 'employee_types' && <h4 id="text-indii-blue" className="col-md-12 float-left pb-3 mb-0"><u>{t("CONFIGURATIONS") + (":")}</u></h4>}
                                </div>
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
                                    placeholder={field.placeholder}
                                    isMulti={field.isMulti}
                                    disabled={field.disabled}
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
                                    key={field.name}
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
                                    key={field.name}
                                    title={field.title}
                                    name={field.name}
                                    index={i}
                                    setValue={SetValues}
                                    CustomStyle={field.style}
                                    required={field.required}
                                    value={formattedData !== undefined ? formattedData[field.name] : {}}
                                />
                            )
                        } else if (field.type === 'time') {
                            return (
                                <TimeInput
                                    key={field.name}
                                    title={field.title}
                                    setTime={(e) => SetValues(planIndex, field.name, e, field.type)}
                                    value={planIndex !== undefined ? (formattedData[planIndex] !== undefined ? formattedData[planIndex][field.name] : '') : formattedData[field.name]}
                                    type={field.type}
                                    index={planIndex}
                                    required={field.required}
                                    customStyle={field.style}
                                ></TimeInput>
                            )
                        } else if (field.type === "arry_of_values") {
                            return (
                                <>
                                    {multipleHolidayCodeCount.map((val, index) => {
                                        return (
                                            <div className=" col-md-12 d-flex p-0 " key={field.name}>
                                                <div className="col-md-10 d-flex mt-2">
                                                    <TextInput
                                                        key={field.name}
                                                        title={t("HOURS")}
                                                        name={"hours"}
                                                        CustomStyle={'col-md-6'}
                                                        required={true}
                                                        value={formattedData !== undefined ? formattedData[field.name] : ''}
                                                        setValue={(e) => SetValues(index, field.name, e, field.type)}
                                                        error={''}
                                                    ></TextInput>
                                                    <TextInput
                                                        key={field.name}
                                                        title={t("HOLIDAY_CODE")}
                                                        name={"holiday_code"}
                                                        CustomStyle={'col-md-6'}
                                                        required={true}
                                                        value={formattedData !== undefined ? formattedData[field.name] : ''}
                                                        setValue={(e) => SetValues(index, field.name, e, field.type)}
                                                        error={''}
                                                    ></TextInput>
                                                </div>
                                                <div className="col-md-2 mt-2">
                                                    {<img className="header-icon mt-4 mr-4 pointer" src={AddIcon} onClick={() => AddNewRow()}></img>}
                                                    {multipleHolidayCodeCount.length > 1 && <img className="header-icon mt-4 mr-4" src={DeleteIcon} onClick={() => DeleteRow(index)}></img>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            )
                        } else if (field.type === 'flag') {
                            return (
                                <FlagDropdown
                                    key={field.name}
                                    options={field.options}
                                    title={field.title}
                                    CustomStyle={field.style}
                                    className={field.styleClass}
                                    selected={field.selectedOptions}
                                    onSelectFunction={(e) => SetValues(i, field.name, e, field.type, functionIndex)}
                                    placeholder={field.placeholder ? field.placeholder : "select"}
                                    disabled={field.isDisabled}
                                    required={field.required}
                                    error={''}
                                ></FlagDropdown>
                            )
                        }
                    })}
                </form>
            </div>}
            <div className="my-3 px-4">
                {view !== 'sectors' && view !== 'holiday codes' && formTitle && <div className={"text-right" + (view === 'sectors' ? 'pb-5' : '')}>
                    {((view === 'sectors' && params.id !== undefined) || view !== 'sectors') && <CustomButton buttonName={t("SAVE")} ActionFunction={() => OnSave()} CustomStyle=""></CustomButton>}
                    <CustomButton buttonName={t("BACK_LINK")} ActionFunction={() => navigate(redirectURL)} CustomStyle=""></CustomButton>
                </div>}
            </div>

        </div>
    );

}
