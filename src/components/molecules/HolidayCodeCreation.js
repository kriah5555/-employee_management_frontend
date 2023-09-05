import React, { useState } from "react";
import TextInput from "../atoms/formFields/TextInput";
import TextArea from "../atoms/formFields/TextArea";
import CustomCheckBox from "../atoms/formFields/CustomCheckBox";
import Dropdown from "../atoms/Dropdown";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../static/icons/BackIcon.png";
export default function HolidayCodeCreation() {

    const [holidayCode, setHolidayCode] = useState("");
    const [internalCode, setInternalCode] = useState("");
    const [holidayType, setHolidayType] = useState("");
    const [countType, setCountType] = useState("");
    const [employeeCategory, setEmployeeCategory] = useState([]);
    const [iconType, setIconType] = useState("");
    const [access, setAccess] = useState("");
    const [contractType, setContractType] = useState("");
    const [weeklyHours, setWeeklyHours] = useState(1);
    const [carryForward, setCarryForward] = useState("");
    const [leaveVerification, setleaveVerification] = useState(1);
    const [active, setActive] = useState(1);
    const [inactive, setInactive] = useState(0);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    //options arrays
    const holidayTypeOptions = [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }];
    const coutTypeOptions = [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }];
    const employeeCategoryOptions = [{ label: "A", value: "1" }, { label: "B", value: "2" }];
    const iconTypeOptions = [{ label: 1, value: 1 }, { label: 2, value: 2 }];
    const accessOptions = [{ label: "1", value: "1" }, { label: "2", value: "2" }];
    const contractTypeOptions = [{ label: "Full Time", value: "1" }, { label: "Part Time", value: "2" }];
    const carryForwardOptions = [{ label: "yes", value: 1 }, { label: "No", value: 0 }];
    const weeklyHoursPlanOptions = [{ label: "Yes", value: 1 }, { label: "No", value: 0 }];
    const leaveVerificationOptions = [{ label: "Yes", value: 1 }, { label: "No", value: 0 }];
    //checkbox list
    const statusCheckBoxList = [{ key: "active", name: "Active", checked: active }, { key: "inactive", name: "Inactive", inactive, checked: inactive }];

    // Checkbox status data
    const changeCheckbox = (type) => {
        if (type === 'active') {
            setActive(1);
            setInactive(0);
        } else {
            setActive(0);
            setInactive(1);
        }
    }
    const fieldData = [
        { title: "Holiday code name", value: holidayCode, setValue: setHolidayCode, type: "textInput", CustomStyle: "col-md-6 py-2" },
        { title: "Internal code", value: internalCode, setValue: setInternalCode, type: "textInput", CustomStyle: "col-md-6 py-2" },
        { title: "Holiday type", options: holidayTypeOptions, setValue: setHolidayType, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Count type", options: coutTypeOptions, setValue: setCountType, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Employee category", options: employeeCategoryOptions, setValue: setEmployeeCategory, isMulti: true, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Contract type", options: contractTypeOptions, setValue: setContractType, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Icon type", options: iconTypeOptions, setValue: setIconType, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Access", options: accessOptions, setValue: setAccess, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Carry forward", options: carryForwardOptions, setValue: setCarryForward, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Consider the plan hours in weekly hours ?", options: weeklyHoursPlanOptions, setValue: setWeeklyHours, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Show leave verification", options: leaveVerificationOptions, setValue: setleaveVerification, type: "dropdown", CustomStyle: "col-md-6 py-1" },
        { title: "Description", value: description, setValue: setDescription, type: "textArea", CustomStyle: "col-md-12 py-2" },
        { title: "Status", checkboxList: statusCheckBoxList, changeCheckbox: changeCheckbox, type: "checkbox", CustomStyle: "col-md-12 py-3" },

    ];
    const onSave = () => {
        const formData = {
            holidayCode: holidayCode,
            internalCode: internalCode,
            description: description,
            holidayType: holidayType,
            countType: countType,
            iconType: iconType,
            access: access,
            employeeCategory: employeeCategory,
            weeklyHours: weeklyHours,
            leaveVerification: leaveVerification,
            contractType: contractType,
            carryForword: carryForward,
            status: active,
        }
    }
    return (
        <div className="company-tab-width mt-3 mb-1 mx-auto pt-2 pl-2 border bg-white">
            <h2 id="text-indii-blue" className="col-md-12 px-5 mb-2 ml-2 mt-4"><img className="shortcut-icon mr-2 mb-1" src={BackIcon} onClick={() => navigate('/')}></img>Add Holiday Code</h2>
            <div className="row mx-5">
                {fieldData.map((field, index) => {
                    if (field.type == "textInput") {
                        return (
                            <TextInput
                                title={field.title}
                                CustomStyle={field.CustomStyle}
                                value={field.value}
                                setValue={field.setValue}
                                key={field.title}
                                error={field.error}
                                required={field.required}
                            />
                        )
                    }
                    else if (field.type == "textArea") {
                        return (
                            <TextArea
                                title={field.title}
                                CustomStyle={field.CustomStyle}
                                value={field.value}
                                setValue={field.setValue}
                                key={field.title}
                                error={field.error}
                                required={field.required}
                            />
                        );
                    }
                    else if (field.type == "checkbox") {
                        return (
                            <CustomCheckBox
                                title={field.title}
                                CustomStyle={field.CustomStyle}
                                checkboxList={field.checkboxList}
                                value={field.value}
                                changeCheckbox={field.changeCheckbox}
                                key={field.title}
                                required={field.required}
                            />
                        );
                    }
                    else if (field.type == "dropdown") {
                        return (
                            <Dropdown
                                options={field.options}
                                selectedOptions={field.value}
                                onSelectFunction={(e) => { field.setValue(e) }}
                                CustomStyle={field.CustomStyle}
                                title={field.title}
                                required={field.required}
                                isMulti={field.isMulti}
                                key={field.title}
                                error={field.error}
                            />
                        );
                    }
                })}
            </div>
            {<div className="row mx-5 justify-content-end mb-3">
                <CustomButton buttonName={'Back'} ActionFunction={() => navigate('/')} CustomStyle="mr-3"></CustomButton>
                <CustomButton buttonName={'Submit'} ActionFunction={() => onSave()} CustomStyle=""></CustomButton>
            </div>}
        </div>
    );
}   