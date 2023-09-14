import React from "react";

export default function RadioInput({ title, radiobuttonsList, required, changeCheckbox, CustomStyle }) {
    return (
        <div className={"font-weight-bold " + CustomStyle}>
            {title && <label className="row m-0 mb-1">{title} {required && <p className="text-danger mb-0">&nbsp;*</p>} </label>}

            {radiobuttonsList.map((val, index) => {
                return (
                    <div key={val.key} className={"custom-control custom-checkbox mt-2"}>
                        {/* <label className="custom-control-label font-weight-normal" htmlFor={val.key}>
                            <input type="radio" className="custom-control-input" id={val.key} value={val.key} name={val.key} checked={val.checked} onChange={() => changeCheckbox(val.key)} />
                            {val.name}
                        </label> */}

                        <label>
                            <input
                                type="radio"
                                name={val.key}
                                value={val.name}
                                checked={val.checked}
                                onChange={() => changeCheckbox(val.key)}
                            />
                             {"  "+ val.name}
                        </label>
                    </div>
                )
            })}

        </div>
    )
}