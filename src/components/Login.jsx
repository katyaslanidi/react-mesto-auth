import React, { useState } from "react";

function Login({ handleAuthorize }) {

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
        handleAuthorize(email, password);
    }
    return (
        <div className="auth">
            <form
                className="auth__form"
                onSubmit={handleSubmit}
            >
                <h1 className="auth__title">Вход</h1>
                <input
                    className="auth__input auth__input_email"
                    placeholder="Email"
                    id="data-email-input"
                    name="email"
                    type="email"
                    required
                    minLength="2"
                    maxLength="40"
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
                >Войти</button>
            </form>
        </div>
    );
}
export default Login;