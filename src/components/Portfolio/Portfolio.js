import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio content_info">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__projects_list">
        <li className="portfolio__project">
          <p className="portfolio__item">Статичный сайт</p>
          <a href="#">
            <img src={arrow} alt="стрелочка" />
          </a>
        </li>
        <li className="portfolio__project">
          <p className="portfolio__item"> Адаптивный сайт</p>
          <a href="#">
            <img src={arrow} alt="стрелочка" />
          </a>
        </li>
        <li className="portfolio__project">
          <p className="portfolio__item">Одностраничное приложение</p>
          <a href="#">
            <img src={arrow} alt="стрелочка" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
