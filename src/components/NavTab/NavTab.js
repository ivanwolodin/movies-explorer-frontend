import { Link } from "react-router-dom";

import "../NavTab/NavTab.css";
import background_account_icon from "../../images/background_account_icon.svg";
import account_icon from "../../images/account_icon.svg";

function NavTab(props) {
  const isPopupOpen = props.isPopupNavOpened ? "navtab_opened" : "";

  return (
    <div className={`navtab ${isPopupOpen}`}>
      <button onClick={props.onClose} className="navtab__close_button"></button>
      <nav className="navtab__elements">
        <Link to="/" onClick={props.onClose} className="navtab__link link">
          Главная
        </Link>
        <Link
          to="/movies"
          onClick={props.onClose}
          className="navtab__link link"
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          onClick={props.onClose}
          className="navtab__link link"
        >
          Сохраненные фильмы
        </Link>
        <Link
          to="/profile"
          onClick={props.onClose}
          className="navtab__link link"
        >
          <div className={`loginbuttons loginbuttons_center ${isPopupOpen}`}>
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
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default NavTab;
