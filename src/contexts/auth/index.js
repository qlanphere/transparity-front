import React, { useState, useContext } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const host = 'https://quizioback.herokuapp.com/'
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

    const register = userData => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"},
                    mode: 'cors'
                }
                const { data } = await axios.post(`${host}/auth/register`, userData, options)
                if (data.err){
                    throw Error(data.err)
                }
                await login(userData);
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
                const { data } = await axios.post(`${host}/auth/login`, userData, options)
                if (!data.success) { 
                    throw new Error('Login not authorised');
                }
                localStorage.setItem("token", data.token);
                const user = jwt_decode(data.token);

                setCurrentUser(user);
                console.log(currentUser)
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
