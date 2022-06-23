import "./NotFound.css";
import { Link, useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  function handleClick() {
    history.goBack();
  }

  return (
    <div className="notfound popup">
      <h2 className="notfound__title">404</h2>
      <p className="notfound__description">Страница не найдена</p>
      <Link onClick={handleClick} className="notfound__button">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
