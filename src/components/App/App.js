import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";

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
import { MainApi } from "../../utils/MainApi.js";
import { MoviesApi } from "../../utils/MoviesApi.js";

import {
  filterFunction,
  handleSearchedMoviesLocalStorage,
  handleSearchedMoviesIdsLocalStorage,
} from "../../utils/utilsFunctions.js";

import {thresholdShortMovieDuration} from "../../utils/constants";

const mainApi = new MainApi({
  url: "https://api.diploma.iwol.nomoredomains.xyz/",
});
const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
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

  const [registerError, setRegisterError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [editError, setEditError] = React.useState("");

  const [isContentLoaded, setContentLoaded] = useState(true);

  const [allMovies, setAllMovies] = useState([]);

  const [isShortMoviesCheckboxSet, setShortMoviesCheckbox] = useState(
    JSON.parse(localStorage.getItem("isShortMoviesCheckboxSet"))
      ? JSON.parse(localStorage.getItem("isShortMoviesCheckboxSet"))
      : false
  );

  const [width, height] = useWindowDimension();
  const [cardsNumberToShow, setCardsNumberTOShow] = useState({
    numberToShow: 0,
    numberToUpload: 0,
  });

  const [searchedMovies, setSearchedMovies] = useState(
    JSON.parse(localStorage.getItem("searchedMovies"))
      ? JSON.parse(localStorage.getItem("searchedMovies"))
      : []
  );

  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies"))
      ? JSON.parse(localStorage.getItem("savedMovies"))
      : []
  );

  const [savedRenderMovies, setSavedRenderMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies"))
      ? JSON.parse(localStorage.getItem("savedMovies"))
      : []
  );

  const [isLoadingError, setLoadingError] = useState(false);

  const [savedMoviesIds, setSavedMoviesIds] = useState(
    JSON.parse(localStorage.getItem("savedMoviesIds"))
      ? JSON.parse(localStorage.getItem("savedMoviesIds"))
      : {}
  );
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  function adjustCardsNumberToWindowSize() {
    if (width > 1278) {
      setCardsNumberTOShow({ numberToShow: 4, numberToUpload: 4 });
    } else if (width <= 1278 && width > 968) {
      setCardsNumberTOShow({ numberToShow: 9, numberToUpload: 3 });
    } else if (width <= 968 && width > 613) {
      setCardsNumberTOShow({ numberToShow: 8, numberToUpload: 2 });
    } else if (width <= 613) {
      setCardsNumberTOShow({ numberToShow: 5, numberToUpload: 2 });
    }
  }

  useEffect(() => {
    adjustCardsNumberToWindowSize();
    setSearchedMovies(
      searchedMovies.slice(0, cardsNumberToShow["numberToShow"])
    );
  }, [width]);

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
            moviesApi
              .getAllMovies()
              .then((response) => {
                setAllMovies(response);
              })
              .catch((err) => {
                console.log("Cannot get movies");
                console.log(err);
                setLoadingError(true);
              });
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
            localStorage.setItem(
              "isShortMoviesCheckboxSet",
              JSON.stringify(isShortMoviesCheckboxSet)
            );

            let savedMoviesIds = {};
            res.movies.forEach((movie) => {
              savedMoviesIds[movie.movieId] = movie._id;
            });
            localStorage.setItem(
              "savedMoviesIds",
              JSON.stringify(savedMoviesIds)
            );
            setSavedMoviesIds(savedMoviesIds);
          }
        })
        .catch((err) => {
          console.log("Cannot get liked movies");
          console.log(err);
        });

      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
          });
        })
        .catch((err) => {
          console.log("Cannot get user data from server");
          console.log(err);
        });
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
          setLoginError("Не получилось авторизоваться..");
        }
      })
      .catch((err) => {
        alert("Не получилось авторизоваться")
        console.log("Cannot authorize user");
        console.log(err);
      });
  }

  function handleRegistration(data) {
    register(data.email, data.password, data.name)
      .then((res) => {
        if (res.status !== 400 && res.status !== 401 && res.status !== 409) {
          handleLogin({
            email: data.email,
            password: data.password,
          });
          history.push("/movies");
        } else {
          setRegisterError("Не удалось зарегистрироваться..");
        }
      })
      .catch((err) => {
        alert("Не получилось зарегистрироваться")
        console.log("Cannot register user");
        console.log(err);
      })
      .finally(() => {
        // setInfoToolTipPopupOpen(true);
      });
  }

  function handleCheckbox() {
    setShortMoviesCheckbox(!isShortMoviesCheckboxSet);
    localStorage.setItem(
      "isShortMoviesCheckboxSet",
      JSON.stringify(!isShortMoviesCheckboxSet)
    );
  }

  useEffect(() => {
    if (isShortMoviesCheckboxSet) {
      let newEntries = [];
      savedRenderMovies.forEach((elem) => {
        if (elem.duration <= thresholdShortMovieDuration) {
          newEntries.push(elem);
        }
      });
      setSavedRenderMovies(newEntries);

      newEntries = [];
      searchedMovies.forEach((elem) => {
        if (elem.duration <= thresholdShortMovieDuration) {
          newEntries.push(elem);
        }
      });
      setSearchedMovies(newEntries);
    } else {
      setSavedRenderMovies(
        JSON.parse(localStorage.getItem("savedMovies"))
          ? JSON.parse(localStorage.getItem("savedMovies"))
          : []
      );
      setSearchedMovies(
        JSON.parse(localStorage.getItem("searchedMovies"))
          ? JSON.parse(localStorage.getItem("searchedMovies"))
          : []
      );
    }
  }, [isShortMoviesCheckboxSet]);

  function handleLikeMovie(data) {
    const dd = {
      country: data.country || "nodata",
      director: data.director || "nodata",
      duration: data.duration || "nodata",
      year: data.year || "nodata",
      description: data.description || "nodata",
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      nameRU: data.nameRU || "nodata",
      nameEN: data.nameEN || "nodata",
      thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
      movieId: data.id,
    };
    mainApi
      .likeMovie(dd)
      .then((res) => {
        const newEntries = handleSearchedMoviesLocalStorage(res, false);
        setSavedMovies(newEntries);
        const newEntrieIds = handleSearchedMoviesIdsLocalStorage(
          data.id,
          res.movie._id,
          false
        );
        setSavedMoviesIds(newEntrieIds);
        setSavedRenderMovies([...savedRenderMovies, res.movie]);

      })
      .catch((err) => {
        alert("Не получилось поставить лайк")
        console.log("Cannot like movie");
        console.log(err);
      });
  }

  function handleDislikeMovie(movieId, _id) {
    mainApi
      .dislikeMovie(_id)
      .then((res) => {
        const newEntries = handleSearchedMoviesLocalStorage(res, true);

        let newSavedRenderMovies = [];
        savedRenderMovies.forEach((elem, index) => {
          if (res.data["_id"] !== elem["_id"]) {
            newSavedRenderMovies.push(elem);
          }
        });
        setSavedMovies(newEntries);
        setSavedRenderMovies(newSavedRenderMovies);
        const newEntrieIds = handleSearchedMoviesIdsLocalStorage(
          movieId,
          _id,
          true
        );
        setSavedMoviesIds(newEntrieIds);
      })
      .catch((err) => {
        alert("Не получилось убрать лайк")
        console.log("Cannot dislike movie");
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.clear();

    setLoginError("");
    setEditError("");
    setRegisterError("");
    setLoggedIn(false);
    setSearchedMovies([]);
    setSavedMovies([]);
    setSavedRenderMovies([]);
    setSavedMoviesIds({});
    setCurrentUser({});
    history.push("/register");
  }

  function handleSearch() {
    setContentLoaded(false);
    setLoadingError(false);

    try {
      const res = allMovies.filter(filterFunction);
      setSearchedMovies(res);
      localStorage.setItem("searchedMovies", JSON.stringify(res));
      if (res.length === 0) {
        setLoadingError(true);
        setContentLoaded(true);
      }
    } catch {
      setLoadingError(true);
      setContentLoaded(true);
    }
  }

  function handleSearchThroughLikedMovies() {
    const query = localStorage.getItem("searchQuery").toLowerCase();
    let response = [];
    savedMovies.forEach((item) => {
      if (item.nameRU.toLowerCase().includes(query)) {
        response.push(item);
      } else if (item.nameEN.toLowerCase().includes(query)) {
        response.push(item);
      }
    });
    setSavedRenderMovies(response);
  }

  function handleEditUser(data) {
    mainApi
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser({
          name: res.user.name,
          email: res.user.email,
        });
        setEditError("");
      })
      .catch((err) => {
        console.log("Cannot update user info");
        console.log(err);
        setEditError("Не удалось изменить данные..");
      });
  }

  function showMoreHandler() {
    setSearchedMovies([
      ...searchedMovies,
      ...JSON.parse(localStorage.getItem("searchedMovies")).slice(
        searchedMovies.length,
        searchedMovies.length + cardsNumberToShow["numberToUpload"]
      ),
    ]);
  }

  const location = useLocation();
  useEffect(() => {
    history.push(location.pathname);
  }, []);

  useEffect(() => {
    let timer1 = setTimeout(() => setContentLoaded(true), 0.3 * 1000);
    // this will clear Timeout
    return () => {
      clearTimeout(timer1);
    };
  }, [searchedMovies]);

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
              handleLikeMovie={handleLikeMovie}
              handleDislikeMovie={handleDislikeMovie}
              handleSearch={handleSearch}
              isLoadingError={isLoadingError}
              isContentLoaded={isContentLoaded}
              moviesToRender={searchedMovies}
              savedMovies={savedMovies}
              savedMoviesIds={savedMoviesIds}
              isShortMoviesCheckboxSet={isShortMoviesCheckboxSet}
              handleCheckbox={handleCheckbox}
              showMoreHandler={showMoreHandler}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              handleLikeMovie={handleLikeMovie}
              handleDislikeMovie={handleDislikeMovie}
              handleSearch={handleSearchThroughLikedMovies}
              isLoadingError={isLoadingError}
              isContentLoaded={isContentLoaded}
              moviesToRender={savedRenderMovies}
              savedMovies={savedMovies}
              savedMoviesIds={savedMoviesIds}
              isShortMoviesCheckboxSet={isShortMoviesCheckboxSet}
              handleCheckbox={handleCheckbox}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              handleLogout={handleLogout}
              userName={currentUser.name}
              userEmail={currentUser.email}
              handleEdit={handleEditUser}
              editError={editError}
            />
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/login" exact>
              <Login handleLogin={handleLogin} loginError={loginError} />
            </Route>
            <Route path="/register" exact>
              <Register
                handleRegister={handleRegistration}
                registerError={registerError}
              />
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
