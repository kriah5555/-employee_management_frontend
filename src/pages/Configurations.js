import React from "react";
import Card from "../components/atoms/Card";
// import ContractTypeIcon from "../static/icons/ContractType.svg";
// import EmployeeTypeIcon from "../static/icons/EmployeeType.svg";
// import SectorsIcon from "../static/icons/Sectors.svg";
// import FunctionsIcon from "../static/icons/Functions.svg";
// import GroupFunctionsIcon from "../static/icons/GroupFunctions.svg";
// import SalariesIcon from "../static/icons/Salaries.svg";
// import ReasonsIcon from "../static/icons/Reasons.svg";
// import SocialSecretaryIcon from "../static/icons/SocialSecretary.svg";
// import HolidayCodeIcon from "../static/icons/HolidayCode.svg";
// import Email from "../static/icons/EmailTemplate.svg";
// import TranslationIcon from "../static/icons/translate.svg";
import { t } from "../translations/Translation";
import ParameterIcon from "../static/icons/term.png";
import Salaries from "../static/icons/Salaries";
import ContractType from "../static/icons/ContractType";
import EmployeeType from "../static/icons/EmployeeType";
import Sectors from "../static/icons/Sectors";
import Functions from "../static/icons/Functions";
import GroupFunctions from "../static/icons/GroupFunctions";
import Reasons from "../static/icons/Reasons";
import SocialSecretary from "../static/icons/SocialSecretary";
import HolidayCode from "../static/icons/HolidayCode";
import EmailTemplate from "../static/icons/EmailTemplate";
import Translate from "../static/icons/Translate";

export default function Configurations() {

    const subTabStyle = "col-md-2 my-3 mx-4 shadow text-center border-0  ";

    const ConfigurationTabs = [
        { title: t('CONTRACT_TYPE'), icon: <ContractType />, styleClass: subTabStyle, type: 'contract_type' },
        { title: t('EMPLOYEE_TYPES'), icon: <EmployeeType />, styleClass: subTabStyle, type: 'employee_type' },
        { title: t('SECTORS'), icon: <Sectors />, styleClass: subTabStyle, type: 'sectors' },
        { title: t('FUNCTIONS'), icon: <Functions />, styleClass: subTabStyle, type: 'functions' },
        { title: t('GROUP_FUNCTIONS'), icon: <GroupFunctions />, styleClass: subTabStyle, type: 'group_functions' },
        { title: t('MIN_SALARY'), icon: <Salaries />, styleClass: subTabStyle, type: 'min_salary' },
        { title: t('REASONS'), icon: <Reasons />, styleClass: subTabStyle, type: 'reasons' },
        { title: t('SOCIAL_SECRETARY'), icon: <SocialSecretary />, styleClass: subTabStyle, type: 'social_secretary' },
        { title: t('INTERIM_AGENCIES'), icon: <SocialSecretary />, styleClass: subTabStyle, type: 'interim-agencies' },
        { title: t('DEFAULT_PARAMETER'), icon: ParameterIcon, styleClass: subTabStyle, type: 'default_param' },
        { title: t('PARAMETER'), icon: ParameterIcon, styleClass: subTabStyle, type: 'parameters' },

    ]

    const HolidayConfigurationTabs = [
        { title: t("HOLIDAY_CODES"), icon: <HolidayCode/>, styleClass: subTabStyle, type: 'holiday_code' },
        { title: t("HOLIDAY_CODE_CONFIGURATION"), icon: <HolidayCode/>, styleClass: subTabStyle, type: 'holiday_code_configuration' },
        { title: t("PUBLIC_HOLIDAY_CONFIGURATION"), icon: <HolidayCode/>, styleClass: subTabStyle, type: 'public_holiday_configuration' },
    ]

    const CommunicationTabs = [
        { title: t("EMAIL_TEMPLATES"), icon: <EmailTemplate/>, styleClass: subTabStyle, type: 'email' },
        { title: t("TRANSLATIONS"), icon: <Translate/>, styleClass: subTabStyle, type: 'translation' },
        // { title: ('Message '), icon: Email, styleClass: subTabStyle, type: 'message' },
        { title: t("CONTRACT_TEMPLATES"), icon: <ContractType />, styleClass: subTabStyle, type: 'contracts_template' },
    ]
    return (
        <div className="right-container">
            <div className="company-tab-width mt-3 border bg-white">
                <h2 className="text-center my-4 text-color font-weight-bold">{t("CONFIGURATIONS")}</h2>
                <div className="configuration_body">
                    <h4 className="text-left pl-5 ml-4 text-color font-weight-bold">{t("EMPLOYEE_CONFIGURATIONS")}</h4>
                    <div className="d-flex mx-5 mb-0 pb-4 flex-wrap border-bottom">
                        {
                            ConfigurationTabs.map((val, index) => {
                                return (
                                    <Card className="p-3 py-4" key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-configurations/' + val.type} view={'configuration'}></Card>
                                )
                            })
                        }
                    </div>

                    <h4 className="text-left pl-5 mt-4 ml-4 text-color font-weight-bold">{t("HOLIDAY_CONFIGURATION")}</h4>
                    <div className="d-flex mx-5 mb-0 pb-4 flex-wrap border-bottom">
                        {
                            HolidayConfigurationTabs.map((val, index) => {
                                return (
                                    <Card className="p-3 py-4" key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-holiday-configurations/' + val.type} view={'configuration'}></Card>
                                )
                            })
                        }
                    </div>
                    <h4 className="text-left pl-5 mt-4 ml-4 text-color font-weight-bold">{t("COMMUNICATION_CONFIGURATION")}</h4>
                    <div className="d-flex mx-5 mb-0 pb-4 flex-wrap border-bottom">
                        {
                            CommunicationTabs.map((val, index) => {
                                return (
                                    <Card className="p-3 py-4" key={val.title} title={val.title} icon={val.icon} styleClass={val.styleClass} actionLink={'/manage-communication-configurations/' + val.type} view={'configuration'}></Card>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
