import "../NavTab/NavTab.css";
import LoginButtons from "../LoginButtons/LoginButtons";
import background_account_icon from "../../images/background_account_icon.svg";
import account_icon from "../../images/account_icon.svg";

function NavTab(props) {
    const isPopupOpen = props.isPopupNavOpened ? "navtab_opened" : "";

    return (
        <div className={`navtab ${isPopupOpen}`}>
            <button onClick={props.onClose} className="navtab__close_button"></button>
            <nav className="navtab__elements">
                <a className="navtab__link">Главная</a>
                <a className="navtab__link">Фильмы</a>
                <a className="navtab__link">Сохраненные фильмы</a>
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
            </nav>
        </div>

    );
}

export default NavTab;
