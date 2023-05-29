import * as React from "react";
import { Link } from "react-router-dom";

function Register() {

    return (
        <div className="auth">
            <form className="auth__form">
                <h1 className="auth__title">Регистрация</h1>
                <input className="auth__input auth__input_email" placeholder="Email"></input>
                <input className="auth__input auth__input_password" placeholder="Пароль"></input>
                <button className="auth__button">Зарегистироваться</button>
                <Link to='/sign-in' className="auth__link">
                    Уже зарегистрированы? Войти
                </Link>
            </form>
        </div>
    );
}
export default Register;