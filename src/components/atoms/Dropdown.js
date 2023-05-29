import React from "react";
import Select from 'react-select';

export default function Dropdown({options, selectedOptions, onSelectFunction, styleClass}) {


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
        <section>
            <Select
                options = {options}
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
        </section>
    )
}
