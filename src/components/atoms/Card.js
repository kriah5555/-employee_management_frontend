import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({title, icon, styleClass, actionLink}) {

    const navigate = useNavigate();

    return (
        <>
            <div className={"card " + styleClass} onClick={() => navigate(actionLink)}>
                <div className="card-body">
                    <img className="dashboard-icon" src={icon}></img>
                    <h4>{title}</h4><h4></h4>
                </div>
            </div>
            <br></br>
        </>
    )
}
