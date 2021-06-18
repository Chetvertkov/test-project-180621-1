import {SAVE_CONFIG_FROM_BACKEND} from "../types";


export function setConfiguration(configuration){
    return async dispatch =>{
        dispatch({type:SAVE_CONFIG_FROM_BACKEND,payload:configuration})
    }
}