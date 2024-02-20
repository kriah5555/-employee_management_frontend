import React from "react";
import { t } from "../../translations/Translation";
import Switch from "./Switch";

export default function EnableNotification() {

    return (
        <>
            <h2 className="col-md-10 p-0 mt-4 mb-3 ml-5" id="text-indii-blue">{t("NOTIFICATIONS")}</h2>
            <div className="col-md-12 p-5">
                <Switch label={t("ENABLE_NOTIFICATION")} id="switch1" styleClass="pt-2 pb-3 col-md-11 d-flex px-0 mb-5" />
                <Switch label={t("ENABLE_EMAIL_NOTIFICATION")} id="switch4" styleClass="pt-2 pb-3 col-md-11 d-flex px-0 mt-5" />
            </div>
        </>
    );
}           