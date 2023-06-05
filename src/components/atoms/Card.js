import React from "react";

export default function Card({title, icon, styleClass}) {
    return (
        <>
            <div className={"card " + styleClass}>
                <div className="card-body">
                    <img className="dashboard-icon" src={icon}></img>
                    <h4>{title}</h4><h4></h4>
                </div>
            </div>
            <br></br>
        </>
    )
}
