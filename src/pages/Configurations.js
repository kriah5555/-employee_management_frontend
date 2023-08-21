import React from "react";
import Card from "../components/atoms/Card";
import EmployeeTypeIcon from "../static/icons/EmployeeType.svg";
import SectorsIcon from "../static/icons/Sectors.svg";
import FunctionsIcon from "../static/icons/Functions.svg";
import GroupFunctionsIcon from "../static/icons/GroupFunctions.svg";
import SalariesIcon from "../static/icons/Salaries.svg";

import { t } from "../translations/Translation";


export default function Configurations() {

    const subTabStyle = "col-md-2 my-3 mx-3 shadow text-center border-0 card-height ";

    const ConfigurationTabs = [
        { title: t('CONTRACT_TYPE'), icon: EmployeeTypeIcon, styleClass: subTabStyle, type: 'contract_type' },
        { title: t('EMPLOYEE_TYPES'), icon: EmployeeTypeIcon, styleClass: subTabStyle, type: 'employee_type' },
        { title: t('SECTORS'), icon: SectorsIcon, styleClass: subTabStyle, type: 'sectors' },
        { title: t('FUNCTIONS'), icon: FunctionsIcon, styleClass: subTabStyle, type: 'functions' },
        { title: t('GROUP_FUNCTIONS'), icon: GroupFunctionsIcon, styleClass: subTabStyle, type: 'group_functions' },
        { title: t('MIN_SALARY'), icon: SalariesIcon, styleClass: subTabStyle, type: 'min_salary' },
    ]

    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <h2 className="text-center my-4 text-color font-weight-bold">Configurations</h2>
                <div className="col-md-12 d-flex mx-4 mb-0 mt-2 pt-1 flex-wrap">
                    {
                        ConfigurationTabs.map((val, index) => {
                            return (
                                <Card key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-configurations/' + val.type} view={'configuration'}></Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
