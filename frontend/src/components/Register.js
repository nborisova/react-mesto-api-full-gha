import React, { useState } from "react";
import logo from '../images/header-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from './Auth';
import InfoTooltip from './InfoTooltip';

const Register = () => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const [registrationStatus, setRegistrationStatus] = React.useState('');
    const [registrationStatusText, setRegistrationStatusText] = React.useState('');

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

        auth.register(formValue.email, formValue.password)
        .then(() => {
            setRegistrationStatusText('Вы успешно зарегистрировались!');
            setRegistrationStatus('success');
        })
        .catch((err) => {
            setRegistrationStatusText('Что-то пошло не так! Попробуйте ещё раз.');
            setRegistrationStatus('fail');
        });
    }

    const resetTooltipStatus = () => {
        setRegistrationStatus('');
        setRegistrationStatusText('');
    }

    return (
        <>
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип Место"/>
                <Link to="/sign-in" className="header__link">Войти</Link>
            </header>
            <div>
                <form className="popup__register-form" onSubmit={handleSubmit} noValidate>
                    <h2 className="popup__title popup__title_type_auth">Регистрация</h2>
                    <input id="email-input" className="popup__field popup__field_type_auth" type="email" name="email"
                    value={formValue.email} onChange={handleChange} placeholder="Email" maxLength="40" minLength="2" required/>
                    <span className="popup__field-error"></span>
                    <input id="password-input" className="popup__field popup__field_type_auth" type="password" name="password"
                    value={formValue.password} onChange={handleChange} placeholder="Пароль" maxLength="200" minLength="2" required/>
                    <span className="popup__field-error"></span>
                    <button className="popup__submit-button popup__submit-button_type_auth" onSubmit={handleSubmit} type="submit">
                        Зарегистрироваться
                    </button>
                    <Link to="/sign-in" className="popup__signin-text">
                        Уже зарегистрированы? Войти
                    </Link>
                </form>
            </div>
            <InfoTooltip status={registrationStatus} text={registrationStatusText} onClose={resetTooltipStatus}/>
        </>
    )
}

export default Register;