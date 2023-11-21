export const ENV_URL = process.env.REACT_APP_serverURL //'http://dev.api.indii-2.0.infanion.com/' 'https://api.test.indii-new.infanion.com/'
export const REGEX_URL = 'service';
export const BASE_URL = ENV_URL + REGEX_URL;
export const LogoutLink = '';
export const PAGINATE_BY = 10;

//follow the below example to add your url endpoints

// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';

export const LoginApiUrl = BASE_URL + '/identity-manager/login'
export const LogoutApiUrl = BASE_URL + '/identity-manager/logout'
export const AccessTokenApiUrl = BASE_URL + '/identity-manager/generate-access-token'
export const GenderApiUrl = BASE_URL + '/identity-manager/genders'
export const MaritalStatusApiUrl = BASE_URL + '/identity-manager/marital-statuses'
export const EmployeeCreateApiUrl = BASE_URL + '/identity-manager/user'

// export const GetUserDetailsApiUrl = BASE_URL + '/identity-manager/user-details'
//add all your new urls from here onwards
export const EmployeeTypeApiUrl = BASE_URL + '/masterdata/employee-types'
export const EmployeeTypeOptionsApiUrl = BASE_URL + '/masterdata/employee-types/create'
export const SectorApiUrl = BASE_URL + '/masterdata/sectors'
export const FunctionApiUrl = BASE_URL + '/masterdata/function-titles'
export const GroupFunctionApiUrl = BASE_URL + '/masterdata/function-categories'
export const ContractTypeApiUrl = BASE_URL + '/masterdata/contract-types'
// export const SalariesApiUrl = BASE_URL + '/masterdata/get-minimum-salaries'
// export const UpdateSalariesApiUrl = BASE_URL + '/masterdata/update-minimum-salaries'
// export const RevertSalariesApiUrl = BASE_URL + '/masterdata/undo-coefficient-minimum-salaries'
export const CompanyApiUrl = BASE_URL + '/masterdata/companies'
export const LocationApiUrl = BASE_URL + '/masterdata/locations'
export const LocationListApiUrl = BASE_URL + '/masterdata/company-locations'
export const WorkstationApiUrl = BASE_URL + '/masterdata/workstations'
export const WorkstationListApiUrl = BASE_URL + '/masterdata/company-workstations'

export const EmployeeApiUrl = BASE_URL + '/masterdata/employees'
export const EmployeeContractApiUrl = BASE_URL + '/masterdata/employee-contract'
export const EmployeeCommutetApiUrl = BASE_URL + '/masterdata/employee-commute'
export const EmployeeBenefitsApiUrl = BASE_URL + '/masterdata/employee-benefits'



export const MealVoucherApiUrl = BASE_URL + '/masterdata/meal-vouchers'
export const HourlyMinimumSalariesApiurl = BASE_URL + '/masterdata/hourly-minimum-salaries'
export const MonthlyMinimumSalariesApiurl = BASE_URL + '/masterdata/monthly-minimum-salaries'

export const HolidayCodeApiUrl = BASE_URL + '/masterdata/holiday-codes'
export const ReasonsApiUrl = BASE_URL + '/masterdata/reasons'
export const CostCenterApiUrl = BASE_URL + '/masterdata/cost-center'
export const SocialSecretaryApiUrl = BASE_URL + '/masterdata/social-secretary'
export const EmailTemplateApiUrl = BASE_URL + '/masterdata/email-templates'
export const ContractTemplateApiUrl = BASE_URL + '/masterdata/contract-templates'
export const InterimAgencyApiUrl = BASE_URL + '/masterdata/interim-agencies'
export const CompanyContractTemplateApiUrl = BASE_URL + '/masterdata/company-contract-templates'
// export const SectorApiUrl = BASE_URL + '/sectors'

//Translations API urls starts here
// export const getLangaugeList = BASE_URL + 'translations/get-all-languages';
// export const fetchTranslations = BASE_URL + 'translations/fetch-strings';
// export const fetchAllTranslations = BASE_URL + 'translations/get-all-strings';