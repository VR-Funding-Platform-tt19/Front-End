// -------- Import Actions --------
import {
    FETCH_PROJECT_DATA,
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_FAILURE,
    ADD_PROJECT_DATA,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    EDIT_PROJECT_DATA,
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_FAILURE,
    DELETE_PROJECT_DATA,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
} from '../Actions/fetchProjectAction'

//--------- Initial State ----------
const initialState = {
    isLoading: false, 
    projectData:[],
    error: false,
}

// -------- Reducer Function ---------
export const reducer = (state = initialState, action) => {
    switch(action.type){
        
        case FETCH_PROJECT_DATA:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        case FETCH_PROJECT_SUCCESS:
            return {
                    ...state, 
                    projectData: action.payload,
                    isLoading: false
                };

        case FETCH_PROJECT_FAILURE:
            return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                };

        case ADD_PROJECT_DATA:
            return {
                ...state, 
                isLoading: true
            };

        case ADD_PROJECT_SUCCESS:
            return{
                ...state,
                projectData: action.payload,
                isLoading: false
            };

        case ADD_PROJECT_FAILURE:
             return {
                    ...state, 
                    isLoading: false,
                    error: action.payload
                };

        case EDIT_PROJECT_DATA:
            return{
                    ...state, 
                    isLoading: true
                };

        case EDIT_PROJECT_SUCCESS:
            return{
                    ...state,
                    projectData: action.payload,
                    isLoading: false
                };

        case EDIT_PROJECT_FAILURE:     
            return{
                    ...state,
                    isLoading: false,
                    error: action.payload
                };

        case DELETE_PROJECT_DATA:
            return{
                    ...state, 
                    isLoading: true
                };

        case DELETE_PROJECT_SUCCESS:
            return{
                    ...state,
                    projectData: action.payload, 
                    isLoading: false
                };

        case DELETE_PROJECT_FAILURE:
            return{
                    ...state,
                    isLoading:false,
                    error:action.payload
                };    
    default: 
        return state;
    }
}

