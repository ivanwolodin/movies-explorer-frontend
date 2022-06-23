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
            <p>Фильмы</p>
            <p>Сохраненные фильмы</p>
          </nav>
          <LoginButtons loggedIn={props.loggedIn} />
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
