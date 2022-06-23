import logo from "../../images/logo.svg";
import "./Header.css";
import LoginButtons from "../LoginButtons/LoginButtons";
import Logo from "../Logo/Logo";

function Header() {
  return (
    <>
      <header className="header">
        <Logo />
        <LoginButtons />
      </header>
    </>
  );
}

export default Header;
