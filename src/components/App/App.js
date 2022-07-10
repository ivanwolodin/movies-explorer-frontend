import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";

import Main from "../Main/Main";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NavTab from "../NavTab/NavTab";

import { authorize, checkToken, register } from "../../utils/auth";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { userContext } from "../../context/CurrentUserContext";
import { MainApi } from "../../utils/MainApi";
import { MoviesApi } from "../../utils/MoviesApi";

import { filterFunction } from "../../utils/utilsFunctions";

const mainApi = new MainApi({
  url: "https://api.diploma.iwol.nomoredomains.xyz/",
});

// taken from web
export function useWindowDimension() {
  const [dimension, setDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      // console.log('***** debounced resize'); // See the cool difference in console
      setDimension([window.innerWidth, window.innerHeight]);
    }, 100); // 100ms
    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount
  return dimension;
}

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

// ***************************************************************************

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isPopupNavOpened, setPopupNavOpen] = React.useState(false);

  const [isContentLoaded, setContentLoaded] = useState(true);

  const [moviesToRender, setMoviesToRender] = useState(
    JSON.parse(localStorage.getItem("searchedMovies"))
      ? JSON.parse(localStorage.getItem("searchedMovies"))
      : []
  );

  const [isLoadingError, setLoadingError] = useState(false);

  // const [savedMoviesToRender, setSavedMoviesToRender] = useState(
  //   JSON.parse(localStorage.getItem("savedMovies"))
  //     ? JSON.parse(localStorage.getItem("savedMovies"))
  //     : {}
  // );

  // const [savedMoviesIds, setSavedMoviesIds] = useState(
  //   JSON.parse(localStorage.getItem("savedMoviesIds"))
  //     ? JSON.parse(localStorage.getItem("savedMoviesIds"))
  //     : {}
  // );
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  function handlePopupNav() {
    setPopupNavOpen(true);
  }

  function closeAllPopups() {
    setPopupNavOpen(false);
  }

  useEffect(() => {
    tokenCheck();
  }, [history]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            console.log(res);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log("Cannot check token");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (loggedIn) {
      mainApi.setAuthHeaders();
      mainApi
        .getSavedMovies()
        .then((res) => {
          if (res) {
            localStorage.setItem("savedMovies", JSON.stringify(res.movies));

            let savedMoviesIds = {};
            res.movies.forEach((movie) => {
              savedMoviesIds[movie.movieId] = movie._id;
            });
            localStorage.setItem(
              "savedMoviesIds",
              JSON.stringify(savedMoviesIds)
            );
          }
        })
        .catch((err) => {
          console.log("Cannot get liked movies");
          console.log(err);
        });
      // request to movies to get saved movies and then sotre them in localStorage

      // api
      //   .getInitialCards()
      //   .then((data) => {
      //     setCards(data.cards);
      //   })
      //   .catch((err) => {
      //     console.log("Cannot get data from server");
      //     console.log(err);
      //   });

      // api
      //   .getUserInfo()
      //   .then((data) => {
      //     setCurrentUser({
      //       name: data.data.name,
      //       about: data.data.about,
      //       avatarUrl: data.data.avatar,
      //       id: data.data._id,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log("Cannot get data from server");
      //     console.log(err);
      // });
    }
  }, [loggedIn]);

  function handleLogin(data) {
    authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        } else {
        }
      })
      .catch((err) => {
        console.log("Cannot authorize user");
        console.log(err);
      });
  }

  function handleRegistration(data) {
    register(data.email, data.password, data.name)
      .then((res) => {
        if (res.status !== 400 && res.status !== 401 && res.status !== 409) {
          history.push("/login");
        } else {
        }
      })
      .catch((err) => {
        console.log("Cannot register user");
        console.log(err);
      })
      .finally(() => {
        // setInfoToolTipPopupOpen(true);
      });
  }

  function handleLikeMovie(data) {
    mainApi
      .likeMovie(
        data.country,
        data.director,
        data.duration,
        data.year,
        data.description,
        data.image,
        data.trailerLink,
        data.nameRU,
        data.nameEN,
        data.thumbnail,
        data.movieId
      )
      .then((res) => {
        const oldEntries =
          JSON.parse(localStorage.getItem("savedMovies")) || [];
        oldEntries.push(res.movie);
        localStorage.setItem("savedMovies", JSON.stringify(oldEntries));
      })
      .catch((err) => {
        console.log("Cannot like movie");
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.clear();
    setLoggedIn(false);
    history.push("/register");
  }

  function handleSearch() {
    setContentLoaded(false);
    moviesApi
      .getAllMovies()
      .then((response) => {
        const res = response.filter(filterFunction);
        console.log(res);
        setMoviesToRender(res);
        localStorage.setItem("searchedMovies", JSON.stringify(res));
        setLoadingError(false);
      })
      .catch((err) => {
        console.log("Cannot get movies");
        console.log(err);
        setLoadingError(true);
      })
      .finally(setContentLoaded(true));
  }

  return (
    <userContext.Provider value={currentUser}>
      <div className="app">
        <>
          <Header loggedIn={loggedIn} onButtonClick={handlePopupNav} />
          <Switch>
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              // savedMoviesToRender={savedMoviesToRender}
              // savedMoviesIds={savedMoviesIds}

              // handleLikeMovie={handleLikeMovie}
              // handleDislikeMovie={handleDislikeMovie}

              handleSearch={handleSearch}
              isLoadingError={isLoadingError}
              isContentLoaded={isContentLoaded}
              moviesToRender={moviesToRender}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              // handleDislikeMovie={handleDislikeMovie}

              handleSearch={handleSearch}
              isLoadingError={isLoadingError}
              isContentLoaded={isContentLoaded}
              moviesToRender={moviesToRender}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              handleLogout={handleLogout}
            />
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/login" exact>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/register" exact>
              <Register handleRegister={handleRegistration} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
          <NavTab
            isPopupNavOpened={isPopupNavOpened}
            onClose={closeAllPopups}
          />
        </>
      </div>
    </userContext.Provider>
  );
}

export default App;
const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});
