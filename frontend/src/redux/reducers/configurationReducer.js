import {SAVE_CONFIG_FROM_BACKEND} from "../types";

let initialState = {

};

export const configurationReducer = (state=initialState,action)=>{
    switch (action.type){
        case SAVE_CONFIG_FROM_BACKEND:
            return action.payload
        default:
            return state;
    }
}