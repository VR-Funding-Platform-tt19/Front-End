import React from 'react'
import axios from 'axios'

//FETCHING EXPORTS
export const FETCH_PROJECT_DATA = 'FETCH_PROJECT_DATA'
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS'
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE'

//ADDING EXPORTS
export const ADD_PROJECT_DATA = 'ADD_PROJECT_DATA'
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS'
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE'

//EDITING EXPORTS
export const EDIT_PROJECT_DATA = 'EDIT_PROJECT_DATA'
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS'
export const EDIT_PROJECT_FAILURE = 'EDIT_PROJECT_FAILURE'


//DELETING EXPORTS
export const DELETE_PROJECT_DATA = 'DELETE_PROJECT_DATA'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'


export const fetchProject = (props) =>{
    return dispatch =>{
        dispatch({type: FETCH_PROJECT_DATA});
        axios.get('projectURL.com')
        .then(response=>{
            dispatch({type: FETCH_PROJECT_SUCCESS, payload:response.data})
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR', error)
            dispatch({type: FETCH_PROJECT_FAILURE, payload:error})
        })
    }
}

export const addProject = (props) =>{
    return dispatch =>{
        dispatch({type: ADD_PROJECT_DATA})
        axios.get('projectURL.com')
        .then(response=>{
            dispatch({type: ADD_PROJECT_SUCCESS, payload: response.data})
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR', error)
            dispatch({type: ADD_PROJECT_FAILURE, payload:error})
        })
    }
}

export const editProject = (props) =>{
    return dispatch =>{
        dispatch({type: EDIT_PROJECT_DATA})
        axios.get('projectURL.com')
        .then(response=>{
            dispatch({type: EDIT_PROJECT_SUCCESS, payload: response.data})
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR', error)
            dispatch({type: EDIT_PROJECT_FAILURE, payload:error})
        })
    }
}


export const deleteProject = (props) =>{
    return dispatch =>{
        dispatch({type: DELETE_PROJECT_DATA})
        axios.get('projectURL.com')
        .then(response=>{
            dispatch({type: DELETE_PROJECT_SUCCESS, payload: response.data})
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR', error)
            dispatch({type: DELETE_PROJECT_FAILURE, payload:error})
        })
    }
}
