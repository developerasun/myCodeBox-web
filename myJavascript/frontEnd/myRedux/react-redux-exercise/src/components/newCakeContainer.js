import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCake } from '../cake/cakeAction';

// useSelector also can be used instead of mapStateToProps, 
// which returns redux state information
const NewCakeContainer = () => {
    const [number, setNumber] = useState(1)
    // Access Redux store state by useSelector hook
    const numberOfCakes = useSelector((state) => state.cake.numberOfCakes) // takes an selector function

    // Access Redux store dispatch by useDispatch hook
    const dispatch = useDispatch()
    return ( 
        <div>
            <h2>Hooks : Number of cakes = {numberOfCakes}</h2>
            <input type={'text'} value={number} onChange={(e)=>setNumber(e.target.value)}/>
            <button onClick={()=>dispatch(buyCake(number))}>Hooks : Buy {number} Cake</button>
        </div>
    );
}

export default NewCakeContainer;