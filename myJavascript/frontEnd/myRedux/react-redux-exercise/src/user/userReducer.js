import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./userTypes"

const initalUserState = {
    loading : false, 
    users : [], 
    erorrMessage : ''
}

const userReducer = ( state = initalUserState, action ) => { 
    switch(action.type) {
        case FETCH_DATA_REQUEST :
            return { 
                ...state, 
                loading : true
            }

        case FETCH_DATA_SUCCESS :
            return { 
                ...state, 
                users : action.payload
            }
        case FETCH_DATA_FAILURE :
            return { 
                ...state, 
                errorMessage : action.payload
            }
        default : 
            return state
    }
}

export default userReducer