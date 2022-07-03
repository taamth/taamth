/* file nay dung de luu va chua data */ 
import {legacy_createStore as createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //dung de log ra nhung cai actions/stories
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = [thunk];
if(process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export const store = createStore (rootReducer, applyMiddleware(...middleware));
/*
applyMiddleware(...middleware): nghia la clone lai nhung middleware load vao 
*/