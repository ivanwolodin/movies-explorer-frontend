import { Link } from "react-router-dom";

import "./Profile.css";

function Profile({ handleLogout }) {
  function handleExit() {
    handleLogout();
  }

  return (
    <div className="profile popup profile__popup">
      <h2 className="profile__name">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__text_input">
          <label className="profile__name_label">Имя</label>
          <input className="profile__input" type="text" placeholder="Виталий" />
        </div>
        <div className="profile__text_input">
          <label className="profile__name_label">Email</label>
          <input
            className="profile__input"
            type="text"
            placeholder="pochta@yandex.ru"
          />
        </div>

        <button className="profile__button profile__editbutton">
          Редактировать
        </button>
        <Link className="link profile__link" to="/">
          <button
            onClick={handleExit}
            className="profile__button profile__exitbutton"
          >
            Выйти из аккаунта
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Profile;
