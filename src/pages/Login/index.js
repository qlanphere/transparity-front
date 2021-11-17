import React, { useState } from 'react';
import { useAuthContext } from "../../contexts/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css'
import './Login.css'
import Footer from '../../components/Footer';

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
            
            history.push('/home')
            
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }
    return (
        <>
            <h1 className="login-page-title">Login</h1>
            <form className="login-form" onSubmit={handleSubmit} aria-label="login">
                <div className="p-2">
                    <div className="p-2">
                        {/* <EmailIcon color="primary" /> */}
                        <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email" />
                    </div>
                    <div className="p-2">
                        {/* <PasswordIcon color="primary" /> */}
                        <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password" />
                    </div>
                    <div className="p-2">
                        <input id="login-button" type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} value="Login" />
                    </div>
                    <p className="p-2">Not registered yet? <a className={styles.a} href="/register">Create an Account</a></p>
                </div>

            </form>
            {error && <div id="error">{error}</div>}
            {loading && <div id="loading">Logging in . . .</div>}
            <Footer />
        </>
    );
}

export default Login;