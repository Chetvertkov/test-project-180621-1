import {combineReducers} from "redux";

import {configurationReducer} from "./reducers/configurationReducer";
import {responseReducer} from "./reducers/responseReducer";


export const rootReducer = combineReducers({
    configuration: configurationReducer,
    response:responseReducer
});