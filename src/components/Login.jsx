function Login() {
    return (
        <div className="auth">
            <form className="auth__form">
                <h1 className="auth__title">Вход</h1>
                <input className="auth__input auth__input_email" placeholder="Email"></input>
                <input className="auth__input auth__input_password" placeholder="Пароль"></input>
                <button className="auth__button">Войти</button>
            </form>
        </div>
    );
}
export default Login;