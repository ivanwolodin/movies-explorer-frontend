import { Link } from "react-router-dom";

import "../Logo/Logo.css";
import logo from "../../images/logo.svg";

function Logo() {
  return (
    <Link className="link profile__link" to="/">
      <img className="logo" src={logo} alt="лого" />
    </Link>
  );
}

export default Logo;
