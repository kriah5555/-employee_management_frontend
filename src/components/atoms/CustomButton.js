import React  from "react";
import "../../static/common.css";

export default function CustomButton({buttonName, ActionFunction, CustomStyle}) {

  return (
        <a className={"btn button-style ml-2 " + CustomStyle} onClick={() => ActionFunction(buttonName)}>
            {(buttonName)}
        </a>
  );
}