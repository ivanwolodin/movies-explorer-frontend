import logo from "../../images/logo.svg";
import "./Header.css";
import LoginButtons from "../LoginButtons/LoginButtons";

function Header() {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="лого" />
        <LoginButtons />
      </header>
    </>
  );
}

export default Header;
