import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./userTypes"
import axios from 'axios'

// define an action creator
export const fetchUserRequest = () => {
    return { 
        // type property defines an action
        type : FETCH_DATA_REQUEST,
    }
}
export const fetchUserSuccess = ( users ) => {
    return { 
        // type property defines an action
        type : FETCH_DATA_SUCCESS,
        // payload property in action delivers an extra information to reducer
        payload : users
    }
}
export const fetchUserFailure = ( errorMessage ) => {
    return { 
        // type property defines an action
        type : FETCH_DATA_FAILURE,
        // payload property in action delivers an extra information to reducer
        payload : errorMessage
    }
}

// define an action creator
export const fetchUser = () => {

    // thunk : allow action creator to return a function that is 
    // not pure, meaning a function with side effect
    return async (dispatch) => {
        dispatch(fetchUserRequest)
        try { 
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            const user = response.data
            if (user) dispatch(fetchUserSuccess(user))
        } catch(err) {
            dispatch(fetchUserFailure(err.message))
        }
    }
}