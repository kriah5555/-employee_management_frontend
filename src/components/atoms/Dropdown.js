import React from "react";
import Select from 'react-select';

export default function Dropdown({options, selectedOptions, onSelectFunction, styleClass, CustomStyle, title, required, isMulti}) {


    const customStyle = {
        control: base => ({
            ...base,
            // This line disable the blue border
            boxShadow: 'none',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            minWidth:10
        }),
        dropdownIndicator: base => ({
            ...base,
            color: "black" ,// Custom colour
            padding:1
        })
      };

    return (
        <div className={CustomStyle}>
            {title && <label className="font-weight-bold row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>}
            <Select
                options = {options}
                isMulti = {isMulti}
                value={selectedOptions}
                onChange={onSelectFunction}
                className={styleClass}
                components={{
                    IndicatorSeparator: () => null,
                }}
                styles={customStyle}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#d1f3e8',
                      primary: '#61bfb5',
                    }
                })}
            />
        </div>
    )
}
