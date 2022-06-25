import { Link } from "react-router-dom";

import "../NavTab/NavTab.css";
import LoginButtons from "../LoginButtons/LoginButtons";

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
          <LoginButtons loggedIn={true} isNavTab={true} isPopupOpen={isPopupOpen}></LoginButtons>
        </Link>
      </nav>
    </div>
  );
}

export default NavTab;
