import { createStore, combineReducers, applyMiddleware } from "redux";
import groupReducer from './reducers/group';
// import photo from './reducers/photo';

export default createStore(combineReducers({groupReducer}),{});