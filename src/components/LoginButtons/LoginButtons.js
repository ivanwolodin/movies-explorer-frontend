import { Link } from "react-router-dom";

import "../LoginButtons/LoginButtons.css";
import account_icon from "../../images/account_icon.svg";
import background_account_icon from "../../images/background_account_icon.svg";

function LoginButtons(props) {
  return (
    <>
      {props.loggedIn ? (
        <div className="loginbuttons loginbuttons_hide">
          <p className="loginbuttons__account_text">Аккаунт</p>
          <Link to="/profile">
            <div className="loginbuttons__icon">
              <img
                className="loginbuttons__background_account_icon"
                src={background_account_icon}
                alt="лого"
              />
              <img
                className="loginbuttons__account_icon"
                src={account_icon}
                alt="лого"
              />
            </div>
          </Link>

          <button onClick={props.handlePopup} className="loginbuttons__nav" />
        </div>
      ) : (
        <>
          <div className="loginbuttons">
            <Link to="/register">
              <button className="loginbuttons__registration__button">
                Регистрация
              </button>
            </Link>
            <Link to="/login">
              <button className="loginbuttons__button">Войти</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default LoginButtons;
