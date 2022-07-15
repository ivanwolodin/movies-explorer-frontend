import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Profile.css";

// import { emailRegEx, nameRegEx } from "../../utils/constants";

function Profile({ handleLogout, handleEdit, userName, userEmail, editError }) {
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState(userName);

  const [isDisabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("Что-то пошло не так");
  const [notificationStatus, setNotificationStatus] = useState(
    "popup__errortext_hidden"
  );

  const [inactiveButtonClass, setInactiveButtonClass] = useState(
    "popup__button_disabled"
  );

  function handleExit() {
    handleLogout();
  }

  function handleChangeEmail(e) {
    const email = e.target.value;
    setEmail(email);
  }
  function handleChangeName(e) {
    const name = e.target.value;
    setName(name);
  }

  function checkForm() {
    const emailRegEx =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const nameRegEx = /([A-Za-zА-яая]+(['|\-|\s]?[A-Za-zА-яая]+)*)+/g;

    setDisabled(true);
    setInactiveButtonClass("popup__button_disabled");

    if (!emailRegEx.test(email)) {
      return;
    } else if (!nameRegEx.test(name)) {
      return;
    }

    if (name !== userName || email !== userEmail) {
      setDisabled(false);
      setInactiveButtonClass("");
    }
  }

  useEffect(() => {
    checkForm();
  }, [email, name]);

  function handleEditProfile(e) {
    e.preventDefault();
    handleEdit({
      email,
      name,
    });

    setNotificationStatus("popup__errortext");
    if (editError) {
      setErrorMsg(editError);
      
    }
    else{
      setErrorMsg("Данные изменены"); 
    }
  }

  return (
    <div className="profile popup profile__popup">
      <h2 className="profile__name">{`Привет, ${userName}!`}</h2>
      <form className="profile__form">
        <div className="profile__text_input">
          <label className="profile__name_label">Имя</label>
          <input
            className="profile__input"
            type="text"
            placeholder={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="profile__text_input">
          <label className="profile__name_label">Email</label>
          <input
            className="profile__input"
            type="text"
            placeholder={email}
            onChange={handleChangeEmail}
          />
        </div>

        <label className={notificationStatus}>{errorMsg}</label>
        <button
          className={`profile__button profile__editbutton ${inactiveButtonClass}`}
          disabled={isDisabled}
          onClick={handleEditProfile}
        >
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
