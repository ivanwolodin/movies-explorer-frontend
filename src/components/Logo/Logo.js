import "../Logo/Logo.css";
import logo from "../../images/logo.svg";

import {Link} from "react-router-dom";

function Logo() {
  return (
    <Link className="link profile__link" to="/">
      <img className="logo" src={logo} alt="лого" />
    </Link>
  );
}

export default Logo;
