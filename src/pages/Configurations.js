import React from "react";
import Card from "../components/atoms/Card";
import ContractTypeIcon from "../static/icons/ContractType.svg";
import EmployeeTypeIcon from "../static/icons/EmployeeType.svg";
import SectorsIcon from "../static/icons/Sectors.svg";
import FunctionsIcon from "../static/icons/Functions.svg";
import GroupFunctionsIcon from "../static/icons/GroupFunctions.svg";
import SalariesIcon from "../static/icons/Salaries.svg";
import ReasonsIcon from "../static/icons/Reasons.svg";
import SocialSecretaryIcon from "../static/icons/SocialSecretary.svg";
import HolidayCodeIcon from "../static/icons/HolidayCode.svg";
import Email from "../static/icons/EmailTemplate.svg";

import { t } from "../translations/Translation";


export default function Configurations() {

    const subTabStyle = "col-md-2 my-3 mx-4 shadow text-center border-0 card-height ";

    const ConfigurationTabs = [
        { title: t('CONTRACT_TYPE'), icon: ContractTypeIcon, styleClass: subTabStyle, type: 'contract_type' },
        { title: t('EMPLOYEE_TYPES'), icon: EmployeeTypeIcon, styleClass: subTabStyle, type: 'employee_type' },
        { title: t('SECTORS'), icon: SectorsIcon, styleClass: subTabStyle, type: 'sectors' },
        { title: t('FUNCTIONS'), icon: FunctionsIcon, styleClass: subTabStyle, type: 'functions' },
        { title: t('GROUP_FUNCTIONS'), icon: GroupFunctionsIcon, styleClass: subTabStyle, type: 'group_functions' },
        { title: t('MIN_SALARY'), icon: SalariesIcon, styleClass: subTabStyle, type: 'min_salary' },
        { title: t('REASONS'), icon: ReasonsIcon, styleClass: subTabStyle, type: 'reasons' },
        { title: t('SOCIAL_SECRETARY'), icon: SocialSecretaryIcon, styleClass: subTabStyle, type: 'social_secretary' },
        { title: t('INTERIM_AGENCIES'), icon: SocialSecretaryIcon, styleClass: subTabStyle, type: 'interim-agencies' },

    ]

    const HolidayConfigurationTabs = [
        { title: ('Holiday codes'), icon: HolidayCodeIcon, styleClass: subTabStyle, type: 'holiday_code' },
    ]

    const CommunicationTabs = [
        { title: ('Email templates'), icon: Email, styleClass: subTabStyle, type: 'email' },
        // { title: ('Translations'), icon: Email, styleClass: subTabStyle, type: 'translation' },
        // { title: ('Message '), icon: Email, styleClass: subTabStyle, type: 'message' },
    ]
    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <h2 className="text-center my-4 text-color font-weight-bold">Configurations</h2>
                <h4 className="text-left pl-5 ml-4 text-color font-weight-bold">Employee configurations</h4>
                <div className="d-flex mx-5 mb-0 pb-4 flex-wrap border-bottom">
                    {
                        ConfigurationTabs.map((val, index) => {
                            return (
                                <Card key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-configurations/' + val.type} view={'configuration'}></Card>
                            )
                        })
                    }
                </div>

                <h4 className="text-left pl-5 mt-4 ml-4 text-color font-weight-bold">Holiday configurations</h4>
                <div className="d-flex mx-5 mb-0 pb-4 flex-wrap border-bottom">
                    {
                        HolidayConfigurationTabs.map((val, index) => {
                            return (
                                <Card key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-holiday-configurations/' + val.type} view={'configuration'}></Card>
                            )
                        })
                    }
                </div>
                <h4 className="text-left pl-5 mt-4 ml-4 text-color font-weight-bold">Communication configuration</h4>
                <div className="d-flex mx-5 mb-0 pb-4 flex-wrap border-bottom">
                    {
                        CommunicationTabs.map((val, index) => {
                            return (
                                <Card key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-communication-configurations/' + val.type} view={'configuration'}></Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
