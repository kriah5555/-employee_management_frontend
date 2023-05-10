
import {createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './userState/reducers';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
))

export default store;