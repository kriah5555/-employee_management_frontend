import React from "react";

export default function Legend({title, styleClass1, styleClass2}) {
    //Legends for message board added for now
    return (
        <div className={"d-flex mt-2 " + styleClass1}>
            <div className={"box mr-1 " + styleClass2} ></div>
            <p className="mb-0">{title}</p>
        </div>
    )
}
