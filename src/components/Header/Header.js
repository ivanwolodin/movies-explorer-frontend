import { Link } from "react-router-dom";

import "./Header.css";
import LoginButtons from "../LoginButtons/LoginButtons";
import Logo from "../Logo/Logo";

function Header(props) {
  return (
    <>
      {props.loggedIn ? (
        <header className="header header_loggedin">
          <Logo />
          <nav className="header__navigation">
            <Link className="link" to="/movies">
              <p>Фильмы</p>
            </Link>
            <Link className="link" to="/saved-movies">
              <p>Сохраненные фильмы</p>
            </Link>
          </nav>
          <LoginButtons
            loggedIn={props.loggedIn}
            handlePopup={props.onButtonClick}
          />
        </header>
      ) : (
        <header className="header">
          <Logo />
          <LoginButtons loggedIn={props.loggedIn} />
        </header>
      )}
    </>
  );
}

export default Header;
