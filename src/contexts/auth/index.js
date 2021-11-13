import React, { useState, useContext } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const host = 'https://transparity.herokuapp.com'
const cors = require('cors')

const AuthContext = React.createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(getCurrentUser());

    function getCurrentUser() {
        let user
        let token = localStorage.getItem("token");
        if(token){ 
            user = jwt_decode(token)
        }
        return user
    }

    const register = (userData, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"},
                    mode: 'cors'
                }
                console.log(userData)
                const { data } = await axios.post(`${host}/register/${user ? 'user':'charity'}`, userData, options)
                if (data.err){
                    throw Error(data.err)
                }
                resolve('Registration successful')
            } catch (err) {
                reject(`Registration Error: ${err}`);
            }
        })
    }

    const login = userData => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"},
                    mode: 'cors'
                }
                console.log(userData)
                const { data } = await axios.post(`${host}/login/`, userData, options)
                console.log(data)
                if (!data) { 
                    throw new Error('Login not authorised');
                }
                localStorage.setItem("token", data.access_token);
                const user = jwt_decode(data.access_token);

                setCurrentUser(user);
                resolve('Login successful')
            } catch (err) {
                reject(`Login Error: ${err}`);
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        setCurrentUser(null);
    }

    const auth = { register, login, logout, currentUser }

    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}
