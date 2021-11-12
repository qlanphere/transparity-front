import React, { useState } from 'react';
import { useAuthContext } from "../../contexts/auth";
import { useHistory } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password'
import EmailIcon from '@mui/icons-material/Email'
import styles from './Login.module.css'
const Login = () => {
    const { login } = useAuthContext();
    const history = useHistory();

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const handleInput = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const formIncomplete = () => Object.values(formData).some(v => !v)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await login(formData)
            history.push('/room')
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} aria-label="login">
                <div className="mt-5">
                    <div className="m-2">
                        <EmailIcon color="primary"/>
                        <input className ={styles.input} type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email" />
                    </div>
                    <div className="m-2">
                        <PasswordIcon color="primary"/>
                        <input className ={styles.input} stype="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password" />
                    </div>
                    <div className="m-2">
                        <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} value="Login" />
                    </div>
                    <p>Not register yet? <a className={styles.a} href="/register">Create an Account</a></p>
                </div>

            </form>
            {error && <div id="error">{error}</div>}
            {loading && <div id="loading">Logging in . . .</div>}
        </>
    );
}

export default Login;