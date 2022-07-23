import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Profile.css";

import { emailRegEx, nameRegEx } from "../../utils/constants";

function Profile({ handleLogout, handleEdit, userName, userEmail, editError }) {
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [name, setName] = useState(localStorage.getItem("userName"));

  const [valueChanged, setValueChanged] = useState(false);

  const [isDisabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(editError);
  const [notificationStatus, setNotificationStatus] = useState(
    "popup__errortext_hidden"
  );

  const [inactiveButtonClass, setInactiveButtonClass] = useState(
    "popup__button_disabled profile__button_disabled"
  );

  function handleExit() {
    handleLogout();
  }

  function handleChangeEmail(e) {
    const email = e.target.value;
    localStorage.setItem("userEmail", email);
    setEmail(email);
  }
  function handleChangeName(e) {
    const name = e.target.value;
    localStorage.setItem("userName", name);
    setName(name);
  }

  function checkForm() {
    setDisabled(true);
    setInactiveButtonClass("popup__button_disabled profile__button_disabled");
    if (email === "") {
      setEmail(localStorage.getItem("userEmail"));
    }

    if (name === "") {
      setName(localStorage.getItem("userName"));
    }

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
    setDisabled(true);
    setInactiveButtonClass("popup__button_disabled profile__button_disabled");
    setValueChanged(!valueChanged);
  }

  useEffect(() => {
    if (editError !== "") {
      setErrorMsg("Что-то пошло не так");
    } else {
      setErrorMsg("Данные изменены");
    }
  }, [editError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
      setNotificationStatus("popup__errortext_hidden");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [valueChanged]);

  return (
    <div className="profile popup profile__popup">
      <h2 className="profile__name">{`Привет, ${userName}!`}</h2>
      <form className="profile__form">
        <div className="profile__text_input">
          <label className="profile__name_label">Имя</label>
          <input
            className="profile__input"
            type="text"
            value={name || localStorage.getItem("userName")}
            onChange={handleChangeName}
          />
        </div>
        <div className="profile__text_input">
          <label className="profile__name_label">Email</label>
          <input
            className="profile__input"
            type="text"
            value={email || localStorage.getItem("userEmail")}
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
