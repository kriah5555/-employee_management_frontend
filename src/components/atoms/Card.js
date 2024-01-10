import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ title, icon, styleClass,className, actionLink, view }) {

    const navigate = useNavigate();

    return (
        <div className={"card " + styleClass} onClick={() => navigate(actionLink)}>
            <div className={`card-body ${className}`}>
                {/* <img className={view === 'dashboard' ? "dashboard-icon" : 'configuration-icon'} src={icon}></img> */}
                <span className={view === 'dashboard' ? "dashboard-icon" : 'configuration-icon'} >{icon}</span>
                <h5 className="card-title pt-2">{title}</h5>
            </div>
        </div>
    )
}
