import { BUY_CAKE } from "./cakeTypes"

// define an action creator
export const buyCake = (number = 1) => {
    return { 
        // type property defines an action
        type : BUY_CAKE,
        // payload property in action delivers an extra information to reducer
        payload : number
    }
}