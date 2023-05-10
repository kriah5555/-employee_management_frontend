export const ENV_URL = window.location.origin;
export const REGEX_URL = '';
export const BASE_URL = ENV_URL + REGEX_URL;
export const LogoutLink = '';
export const PAGINATE_BY = 10;

//follow the below example to add your url endpoints

// EXAMPLE : export const getUserDetails = BASE_URL + 'account/get-user-details';

//add all your new urls from here onwards


//Translations API urls starts here
// export const getLangaugeList = BASE_URL + 'translations/get-all-languages';
// export const fetchTranslations = BASE_URL + 'translations/fetch-strings';
export const fetchAllTranslations = BASE_URL + 'translations/get-all-strings';