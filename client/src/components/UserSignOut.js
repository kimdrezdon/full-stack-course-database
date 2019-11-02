import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = (props) => {
    //sends a request to sign out the user and redirect to the course list
    props.context.actions.signOut();

    return ( 
        <Redirect to="/courses" />
    );
}
 
export default UserSignOut;