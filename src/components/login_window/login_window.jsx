'use client';

import style from './login_window.module.css';
import { useState, useEffect} from 'react';
import Overlay from '@components/menu_overlay/overlay';
import { FaUserCircle } from 'react-icons/fa';

export default function LoginWindow() {
    const [isLogin, setIsLogin] = useState(true);
    const [warningTimeout, setWarningTimeout] = useState(null);
    const [warningText, setWarningText] = useState('');
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    function openLogin() {
        setIsLoginOpen(true);
    };

    function closeLogin() {
        setIsLoginOpen(false);
    }

    useEffect(() => {
        return () => {
            setWarningText('');
            warningTimeout && clearTimeout(warningTimeout);
        }
    }, [])

    async function submitRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget.form);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            const response = await res.text();
            const { result, message } = JSON.parse(response);

            console.log(res);
            if (!res.ok) {
                if (result === 'FAILED') {
                    showWarning(message);
                };
            }
        } catch (err) {
            console.log(err);
        }
    };

    async function submitLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget.form);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            const response = await res.json();

            if (!res.ok) {
                showWarning('Error during login. Please try again later or contact the support')
            }
            
            switch (response.result) {
                case "VALID":
                    showWarning('Logged in successfully');
                    break;
                case "INVALID":
                    showWarning('Invalid email or password');
                default:
            };
        } catch (err) {
            console.log(err);
            showWarning('Error during login. Please try again later or contact the support')
        }
    }

    function showWarning(text) {
        if (typeof text !== 'string') {
            return
        };
        setWarningText(text);
        const timeout = setTimeout(() => {
            setWarningText('');
        }, 5000);
        setWarningTimeout(timeout);
    };

    return (
        <div>
            <FaUserCircle className={`${style.userIcon}`} onClick={openLogin}/>
            <Overlay isActive={isLoginOpen} closeCallback={closeLogin} fadeDuration={0.3}>
                <div className={`${style.warning} ${warningText !== '' ? style.warningActive : ''}`}>
                    <span>{warningText}</span>
                </div>
                <div className={`${style.window} ${!isLogin ? style.signUp : ''}`}>
                    <div className={`${style.formContainer}`}>
                        <div className={`${style.form} ${style.login}`}>
                            <h2>Login</h2>
                            <form className={`${style.loginForm}`}>
                                <label htmlFor="loginEmail">Email</label>
                                <input type="email" id="loginEmail" name="email" required />
                                <label htmlFor="loginPassword">Password</label>
                                <input type="password" id="loginPassword" name="password" required />
                                <button type="submit" onClick={submitLogin}>Login</button>
                            </form>
                            <div>Don't have an account? <a href='#' onClick={(e) => {e.preventDefault(); setIsLogin(false)}}>Sign up</a></div>
                        </div>
                        <div className={`${style.form} ${style.register}`}>
                            <h2>Sign Up</h2>
                            <form className={`${style.registerForm}`} action='/api/register-user' method='POST'>
                                <label htmlFor="registerEmail">Email</label>
                                <input type="email" id="registerEmail" name="email" required />
                                <label htmlFor="registerUsername">Username</label>
                                <input type="text" id="registerUsername" name="username" required />
                                <label htmlFor="registerPassword">Password</label>
                                <input type="password" id="registerPassword" name="password" required />
                                <button type="submit" onClick={submitRegister}>Sign up</button>
                            </form>
                            <div>Already have an account? <a href='#' onClick={(e) => {e.preventDefault(); setIsLogin(true)}}>Login</a></div>
                        </div>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}