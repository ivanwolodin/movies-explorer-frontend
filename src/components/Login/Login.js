import "./Login.css";
import Logo from "../Logo/Logo";

function Login() {
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
        <button className="popup__button">Войти</button>
      </form>
      <p className="popup__text">Еще не зарегистрированы? Регистрация</p>
    </div>
  );
}

export default Login;
