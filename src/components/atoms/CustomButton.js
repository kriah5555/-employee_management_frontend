import React from "react";
import "../../static/common.css";

export default function CustomButton({ buttonName, redirectURL, ActionFunction, CustomStyle }) {

  return (
    <>
      {redirectURL && <a className={"btn button-style mx-2 " + CustomStyle} href={redirectURL ? redirectURL : ''} onClick={() => ActionFunction(buttonName)}>
        {(buttonName)}
      </a>}
      {redirectURL === undefined && <a className={"btn button-style mx-2 " + CustomStyle} onClick={() => ActionFunction(buttonName)}>
        {(buttonName)}
      </a>}
    </>
  );
}
