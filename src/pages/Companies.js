import React from "react";
import OverviewTabs from "../components/organisms/OverviewTabs";



export default function Companies({ setCompany }) {

    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <OverviewTabs setCompany={setCompany}></OverviewTabs>
            </div>
        </div>

    )
}
