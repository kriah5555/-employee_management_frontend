import React from "react";
import Select from 'react-select';
import RequiredIcon from "../../static/icons/exclamation-mark1.png"
import { t } from "../../translations/Translation";

export default function Dropdown({ options, selectedOptions, onSelectFunction, styleClass, CustomStyle, title, required, isMulti, error, isDisabled }) {


    const customStyle = {
        control: base => ({
            ...base,
            // This line disable the blue border
            boxShadow: 'none',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            minWidth: 10
        }),
        dropdownIndicator: base => ({
            ...base,
            color: "black",// Custom colour
            padding: 1
        })
    };

    return (
        <div className={CustomStyle}>
            {title && <div className={"d-flex justify-content-between " + (error ? '' : 'my-2')}>
                <label className="font-weight-bold row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {error && title && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {t("REQUIRED")}
                </p>}
            </div>}
            <Select
                options={options}
                isMulti={isMulti}
                value={selectedOptions}
                onChange={onSelectFunction}
                className={styleClass}
                isDisabled={isDisabled}
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
