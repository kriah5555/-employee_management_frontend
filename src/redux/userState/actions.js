import * as actionTypes from './actionTypes';

    export const authStart = () => {
        return {
            type : actionTypes.AUTH_START
        }
    }

    export const authSuccess = (wpayload) => {
        return {
            type  : actionTypes.AUTH_SUCCESS,
            payload : {
                token : wpayload.token,
                user_id : wpayload.user_id,
                active_customer : wpayload.active_customer,
                active_language : wpayload.active_language,
                total_customer : wpayload.total_customer,
                role : wpayload.role,
                first_name : wpayload.first_name,
                active_customer_name : wpayload.active_customer_name,
            },
        }
    }

    export const authFail = error => {
        return {
            type  : actionTypes.AUTH_FAIL,
            error : error,
        }
    }

    export const resetWindowData = () => {
        window.token = null;
        window.uid = null;
        window.active_language = null;
        window.active_customer = null;
        window.total_customer = null;
        window.role = null;
        window.first_name = null;
        window.active_customer_name = null;
    }

    export const authInit = () => {
        return dispatch => {
            dispatch(authStart());
            //fetch the local variables used in the application from backend.
            const payload = {
                token : window.token,
                user_id : window.uid,
                active_language : window.active_language,
                active_customer : window.active_customer,
                total_customer : window.total_customer,
                role : window.role,
                first_name : window.first_name,
                active_customer_name : window.active_customer_name
            }
            dispatch(resetWindowData);
            dispatch(authSuccess(payload))

        }
    }

    export const updateActiveCustomer = (customer_id, active_customer_name) => {
        return {
            type : actionTypes.UPDATE_ACTIVE_CUSTOMER,
            payload : {
                active_customer : customer_id,
                active_customer_name : active_customer_name
            }
        }
    }

    export const updateActiveCustomerState = (customer_id, active_customer_name) => {
        return dispatch => {
            dispatch(updateActiveCustomer(customer_id, active_customer_name))
        }
    }

    export const updateActiveLanguage = (language) => {
        return {
            type : actionTypes.UPDATE_ACTIVE_LANGUAGE,
            payload : {
                active_language : language,
            }
        }
    }

    export const updateDispatchActiveLanguage = (language) => {
        return dispatch => {
            dispatch(updateActiveLanguage(language));
            let path = window.location.pathname;
            let replaced_path = "";
            if(path == "/"){
                replaced_path = language;
            }else{
                let regex = /(en\/|nl\/|fr\/)/g;
                let langPath = '/' + language + path;
                replaced_path =  (path.match(regex)) ? path.replace(regex, language + '/') : langPath; 
            }
            window.location.replace(replaced_path);
        }
    }
