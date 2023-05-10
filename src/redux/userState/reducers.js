import * as actionTypes from './actionTypes';
import {updateObject} from '../utility';

const initialState = {
    token : null,
    error : null,
    loading : false,
    user_id : null,
    active_language : null,
    active_customer : null,
    total_customer : null,
    first_name : null,
    role : null,
    active_customer_name : null, 
}

const authStart = (state, action) => {
    return updateObject(state, {
        error : null,
        loading : true,
        user_id : null,
        active_language : null,
        active_customer : null,
        total_customer : null,
        role : null,
        active_customer_name : null, 
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token : action.payload.token,
        error : null,
        loading : false,
        user_id :  action.payload.user_id,
        active_language : action.payload.active_language,
        active_customer : action.payload.active_customer,
        total_customer : action.payload.total_customer,
        role : action.payload.role,
        first_name : action.payload.first_name,
        active_customer_name : action.payload.active_customer_name, 
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error : action.error,
        loading : false,
    })
}

const authChangeActiveCustomerState = (state, action) => {
    document.getElementById('active-customer-name').innerText = action.payload.active_customer_name;
    return updateObject(state, {
        active_customer : action.payload.active_customer,
        active_customer_name : action.payload.active_customer_name,
    })
}

const updateActiveLanguageState = (state, action) => {
    return updateObject(state, {
        active_language : action.payload.active_language,
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL : return authFail(state, action);
        case actionTypes.UPDATE_ACTIVE_CUSTOMER : return authChangeActiveCustomerState(state, action);
        case actionTypes.UPDATE_ACTIVE_LANGUAGE : return updateActiveLanguageState(state, action);
        default : 
            return state;
    } 
}

export default reducer;