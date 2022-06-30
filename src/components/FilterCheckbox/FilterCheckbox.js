import "./FilterCheckbox.css";

function FilterCheckbox(props) {

  return (
    <div className="filtercheckbox">
      <p className="filtercheckbox__keyword">Короткометражки</p>
      <input
        className="filtercheckbox__checkbox"
        type="checkbox"
        id="switch"
        checked={props.isShortMoviesCheckboxSet}
        onChange={props.handleCheckbox}
      />
      <label
        className="filtercheckbox__label" htmlFor="switch"/>
    </div>
  );
}

export default FilterCheckbox;
