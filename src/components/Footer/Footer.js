import "./Footer.css";
import me from "../../images/Me.svg";

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__title">
        {" "}
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info">
        <p className="footer__year">&copy; 2020</p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link"
              target="_blank"
              href="https://practicum.yandex.ru/"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              target="_blank"
              href="https://github.com/ivanwolodin"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              target="_blank"
              href="https://facebook.com"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
