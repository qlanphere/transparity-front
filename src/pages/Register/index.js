import React, { useState, useContext } from 'react';
import { useAuthContext } from "../../contexts/auth";
import { useHistory } from "react-router-dom";
import { AccountCircle } from '@mui/icons-material'
import PasswordIcon from '@mui/icons-material/Password'
import EmailIcon from '@mui/icons-material/Email'
import styles from './Register.module.css'
import './Register.css'
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Register = () => {
    const { register, login } = useAuthContext();
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(true)
    const [charity, setCharity] = useState(false)

    const handleInput = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const formIncomplete = () => Object.values(formData).some(v => !v) || passwordNoMatch();
    const passwordNoMatch = () => formData.password !== formData.passwordConfirmation;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await register(formData, user)
            history.push('/login')
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }

    function handleUser() {
        if (charity) {
            setUser(true)
            setCharity(false)
        } else return
    }
    function handleCharity() {
        if (user) {
            setCharity(true)
            setUser(false)
        } else return
    }

    return (
        <>
            <h1 className="register-title">Register</h1>
            <form className="register-form" onSubmit={handleSubmit} aria-label="register">
                <div className="form-fields-container">
                    <div className="p-2">
                        <AccountCircle />
                        <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleInput} placeholder="name" />
                    </div>
                    <div className="p-2">
                        <EmailIcon />
                        <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email" />
                    </div>
                    <div className="p-2">
                        <PasswordIcon />
                        <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password" />
                    </div>
                    <div className="p-2">
                        <PasswordIcon />
                        <input className={styles.input} type="password" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleInput} placeholder="Confirm Password" />
                        <div className="box">
                            <span>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={user} onChange={handleUser} name="user" />
                                    }
                                    label="User"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={charity} onChange={handleCharity} name="charity" />
                                    }
                                    label="Charity"
                                />

                            </span>
                        </div>
                    </div>
                    <Button type="submit" variant="contained" size="large" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} >{user ? "Create User Account" : "Create Charity Account"}</Button>
                </div>

            </form>
            {error && <div id="error">{error}</div>}
            {loading && <div id="loading">Creating account . . .</div>}
        </>
    );

}

export default Register