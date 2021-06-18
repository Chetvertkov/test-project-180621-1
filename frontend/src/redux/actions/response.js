import {SAVE_RESPONSE_FROM_BACKEND} from "../types";

export function setResponse(payload){
    return async dispatch =>{
        dispatch({type:SAVE_RESPONSE_FROM_BACKEND,payload:payload})
    }
}