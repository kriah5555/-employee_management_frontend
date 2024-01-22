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

// Configuration api urls
export const EmployeeTypeApiUrl = BASE_URL + '/masterdata/employee-types'
export const EmployeeTypeOptionsApiUrl = BASE_URL + '/masterdata/employee-types/create'
export const SectorApiUrl = BASE_URL + '/masterdata/sectors'
export const FunctionApiUrl = BASE_URL + '/masterdata/function-titles'
export const GroupFunctionApiUrl = BASE_URL + '/masterdata/function-categories'
export const ContractTypeApiUrl = BASE_URL + '/masterdata/contract-types'
export const HourlyMinimumSalariesApiurl = BASE_URL + '/masterdata/hourly-minimum-salaries'
export const MonthlyMinimumSalariesApiurl = BASE_URL + '/masterdata/monthly-minimum-salaries'
export const getIncrementedSalariesApiUrl = BASE_URL + '/masterdata/salary-increment-calculation'
export const ReasonsApiUrl = BASE_URL + '/masterdata/reasons'
export const SocialSecretaryApiUrl = BASE_URL + '/masterdata/social-secretary'
export const EmailTemplateApiUrl = BASE_URL + '/masterdata/email-templates'
export const ContractTemplateApiUrl = BASE_URL + '/masterdata/contract-templates'
export const InterimAgencyApiUrl = BASE_URL + '/masterdata/interim-agencies'

// Company api urls
export const CompanyApiUrl = BASE_URL + '/masterdata/companies'
export const CompanyAdditionalApiUrl = BASE_URL + '/masterdata/company-additional-details'
export const LocationApiUrl = BASE_URL + '/masterdata/locations'
export const LocationListApiUrl = BASE_URL + '/masterdata/company-locations'
export const WorkstationApiUrl = BASE_URL + '/masterdata/workstations'
export const WorkstationListApiUrl = BASE_URL + '/masterdata/company-workstations'
export const GetSectorFunctionsApiUrl = BASE_URL + '/masterdata/get-company-linked-functions'
export const ResponsiblePersonApiUrl = BASE_URL + '/masterdata/responsible-persons'
export const CostCenterApiUrl = BASE_URL + '/masterdata/cost-centers'
export const ResponsibleCompaniesApiUrl = BASE_URL + "/masterdata/user/responsible-companies"
export const CompanyContractTemplateApiUrl = BASE_URL + '/masterdata/company-contract-templates'

// Employee api urls
export const EmployeeApiUrl = BASE_URL + '/masterdata/employees'
export const EmployeeContractApiUrl = BASE_URL + '/masterdata/employee-contracts'
export const EmployeeCommutetApiUrl = BASE_URL + '/masterdata/employee-commute'
export const EmployeeBenefitsApiUrl = BASE_URL + '/masterdata/employee-benefits'
export const GetEmployeeDocumentsApiUrl = BASE_URL + "/masterdata/get-employee-documents"
export const GetEmployeesApiUrl = BASE_URL + '/masterdata/get-company-employees'
export const UploadIdCardApiUrl = BASE_URL + '/masterdata/employee-id-card'

// UUrrooster api urls
export const UurroosterApiUrl = BASE_URL + '/masterdata/uurrooster'

// Setting api urls
export const MealVoucherApiUrl = BASE_URL + '/masterdata/meal-vouchers'
export const CommuteTypesApiUrl = BASE_URL + '/masterdata/commute-types'


// Holiday configuration api urls
export const HolidayCodeApiUrl = BASE_URL + '/masterdata/holiday-codes'
export const HolidayCodeConfigurationApiUrl = BASE_URL + "/masterdata/holiday-code-config"
export const GetHolidaysByStatusApiUrl = BASE_URL + '/masterdata/holidays-list/'
export const UpdateHolidayStatusApiUrl = BASE_URL + '/masterdata/holidays-status'
export const HolidaysApiUrl = BASE_URL + '/masterdata/holidays' //to GET, DELETE, UPDATE holiday

// Planning Apis:
export const FilterOptionsApiUrl = BASE_URL + '/masterdata/planning/get-planning-options'
export const GetMonthlyPlanningApiUrl = BASE_URL + '/masterdata/planning/get-monthly-planning'
export const GetWeeklyPlanningApiUrl = BASE_URL + '/masterdata/planning/get-week-planning'
export const GetEmployeeWeekPlansApiUrl = BASE_URL + '/masterdata/get-week-planning-employee'
export const GetEmployeeOptionsApiUrl = BASE_URL + '/masterdata/get-active-contract-employees'
export const GetPlanCreationOptionsUrl = BASE_URL + '/masterdata/get-employee-plan-creation-options'
export const CreatePlanApiUrl = BASE_URL + '/masterdata/save-plans'
export const DeleteSinglePlan = BASE_URL + '/masterdata/delete-plan/'
export const DeleteWeekPlans = BASE_URL + '/masterdata/delete-week-plans'
export const GetDayPlans = BASE_URL + '/masterdata/planning/get-day-planning'
export const GetPlanDetails = BASE_URL + '/masterdata/planning-details/'
export const GetStartPlanReasonsApiUrl = BASE_URL + '/masterdata/start-plan-reasons'
export const GetStopPlanReasonsApiUrl = BASE_URL + '/masterdata/stop-plan-reasons'
export const StartPlanApiUrl = BASE_URL + '/masterdata/start-plan-by-manager'
export const StopPlanApiUrl = BASE_URL + '/masterdata/stop-plan-by-manager'

// Open shift api urls
export const OpenShiftApiUrl = BASE_URL + '/masterdata/vacancy'
export const CreateShiftsApiUrl = BASE_URL + '/masterdata/store-planning-shifts'
export const CreateShiftPlanApiUrl = BASE_URL + '/masterdata/create-shift-plan'

// Oth planning api urls
export const CreateOthPlanApiUrl = BASE_URL + '/masterdata/long-term-planning'
export const GetOthPlansApiUrl = BASE_URL + '/masterdata/employee-long-term-plannings/'
export const GetOthOptionsApiUrl = BASE_URL + '/masterdata/long-term-planning/create'

// My account api urls
export const UserDetailsApiUrl = BASE_URL + '/masterdata/user-details'
export const UpdateUserDetailsApiUrl = BASE_URL + '/masterdata/employee-update'

// Holiday api urls
export const ChangeReportingManagerForHOliday = BASE_URL + "/masterdata/holidays-change-reporting-manager"
export const PublicHolidayCodeApiUrl = BASE_URL + '/masterdata/public-holidays'
export const EmployeeHolidayCountsOverViewApiUrl = BASE_URL + "/masterdata/employee-holiday-count-overview"
export const EmployeeHolidayCountsApiUrl = BASE_URL + "/masterdata/employee-holiday-count"

export const EmployeeSignApiUrl = BASE_URL + '/masterdata/employee-signature'
export const SignContractApiUrl = BASE_URL + '/masterdata/employee-sign-plan-contract'
export const EmployeeAvailabilityApiUrl = BASE_URL + '/masterdata/get-employee-availability'
export const GetAvailabilitiesApiUrl = BASE_URL + '/masterdata/get-weekly-availability'

// Rules and params api urls
export const GetDefaultParamApiUrl = BASE_URL + '/masterdata/get-default-parameters'
export const UpdateDefaultParamApiUrl = BASE_URL + '/masterdata/update-default-parameter'

export const GetParametersApiUrl = BASE_URL + '/masterdata/get-parameters'
export const UpdateParameterApiUrl = BASE_URL + '/masterdata/update-parameter'

export const GetCompanyParametersApiUrl = BASE_URL + '/masterdata/get-company-parameters'
export const UpdateCompanyParametersApiUrl = BASE_URL + '/masterdata/update-company-parameter'

export const GetParametersOptionsApiUrl = BASE_URL + '/masterdata/get-manage-parameter-options'

// Dimona api urls
export const EmployeeTypeDimonaConfigurationApiUrl = BASE_URL + "/masterdata/employee-type-dimona-config"
export const GetDimonaPlansApiUrl = BASE_URL + "/masterdata/get-plans-to-send-dimona"
export const SendDimonaApiUrl = BASE_URL + "/masterdata/send-dimona"
export const GetDimonaApiUrl = BASE_URL + "/masterdata/dimona-overview"

// Social secretary Configuration api urls
export const TaxesApiUrl = BASE_URL + "/masterdata/taxes"
export const SalaryCoefficientApiUrl = BASE_URL + "/masterdata/salary-coefficients"

// Leave api urls
export const AddLeaveApiUrl = BASE_URL + "/masterdata/add-leave"
export const GetPlansForLeavesApiUrl = BASE_URL + "/masterdata/get-plans-for-leave"
export const GetLeaveOptionsApiUrl = BASE_URL + "/masterdata/leaves/create"

// Invite employee api urls
export const EmployeeInviteApiUrl = BASE_URL + '/masterdata/employee-invitations'
export const ValidateEmployeeInvitation = BASE_URL + '/masterdata/validate-employee-invitations'
export const EmployeeRegistrationApiUrl = BASE_URL + '/masterdata/employee-registration'

//Translations API urls starts here
// export const getLangaugeList = BASE_URL + 'translations/get-all-languages';
export const fetchTranslations = BASE_URL + '/masterdata/translate';
export const fetchAllTranslations = BASE_URL + '/masterdata/translations';
