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
    fetchingProject: false,
    addingProject: false,
    editingProject: false,
    deletingProject: false,
    project:[],
}

// -------- Reducer Function ---------
export const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_PROJECT_DATA:
            return {...state, fetchingProject: true}
        case FETCH_PROJECT_SUCCESS:
            return {...state, project: action.payload, fetchingProject: true}
        case FETCH_PROJECT_FAILURE:
            return {...state, fetchingProject: false}
        case ADD_PROJECT_DATA:
            return {...state, addingProject: true}
        case ADD_PROJECT_SUCCESS:
            return{...state, project: action.payload, addingProject: false}    
        case ADD_PROJECT_FAILURE:
             return {...state, addingProject: false}
        case EDIT_PROJECT_DATA:
            return{...state, editingProject: true}
        case EDIT_PROJECT_SUCCESS:
            return{...state, project: action.payload, editingProject: false}
        case EDIT_PROJECT_FAILURE:     
            return{...state, editingProject: false}
        case DELETE_PROJECT_DATA:
            return{...state, deletingProject: true}
        case DELETE_PROJECT_SUCCESS:
            return{...state, project: action.payload, deletingProject: true}
        case DELETE_PROJECT_FAILURE:
            return{...state, deletingProject:false}    
    default: 
        return state;
    }
}

