import "../LoginButtons/LoginButtons.css";
import account_icon from "../../images/account_icon.svg";
import background_account_icon from "../../images/background_account_icon.svg";

function LoginButtons(props) {
  return (
    <>
      {props.loggedIn ? (
        <div className="loginbuttons">
          <p className="loginbuttons__account_text">Аккаунт</p>
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
          <button
            onClick={props.handlePopup}
            className="loginbuttons__nav"
          ></button>
        </div>
      ) : (
        <>
          <div className="loginbuttons">
            <button className="loginbuttons__registration__button">
              Регистрация
            </button>
            <button className="loginbuttons__button">Войти</button>
          </div>
        </>
      )}
    </>
  );
}

export default LoginButtons;
