// -------- Import Actions --------


//--------- Initial State ----------
const initialState = {}

// -------- Reducer Function ---------
export const reducer = (state = initialState, action) => {
    switch(action.type){
        case BLANK_CASE:
        return {}
    default: 
        return state;
    }
}
