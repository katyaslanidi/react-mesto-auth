import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import headerLogo from '../images/Vector.svg';

function Header({ userEmail, handleSingOut }) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={headerLogo}
                alt="Логотип"
            />
            <Routes>
                <Route
                    path='/sing-in'
                    element={<Link to='/sing-up' className="header__link">Регистрация</Link>}
                />
                <Route
                    path='/sing-up'
                    element={<Link to='/sing-in' className="header__link">Войти</Link>}
                />
                <Route
                    path='/'
                    element={
                        <div className="header__container">
                            <p className="header__row">{userEmail}</p>
                            <p className="header__row header__row_sing-out" onClick={handleSingOut}>Выйти</p>
                        </div>
                    } 
                />
            </Routes>
        </header>
    );
}
export default Header;