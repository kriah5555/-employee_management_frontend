import React from "react"
import "../../static/common.css";
import CloseIcon from "../../static/icons/Close.png"
import { t } from "../../translations/Translation";



export default function MenuContent({content, MenuName, setMenuclose, IdName}) {
    //Menu content displaying with given content and style
    return (
        <div>
            <ul className="list-group shadow" id={IdName}>
                {MenuName && <li className="list-group-item d-flex justify-content-between text-dark">
                    <h4 className="my-1">{MenuName} </h4>
                    <img alt={t("CLOSE")}className="ml-5 mb-1 mt-2 cancel-icon" src={CloseIcon} onClick={setMenuclose}></img>
                </li>}
                {content.map((val, index) => {
                    return(
                        <a key={val.title} className="list-group-item text-decoration-none border-bottom-0 text-dark" href={val.url}>
                            {val.icon ? <img alt={val.title} className="shortcut-icon pr-2" src={val.icon}></img> : ''}{val.title}
                        </a>
                    )
                })}
            </ul>
        </div>
    )
}