import React from "react";
import TextInput from "../atoms/formFields/TextInput";
import Dropdown from "../atoms/Dropdown";
import TimeInput from "../atoms/TimeInput";

export default function OthPlanForm({ planData, i, index, othPlanData, SetValues, daysArr }) {

    return (
        <form className="col-md-12 px-0 border-blue">
            {planData.map((field, j) => {
                if (field.type === "text") {
                    return (
                        <TextInput
                            key={field.name}
                            title={field.title}
                            name={field.name}
                            CustomStyle={field.style}
                            required={field.required}
                            value={othPlanData !== undefined && othPlanData[index] !== undefined && othPlanData[index][i] !== undefined ? othPlanData[index][i][field.name] : ''}
                            setValue={(e) => SetValues(i, field.name, e, field.type, index)}
                        ></TextInput>
                    )
                } else if (field.type === 'dropdown') {
                    return (
                        <Dropdown
                            key={field.name}
                            options={field.options}
                            selectedOptions={othPlanData !== undefined && othPlanData[index] !== undefined && othPlanData[index][i] !== undefined ? { value: othPlanData[index][i][field.name], label: daysArr[othPlanData[index][i][field.name] - 1] } : []}
                            onSelectFunction={(e) => SetValues(i, field.name, e, field.type, index)}
                            CustomStyle={field.style}
                            title={field.title}
                            required={field.required}
                            isMulti={field.isMulti}
                        ></Dropdown>
                    )
                } else if (field.type === 'time') {
                    return (
                        <TimeInput
                            key={field.name}
                            title={field.title}
                            setTime={(e) => SetValues(i, field.name, e, field.type, index)}
                            value={othPlanData !== undefined && othPlanData[index] !== undefined && othPlanData[index][i] !== undefined && othPlanData[index][i] !== undefined ? othPlanData[index][i][field.name] : ''}
                            type={field.type}
                            index={i}
                            required={field.required}
                            customStyle={field.style}
                        ></TimeInput>
                    )
                }
            })}
        </form>
    )
}
