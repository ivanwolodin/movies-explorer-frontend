import { Link, NavLink } from "react-router-dom";

import "../NavTab/NavTab.css";
import LoginButtons from "../LoginButtons/LoginButtons";

function NavTab(props) {
  const isPopupOpen = props.isPopupNavOpened ? "navtab_opened" : "";

  return (
    <div className={`navtab ${isPopupOpen}`}>
      <button onClick={props.onClose} className="navtab__close_button" />
      <nav className="navtab__elements">
        <NavLink to="/" onClick={props.onClose} className="navtab__link link">
          Главная
        </NavLink>
        <NavLink
          activeClassName="navtab__link_active"
          to="/movies"
          onClick={props.onClose}
          className="navtab__link link"
        >
          Фильмы
        </NavLink>
        <NavLink
          activeClassName="navtab__link_active"
          to="/saved-movies"
          onClick={props.onClose}
          className="navtab__link link"
        >
          Сохраненные фильмы
        </NavLink>
        <Link
          to="/profile"
          onClick={props.onClose}
          className="navtab__link link"
        >
          <LoginButtons
            loggedIn={true}
            isNavTab={true}
            isPopupOpen={isPopupOpen}
          />
        </Link>
      </nav>
    </div>
  );
}

export default NavTab;
