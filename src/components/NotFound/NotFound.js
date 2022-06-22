import "./NotFound.css";
import arrow from "../../images/arrow.svg";

function NotFound() {
  return (
    <div className="notfound">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__description">Страница не найдена</p>
      <button className="notfound__button">Назад</button>
    </div>
  );
}

export default NotFound;
