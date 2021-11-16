import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from "../contexts/auth";

export const LoggedOutRoute = ({ children }) => {
    const { currentUser } = useAuthContext();
    console.log("currentUser", currentUser)

    return (
        <Route> { 
            !!currentUser
                ? children
                : <Redirect to='/home' /> }
        </Route> )
}

export const PrivateUserRoute = ({ children }) => {
    const { currentUser } = useAuthContext();

    return (
        <Route> { 
            currentUser.sub.user == 'user'
                ? children
                : <Redirect to='/home' /> }
        </Route> )
}


export const PrivateCharityRoute = ({ children }) => {
    const { currentUser } = useAuthContext();

    return (
        <Route> { 
            currentUser.sub.user == 'charity'
                ? children
                : <Redirect to='/home' /> }
        </Route> )
}

