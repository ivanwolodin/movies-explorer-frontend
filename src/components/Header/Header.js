import { NavLink } from "react-router-dom";

import "./Header.css";
import LoginButtons from "../LoginButtons/LoginButtons";
import Logo from "../Logo/Logo";

function Header(props) {
  console.log(props.loggedIn);
  return (
    <>
      {props.loggedIn ? (
        <header className="header header_loggedin">
          <Logo />
          <nav className="header__navigation">
            <NavLink
              className="link"
              activeStyle={{ fontWeight: 500 }}
              to="/movies"
            >
              <p>Фильмы</p>
            </NavLink>
            <NavLink
              className="link"
              activeStyle={{ fontWeight: 500 }}
              to="/saved-movies"
            >
              <p>Сохраненные фильмы</p>
            </NavLink>
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
