import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import button_icon from "../../images/button_icon.svg" ;
function SearchForm() {
    return (
        <div className="searchform content_info">
            <input type="text" className="searchform__text_input" placeholder="Фильм">

            </input>
            <button className="searchform__button"><img src={button_icon} alt="Arrow Icon"></img></button>
            <FilterCheckbox/>
        </div>
    );
}

export default SearchForm;
