import "./FilterCheckbox.css"

function FilterCheckbox() {
    return (
        <div className="filtercheckbox">
            <p className="filtercheckbox__keyword">Короткометражки</p>
            <input className="filtercheckbox__checkbox" type="checkbox" id="switch"/>
            <label className="filtercheckbox__label" htmlFor="switch"></label>
        </div>
);
}

export default FilterCheckbox;
