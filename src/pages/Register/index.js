import React, { useState, useContext } from 'react';
import { useAuthContext } from "../../contexts/auth";
import { useHistory } from "react-router-dom";
import { AccountCircle } from '@mui/icons-material'
import PasswordIcon from '@mui/icons-material/Password'
import EmailIcon from '@mui/icons-material/Email'
import styles from './Register.module.css'

const Register = () => {
    const { register, login } = useAuthContext();
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const handleInput = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const formIncomplete = () => Object.values(formData).some(v => !v) || passwordNoMatch();
    const passwordNoMatch = () => formData.password !== formData.passwordConfirmation;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await register(formData)
            await login(formData)
            history.push('/room')
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} aria-label="register">
                <div className="m-5">
                    <div className="m-2">
                        <AccountCircle color="primary"/>
                        <input className={styles.input} type="text" name="username" value={formData.username} onChange={handleInput} placeholder="Username" />
                    </div>
                    <div  className="m-2">
                        <EmailIcon color="primary"/>
                        <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email" />
                    </div>
                    <div className="m-2">
                        <PasswordIcon color="primary" />
                        <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password" />
                    </div>
                    <div className="m-2">
                        <PasswordIcon color="primary" />
                        <input className={styles.input} type="password" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleInput} placeholder="Confirm Password" />
                    </div>
                    <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} value="Create Account" />
                </div>
            </form>
            {error && <div id="error">{error}</div>}
            {loading && <div id="loading">Creating account . . .</div>}
        </>
    );

}

export default Register