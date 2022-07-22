import React from "react";
import { useState, useEffect } from "react";

import "./Register.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

import { emailRegEx, nameRegEx } from "../../utils/constants";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [valueChanged, setValueChanged] = useState(false);

  const [errorClassMessage, setErrorClassMessage] = useState(
    props.rigisterError ? "popup__errortext" : "popup__errortext_hidden"
  );

  const [isDisabled, setDisabled] = useState(true);
  const [inactiveButtonClass, setInactiveButtonClass] = useState(
    "popup__button_disabled"
  );

  const [errorMsg, setErrorMsg] = useState("Что-то пошло не так");

  function checkForm() {
    setErrorClassMessage("popup__errortext");
    setDisabled(true);
    setInactiveButtonClass("popup__button_disabled");

    if (!emailRegEx.test(email)) {
      setErrorMsg("Email невалиден");
      return;
    } else if (!password) {
      setErrorMsg("Пароль не может быть пустым");
      return;
    } else if (!nameRegEx.test(name)) {
      setErrorMsg("Имя невалидно");
      return;
    } else {
      setErrorClassMessage("popup__errortext_hidden");
      setDisabled(false);
      setInactiveButtonClass("");
      return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister({
      email,
      password,
      name,
    });
    if (props.registerError) {
      setErrorClassMessage("popup__errortext");
      setErrorMsg(props.registerError);
    }
    setValueChanged(!valueChanged);
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

  useEffect(() => {
    checkForm();
  }, [name, email, password]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
      setErrorClassMessage("popup__errortext_hidden");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [valueChanged]);

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
        <p className={errorClassMessage}>{errorMsg}</p>
        <button
          className={`popup__button register__button ${inactiveButtonClass}`}
          disabled={isDisabled}
        >
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
