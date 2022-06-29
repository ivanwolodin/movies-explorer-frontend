import React, { useState } from "react";

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import button_icon from "../../images/button_icon.svg";

import { MoviesApi } from "../../utils/MoviesApi";

function SearchForm(props) {
  // const regex = /^[A-Za-z0-9 -]*$/;
  const regex = "[A-Za-z0-9 -]+";

  const [moviesNameToSeacrh, setMoviesNameToSeacrh] = useState("");

  function handleChangeInputText(e) {
    setMoviesNameToSeacrh(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if(regex.test(moviesNameToSeacrh) && moviesNameToSeacrh!=="") {
    //   console.log("Sending")
    //   props.onClick();
    // } else {
    //   console.log("Нужно ввести ключевое слово");
    // }
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
        />
        <button
          type="submit"
          className="searchform__button"
          // onClick={handleSubmit}
        >
          <img src={button_icon} alt="Arrow Icon" />
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
