import React, { useState } from "react";
import logo from '../images/header-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from './Auth';

const Login = ({ handleLogin }) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        auth.login(formValue.email, formValue.password)
        .then(({ token }) => {
            if (token) {
                setFormValue({email: '', password: ''});
                auth.getUserEmail(token)
                .then(email => handleLogin(email))
                .then(() => {
                    localStorage.setItem('token', token)
                })
                .then(() => navigate('/', {replace: true}))
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <>
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип Место"/>
                <Link to="/sign-up" className="header__link">Регистрация</Link>
            </header>
            <div>
                <form className="popup__register-form" onSubmit={handleSubmit} noValidate>
                    <h2 className="popup__title popup__title_type_auth">Вход</h2>
                    <input id="email-input" className="popup__field popup__field_type_auth" type="email" name="email"
                     value={formValue.email} onChange={handleChange} placeholder="Email" maxLength="40" minLength="2" required/>
                    <span className="popup__field-error name-input-error"></span>
                    <input id="password-input" className="popup__field popup__field_type_auth" type="password" name="password"
                     value={formValue.password} onChange={handleChange} placeholder="Пароль" maxLength="200" minLength="2" required/>
                    <span className="popup__field-error job-input-error"></span>
                    <button onSubmit={handleSubmit} className="popup__submit-button popup__submit-button_type_auth" type="submit">
                        Войти
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;