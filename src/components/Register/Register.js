import React from "react";
import { useState } from "react";

import "./Register.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ErrorClass = props.rigisterError
    ? "popup__errortext"
    : "popup__errortext_hidden";

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister({
      email,
      password,
      name,
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
  function handleChangeName(e) {
    const name = e.target.value;
    setName(name);
  }

  return (
    <div className="login popup">
      <div className="popup__cap">
        <Logo />
        <h2 className="login__title popup__title">Добро пожаловать!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="popup__textbox">
          Имя
          <input
            type="text"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            className="popup__input"
          />
        </label>
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
        <button className="popup__button register__button">
          Зарегистрироваться
        </button>
      </form>
      <p className="popup__text">
        <p>Уже зарегистрированы?</p>
        <Link className="link popup__button_link" to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
