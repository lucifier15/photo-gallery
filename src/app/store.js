import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import mainReducer from './reducers/mainReducer';

//store
export default createStore(mainReducer,applyMiddleware(thunk));