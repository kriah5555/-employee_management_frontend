import React from "react";

export default function RadioInput({ title, radiobuttonsList, required, changeCheckbox, CustomStyle, selectedOption, type }) {

    console.log(selectedOption);
    return (
        <div className={" " + CustomStyle}>
            {title && <label className="row font-weight-bolder m-0 pl-4 mb-3">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>}

            {radiobuttonsList.map((val, index) => {
                return (
                    <div key={val.key} className={"custom-control custom-checkbox"}>
                        {/* <label className="custom-control-label font-weight-normal" htmlFor={val.key}>
                            <input type="radio" className="custom-control-input" id={val.key} value={val.key} name={val.key} checked={val.checked} onChange={() => changeCheckbox(val.key)} />
                            {val.name}
                        </label> */}

                        <label>
                            <input
                                type="radio"
                                name={val.key}
                                value={val.name}
                                checked={val.key === selectedOption}
                                onChange={() => changeCheckbox(type, val.key)}
                            />
                             {"  "+ val.name}
                        </label>
                    </div>
                )
            })}

        </div>
    )
}