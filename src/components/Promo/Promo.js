import "./Promo.css";
import intro_image from "../../images/intro_image.svg";

function Promo() {
  return (
    <div className="promo">
      <div className="promo__intro">
        <div className="promo__info">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__teaser">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className="promo__button">Узнать больше</button>
        </div>
        <img
          className="intro__image"
          src={intro_image}
          alt="Нейтральная картинка"
        />
      </div>
    </div>
  );
}

export default Promo;
