import "./Register.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login popup">
      <div className="popup__cap">
        <Logo />
        <h2 className="login__title popup__title">Добро пожаловать!</h2>
      </div>
      <form>
        <label className="popup__textbox">
          Имя
          <input className="popup__input" />
        </label>
        <label className="popup__textbox">
          Email
          <input className="popup__input" />
        </label>
        <label className="popup__textbox">
          Пароль
          <input className="popup__input" />
        </label>
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
