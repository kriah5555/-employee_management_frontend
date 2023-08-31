import React from "react"
import "../../static/common.css";
import CloseIcon from "../../static/icons/Close.png"
import { t } from "../../translations/Translation";



export default function MenuContent({ content, MenuName, setMenuclose, IdName, type }) {
    //Menu content displaying with given content and style
    return (
        <div>
            <ul className={type == "myAccountMenu" ? "list-group border-bottom" : "list-group shadow"} id={IdName}>
                {MenuName &&
                    <li className="list-group-item d-flex justify-content-between text-dark">
                        <h4 className="my-1">{MenuName} </h4>
                        <img alt={t("CLOSE")} className="ml-5 mb-1 mt-2 cancel-icon" src={CloseIcon} onClick={setMenuclose}></img>
                    </li>
                }
                {content.map((val, index) => {
                    return (
                        <>
                            {!type && val.ActionFunction && <a key={val.title} className="list-group-item text-decoration-none border-bottom-0 text-dark" onClick={() => val.ActionFunction()}>
                                {val.icon ? <img alt={val.title} className="shortcut-icon pr-2" src={val.icon}></img> : ''}{val.title}
                            </a>}
                            {!type && val.url && <a key={val.title} className="list-group-item text-decoration-none border-bottom-0 text-dark" href={val.url} >
                                {val.icon ? <img alt={val.title} className="shortcut-icon pr-2" src={val.icon}></img> : ''}{val.title}
                            </a>}
                            {type == "myAccountMenu" && <a key={val.title} className={window.location.hash == (val.url) ? "text-decoration-none active-my-account-menu my-account-menu mb-2 shadow" : "text-decoration-none my-account-menu mb-2"} href={val.url} >
                                {val.icon ? <img alt={val.title} className="shortcut-icon pr-2" src={val.icon}></img> : ''}{val.title}
                            </a>}
                        </>
                    )
                })}
            </ul>
        </div>
    )
}