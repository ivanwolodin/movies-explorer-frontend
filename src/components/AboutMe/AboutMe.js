import "./AboutMe.css";
import "../Main/Main.css";
import me from "../../images/Me.svg";

function AboutMe() {
  return (
    <div className="about_me content_info">
      <h2 className="section__title">Студент</h2>
      <div className="about_me__personal_info">
        <div className="about_me__text">
          <h3 className="about_me__name"> Виталий</h3>
          <p className="about_me__position">Фронтенд-разработчик, 30 лет</p>
          <p className="about_me__short_info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="about_me__social_networks">
            <a className="about_me__link" href="https://github.com/ivanwolodin">
              Facebook
            </a>
            <a className="about_me__link" href="https://github.com/ivanwolodin">
              {" "}
              Github
            </a>
          </p>
        </div>
        <img className="about_me__photo" src={me} alt="фото человека" />
      </div>
    </div>
  );
}

export default AboutMe;
