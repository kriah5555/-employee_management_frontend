export const ENV_URL = 'https://api.test.indii-new.infanion.com/'
export const REGEX_URL = 'service/masterdata';
export const BASE_URL = ENV_URL + REGEX_URL;
export const LogoutLink = '';
export const PAGINATE_BY = 10;

//follow the below example to add your url endpoints

// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';

//add all your new urls from here onwards
export const EmployeeTypeApiUrl = BASE_URL + '/employee-types'
export const SectorApiUrl = BASE_URL + '/sectors'
export const FunctionApiUrl = BASE_URL + '/function-titles'
export const GroupFunctionApiUrl = BASE_URL + '/function-categories'
// export const SectorApiUrl = BASE_URL + '/sectors'

//Translations API urls starts here
// export const getLangaugeList = BASE_URL + 'translations/get-all-languages';
// export const fetchTranslations = BASE_URL + 'translations/fetch-strings';
export const fetchAllTranslations = BASE_URL + 'translations/get-all-strings';