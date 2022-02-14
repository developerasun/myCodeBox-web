import { BUY_ICECREAM } from "./iceCreamTypes"

const initialIceCreamState = { 
    numberOfIceCream : 15
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM : 
            return {
                ...state,
                numberOfIceCream : state.numberOfIceCream - 1
            }
        default : 
            return state
    }
}

export default iceCreamReducer