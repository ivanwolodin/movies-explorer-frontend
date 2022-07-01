import { Link } from "react-router-dom";

import "./Login.css";
import Logo from "../Logo/Logo";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ErrorClass = props.loginError
    ? "popup__errortext"
    : "popup__errortext_hidden";

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin({
      email,
      password,
    });
  }
  function handleChangeEmail(e) {
    const email = e.target.value;
    setEmail(email);
  }
  function handleChangePassword(e) {
    const password = e.target.value;
    setPassword(password);
  }

  return (
    <div className="login popup">
      <div className="popup__cap">
        <Logo />
        <h2 className="login__title popup__title">Рады видеть!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="popup__textbox">
          Email
          <input
            required
            type="text"
            minLength="2"
            maxLength="40"
            onChange={handleChangeEmail}
            className="popup__input"
          />
        </label>
        <label className="popup__textbox">
          Пароль
          <input
            type="password"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangePassword}
            className="popup__input"
          />
        </label>
        <p className={ErrorClass}>Что-то пошло не так</p>

        <button className="popup__button">Войти</button>
      </form>
      <p className="popup__text">
        <p>Еще не зарегистрированы?</p>
        <Link className="link login__link popup__button_link" to="/register">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
