import React, { useRef } from "react";
import Select from 'react-select';
import RequiredIcon from "../../static/icons/exclamation-mark1.png"
import { t } from "../../translations/Translation";

export default function Dropdown({ options, selectedOptions, onSelectFunction, styleClass, CustomStyle, title, required, isMulti, error, isDisabled }) {
    const menuPortalTarget = useRef(document.body);

    const customStyle = {
        control: base => ({
            ...base,
            // This line disables the blue border
            boxShadow: 'none',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            minWidth: 10,
        }),
        dropdownIndicator: base => ({
            ...base,
            color: "black", // Custom color
            padding: 1,
        }),
        menu: (provided, state) => ({
            ...provided,
            overflow: 'visible', // Set overflow to 'visible' to ensure options are always visible
        }),
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        option: (provided, state) => ({
            ...provided,
            whiteSpace: 'nowrap', // Prevent line breaks
            overflow: 'hidden', // Hide overflowing text
            textOverflow: 'ellipsis', // Display an ellipsis (...) when text is truncated
        }),
    };

    const formatOptionLabel = ({ value, label, title }) => (
        <div title={label} className="text-truncate">
            {label}
        </div>
    );

    return (
        <div className={CustomStyle}>
            {title && <div className={"d-flex justify-content-between " + (error ? '' : '')}>
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
                noOptionsMessage={() => t("NO_OPTIONS")}
                placeholder={t("SELECT")}
                styles={customStyle}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#d1f3e8',
                        primary: '#61bfb5',
                    }
                })}
                menuPlacement="auto" // Automatically adjust placement based on available space
                menuPortalTarget={menuPortalTarget.current} // Set the target for rendering the menu outside the DOM hierarchy
                formatOptionLabel={formatOptionLabel} // Set the custom formatOptionLabel function

            />
        </div>
    )
}
