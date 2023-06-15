import React  from "react";
import "../../static/common.css";

export default function CustomButton({buttonName, redirectURL, ActionFunction}) {

  return (
        <a className="btn button-style ml-2" href={redirectURL ? redirectURL : ''} onClick={() => ActionFunction(buttonName)}>
            {(buttonName)}
        </a>
  );
}