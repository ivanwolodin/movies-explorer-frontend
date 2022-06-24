import { Link } from "react-router-dom";

import "./Login.css";
import Logo from "../Logo/Logo";

function Login({ handleLogin }) {
  function handleClick() {
    handleLogin();
  }

  return (
    <div className="login popup">
      <div className="popup__cap">
        <Logo />
        <h2 className="login__title popup__title">Рады видеть!</h2>
      </div>
      <form>
        <label className="popup__textbox">
          Email
          <input className="popup__input" />
        </label>
        <label className="popup__textbox">
          Пароль
          <input className="popup__input" />
        </label>
        <Link className="link" to="/movies">
          <button className="popup__button" onClick={handleClick}>
            Войти
          </button>
        </Link>
      </form>
      <p className="popup__text">
        Еще не зарегистрированы?{" "}
        <Link className="link login__link popup__button_link" to="/register">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
