import React from "react";
import { useState } from "react";
import FileInput from "../atoms/FileInput";
import FormsNew from "./FormsNew";

export default function FileUploadTest(){

    const fieldArray =[{ title: t("ID_CARD_FRONT"), name: "id_card_front", required: true, type: "file", style: "col-md-6 mt-4 float-left" }]

    return(
        <FormsNew></FormsNew>
    )
}
