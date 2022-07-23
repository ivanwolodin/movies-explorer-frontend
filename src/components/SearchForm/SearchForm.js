import React, { useState } from "react";

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import button_icon from "../../images/button_icon.svg";

function SearchForm(props) {
  // const regex = /^[A-Za-z0-9 -]*$/;
  const regex = "[A-Za-z0-9 -]+";

  const [moviesNameToSeacrh, setMoviesNameToSeacrh] = useState(
    !props.clearSearch ? localStorage.getItem("searchQuery") : ""
  );

  function handleChangeInputText(e) {
    setMoviesNameToSeacrh(e.target.value);
    localStorage.setItem("searchQuery", e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onClick();
  }

  return (
    <div className="searchform content_info">
      <form className="searchform__controller">
        <input
          pattern={regex}
          type="text"
          required
          onInvalid={(e) =>
            e.target.setCustomValidity("Нужно ввести ключевое слово")
          }
          onInput={(e) => e.target.setCustomValidity("")}
          className="searchform__text_input"
          placeholder="Фильм"
          onChange={handleChangeInputText}
          value={moviesNameToSeacrh}
        />
        <button
          type="submit"
          className="searchform__button"
          onClick={handleSubmit}
        >
          <img src={button_icon} alt="Arrow Icon" />
        </button>
      </form>
      <FilterCheckbox
        isShortMoviesCheckboxSet={props.isShortMoviesCheckboxSet}
        handleCheckbox={props.handleCheckbox}
      />
    </div>
  );
}

export default SearchForm;
