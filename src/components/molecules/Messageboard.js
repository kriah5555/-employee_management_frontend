import React from "react";
import Legend from "../atoms/Legend";
import { t } from "../../translations/Translation";


export default function Messageboard({Messages}) {
    return (
        <div className="col-md-3 p-0 border-left font-12 dashboard_height">
                <h4 className="m-3 mt-4">{t("MESSAGE_BOARD")}</h4>
                <div className="row m-0">
                    <Legend title={t('EMPLOYEE_MESSAGE_TITLE')} styleClass1={"col-xl-7 col-12"} styleClass2={"box background-green"}></Legend>
                    <Legend title={t('DIMONA_MESSAGE_TITLE')} styleClass1={"col-xl-5 col-12"} styleClass2={"box background-red"}></Legend>
                    <Legend title={t('INDII_MESSAGE_TITLE')} styleClass1={"col-xl-6  col-12"} styleClass2={"box background-blue"}></Legend>
                </div>
                <ul className="mt-3 p-0">
                    {
                        Messages.map((val, index) => {
                            return (
                                <li key={index} className={"list-group p-2 px-3 m-3 my-2 " + val.styleClass}><p className="mb-0">{val.message}</p></li>
                            )
                        })
                    }
                </ul>
        </div>
    )
}
