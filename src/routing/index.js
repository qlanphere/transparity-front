import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from "../contexts/auth";

export const LoggedOutRoute = ({ children }) => {
    const { currentUser } = useAuthContext();

    return (
        <Route> { 
            !currentUser
                ? children
                : <Redirect to='/home' /> }
        </Route> )
}


export const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuthContext();

    return (
        <Route> { 
            !!currentUser
                ? children
                : <Redirect to='/login' /> }
        </Route> )
}

