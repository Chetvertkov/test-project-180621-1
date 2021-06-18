import {SAVE_RESPONSE_FROM_BACKEND} from "../types";

let initialState = 'Отправьте форму';

export const responseReducer = (state=initialState,action)=>{
    switch (action.type){
        case SAVE_RESPONSE_FROM_BACKEND:
            return action.payload
        default:
            return state;
    }
}