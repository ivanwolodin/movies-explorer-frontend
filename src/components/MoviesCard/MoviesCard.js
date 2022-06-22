import "./MoviesCard.css"
import movie_image from "../../images/sample_movie.svg" ;
import like_button from "../../images/like_button.svg"

function MoviesCard({title}) {
    return (
        <div className="moviescard">
            <img className="moviescard__image" src={movie_image} alt="превью фильма" />
            <div className="moviescard__info">
                <p className="moviescard__name">{title}</p>
                <img className="moviescard__likebutton" src={like_button} alt="кнопка лайка" />
            </div>
            <p className="moviescard__duration">1ч42м</p>
        </div>
    );
}

export default MoviesCard