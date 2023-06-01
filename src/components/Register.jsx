import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = userData;
        handleRegister(email, password);
    }

    return (
        <div className="auth">
            <form
                className="auth__form"
                onSubmit={handleSubmit}
            >
                <h1 className="auth__title">Регистрация</h1>
                <input
                    className="auth__input auth__input_email"
                    id="data-email-input"
                    name="email"
                    type="email"
                    required
                    minLength="2"
                    maxLength="40"
                    placeholder="Email"
                    onChange={handleChange}
                    value={userData.email}
                />
                <input
                    className="auth__input auth__input_password"
                    id='data-password-input'
                    type="password"
                    name="password"
                    required
                    minLength="2"
                    maxLength="200"
                    placeholder="Пароль"
                    autoComplete="on"
                    onChange={handleChange}
                    value={userData.password}
                />
                <button
                    className="auth__button"
                    type="submit"
                >Зарегистироваться</button>
                <Link to='/sing-in' className="auth__link">
                    Уже зарегистрированы? Войти
                </Link>
            </form>
        </div>
    );
}
export default Register;