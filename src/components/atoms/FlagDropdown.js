import React from "react";
import ReactFlagsSelect from "react-flags-select";
import RequiredIcon from "../../static/icons/exclamation-mark1.png"
import { t } from "../../translations/Translation";

export default function FlagDropdown({ options, selectedOptions, onSelectFunction, styleClass, CustomStyle, title, required, isMulti, error, isDisabled, placeholder }) {
    return (
        <div className={CustomStyle}>
            {/* {title && <div className={"d-flex justify-content-between " + (error ? '' : 'my-2')}>
                <label className="font-weight-bold row mx-0 my-auto">{title} {required && <p className="text-danger my-auto">&nbsp;*</p>} </label>
                {error && title && <p className="pt-1 pb-0 px-4 m-1 text-danger required-bg rounded font-weight-normal">
                    <img className="box mr-1 mb-1" src={RequiredIcon}></img>
                    {t("REQUIRED")}
                </p>}
            </div>}
            <ReactFlagsSelect
                selected={selectedOptions}
                onSelect={(e) => onSelectFunction(e)}
                placeholder={placeholder ? placeholder : "select..."}
                className={styleClass}
                selectedSize={16}
                optionsSize={16}
                disabled={isDisabled}
                fullWidth={true}
                searchable={true}
            ></ReactFlagsSelect> */}
        </div>
    )

}