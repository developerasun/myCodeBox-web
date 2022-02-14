import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../user/userAction';

const UserContainer = ({fetchUser, userData}) => {
    useEffect(()=>{
        fetchUser()
    }, [fetchUser])
    return ( 
        <div>
            {userData.loading && <div>loading ...</div>}
            {userData.errorMessage && <div>{userData.errorMessage}</div>}
            {(!userData.loading && !userData.errorMessage) && <div>{userData.users.map((user)=>{ return <p key={Math.random()}>{user.name}</p>})}</div>}
        </div>
     );
}

// mapping Redux state to React(props) App
const mapStateToProps = state => {
    return { 
        // get user state from Root state
        userData : state.user
    }
}

// mapping Redux dispatch state to React(props) App
const mapDispatchToProps = dispatch => {
    return {
        fetchUser : () => dispatch(fetchUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);