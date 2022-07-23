import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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

import {
  bigScreenMoviesNumber,
  hugeScreenMoviesNumber,
  mediumScreenMoviesNumber,
  smallScreenMoviesNumber,
} from "../../utils/constants";

import {
  getValueFromLocalStorage,
  selectShortMovies,
} from "../../utils/utilsFunctions.js";

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

  const [allMovies, setAllMovies] = useState([]);

  const [registerError, setRegisterError] = React.useState(
    "Не получилось зарегистрироваться"
  );
  const [isRegistered, setIsRegistered] = React.useState(false);

  const [loginError, setLoginError] = React.useState(
    "Не получилось авторизоваться"
  );
  const [editError, setEditError] = React.useState("");
  const [isPopupError, setPopupError] = React.useState(false);

  const [isContentLoaded, setContentLoaded] = useState(true);

  const [isShortMoviesCheckboxSet, setShortMoviesCheckbox] = useState(
    getValueFromLocalStorage("isShortMoviesCheckboxSet", false)
  );

  const [width, height] = useWindowDimension();
  const [cardsNumberToShow, setCardsNumberTOShow] = useState({
    numberToShow: 0,
    numberToUpload: 0,
  });

  const [searchedMovies, setSearchedMovies] = useState(
    getValueFromLocalStorage("searchedMovies", [])
  );
  const [savedMovies, setSavedMovies] = useState(
    getValueFromLocalStorage("savedMovies", [])
  );

  const [isLoadingError, setLoadingError] = useState(false);

  const [savedMoviesIds, setSavedMoviesIds] = useState(
    getValueFromLocalStorage("savedMoviesIds", {})
  );
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const location = useLocation();

  function adjustCardsNumberToWindowSize() {
    if (width > 1278) {
      setCardsNumberTOShow(hugeScreenMoviesNumber);
    } else if (width <= 1278 && width > 968) {
      setCardsNumberTOShow(bigScreenMoviesNumber);
    } else if (width <= 968 && width > 613) {
      setCardsNumberTOShow(mediumScreenMoviesNumber);
    } else if (width <= 613) {
      setCardsNumberTOShow(smallScreenMoviesNumber);
    }
  }

  useEffect(() => {
    if (isPopupError) {
      setEditError("Не удалось изменить данные..");
    } else {
      setEditError("");
    }
  }, [isPopupError]);

  useEffect(() => {
    if (isShortMoviesCheckboxSet) {
      setSavedMovies(selectShortMovies(savedMovies));
      setSearchedMovies(
        selectShortMovies(searchedMovies).slice(
          0,
          parseInt(localStorage.getItem("numberToUpload"))
        )
      );
    } else {
      setSavedMovies(getValueFromLocalStorage("savedMovies", []));

      setSearchedMovies(
        getValueFromLocalStorage("searchedMovies", []).slice(
          0,
          parseInt(getValueFromLocalStorage("numberToUpload", 0))
        )
      );
    }
  }, [isShortMoviesCheckboxSet]);

  useEffect(() => {
    adjustCardsNumberToWindowSize();
    setSearchedMovies(
      searchedMovies.slice(0, cardsNumberToShow["numberToShow"])
    );
    setSavedMovies(savedMovies.slice(0, cardsNumberToShow["numberToShow"]));
  }, [width]);

  useEffect(() => {
    tokenCheck();
    history.push(location.pathname);
  }, [history]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log("Cannot check token");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (isRegistered) {
      setRegisterError("");
    } else {
      setRegisterError("Не удалось зарегистрироваться");
    }
  }, [isRegistered]);

  useEffect(() => {
    if (loggedIn) {
      adjustCardsNumberToWindowSize();
      setLoginError("");
      setRegisterError("");
      mainApi.setAuthHeaders();
      mainApi
        .getSavedMovies()
        .then((res) => {
          if (res) {
            localStorage.setItem("savedMovies", JSON.stringify(res.movies));
            setSavedMovies(res.movies);
            let savedMoviesIds = {};
            res.movies.forEach((movie) => {
              savedMoviesIds[movie.movieId] = movie._id;
            });
            localStorage.setItem(
              "savedMoviesIds",
              JSON.stringify(savedMoviesIds)
            );
            setSavedMoviesIds(savedMoviesIds);
            handleMoviesRendering();
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
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userName", data.name);
        })
        .catch((err) => {
          console.log("Cannot get user data from server");
          console.log(err);
        });

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
  }, [loggedIn]);

  useEffect(() => {
    handleMoviesRendering();
  }, []);

  function handleMoviesRendering() {
    if (isShortMoviesCheckboxSet) {
      setSearchedMovies(
        selectShortMovies(getValueFromLocalStorage("searchedMovies", [])).slice(
          0,
          parseInt(getValueFromLocalStorage("numberToUpload", 0))
        )
      );
      setSavedMovies(selectShortMovies(savedMovies));
    } else {
      setSearchedMovies(
        getValueFromLocalStorage("searchedMovies", []).slice(
          0,
          parseInt(getValueFromLocalStorage("numberToUpload", 0))
        )
      );
    }
  }

  function handlePopupNav() {
    setPopupNavOpen(true);
  }

  function closeAllPopups() {
    setPopupNavOpen(false);
  }

  function handleLogin(data) {
    authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
        } else {
          setLoginError(res.message);
        }
      })
      .catch((err) => {
        console.log("Cannot authorize user");
        setLoginError("Не получилось авторизоваться..");
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
          setRegisterError("");
          setIsRegistered(true);
          history.push("/movies");
        } else {
          setRegisterError("Не удалось зарегистрироваться..");
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

  function handleCheckbox() {
    setShortMoviesCheckbox(!isShortMoviesCheckboxSet);
    localStorage.setItem(
      "isShortMoviesCheckboxSet",
      JSON.stringify(!isShortMoviesCheckboxSet)
    );
  }

  function handleLikeMovie(data) {
    const dd = {
      country: data.country || "nodata",
      director: data.director || "nodata",
      duration: data.duration || "nodata",
      year: data.year || "nodata",
      description: data.description || "nodata",
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink || "www.google.com",
      nameRU: data.nameRU || "nodata",
      nameEN: data.nameEN || "nodata",
      thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
      movieId: data.id,
    };
    mainApi
      .likeMovie(dd)
      .then((res) => {
        const newEntries = handleSearchedMoviesLocalStorage(res, false);
        if (isShortMoviesCheckboxSet) {
          setSavedMovies(selectShortMovies(newEntries));
        } else {
          setSavedMovies(newEntries);
        }

        const newEntrieIds = handleSearchedMoviesIdsLocalStorage(
          data.id,
          res.movie._id,
          false
        );
        setSavedMoviesIds(newEntrieIds);
      })
      .catch((err) => {
        console.log("Cannot like movie");
        console.log(err);
      });
  }

  function handleDislikeMovie(movieId, _id) {
    mainApi
      .dislikeMovie(_id)
      .then((res) => {
        const newEntries = handleSearchedMoviesLocalStorage(res, true);
        if (isShortMoviesCheckboxSet) {
          setSavedMovies(selectShortMovies(newEntries));
        } else {
          setSavedMovies(newEntries);
        }
        const newEntrieIds = handleSearchedMoviesIdsLocalStorage(
          movieId,
          _id,
          true
        );
        setSavedMoviesIds(newEntrieIds);
      })
      .catch((err) => {
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
    setSavedMoviesIds({});
    setCurrentUser({});
    history.push("/register");
  }

  function handleSearch() {
    adjustCardsNumberToWindowSize();
    setContentLoaded(false);
    setLoadingError(false);

    try {
      const res = allMovies.filter(filterFunction);
      localStorage.setItem("searchedMovies", JSON.stringify(res));
      if (res.length === 0) {
        setLoadingError(true);
        setContentLoaded(true);
        return;
      }

      if (isShortMoviesCheckboxSet) {
        const newEntries = selectShortMovies(res);
        if (newEntries.length === 0){
          setLoadingError(true);
        }
        setSearchedMovies(
          newEntries.slice(0, cardsNumberToShow["numberToUpload"])
        );
      } else {
        setSearchedMovies(res.slice(0, cardsNumberToShow["numberToUpload"]));
      }

      localStorage.setItem(
        "numberToUpload",
        cardsNumberToShow["numberToUpload"]
      );
    } catch {
      setLoadingError(true);
      setContentLoaded(true);
    }
  }

  function handleSearchThroughLikedMovies() {
    setContentLoaded(false);
    const query = localStorage.getItem("searchQuery");

    if (query === "") {
      if (isShortMoviesCheckboxSet) {
        setSavedMovies(
          selectShortMovies(getValueFromLocalStorage("savedMovies", []))
        );
      } else {
        setSavedMovies(getValueFromLocalStorage("savedMovies", []));
      }

      return;
    }

    let response = [];

    getValueFromLocalStorage("savedMovies", []).forEach((item) => {
      if (item.nameRU.toLowerCase().includes(query)) {
        response.push(item);
      } else if (item.nameEN.toLowerCase().includes(query)) {
        response.push(item);
      }
    });

    if (response.length === 0) {
      setLoadingError(true);
      setContentLoaded(true);
    } else {
      setLoadingError(false);
      setContentLoaded(false);
    }

    if (isShortMoviesCheckboxSet) {
      const shortMovies = selectShortMovies(response)
      if (shortMovies.length === 0){
        setLoadingError(true);
      }
      setSavedMovies(shortMovies);
    } else {
      setSavedMovies(response);
    }
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
        setPopupError(false);
      })
      .catch((err) => {
        console.log("Cannot update user info");
        console.log(err);
        setPopupError(true);
        setEditError(err);
      });
  }

  function showMoreHandler() {
    if (isShortMoviesCheckboxSet){
      setSearchedMovies(selectShortMovies(JSON.parse(localStorage.getItem("searchedMovies"))));
      localStorage.setItem(
        "numberToUpload",
        selectShortMovies(JSON.parse(localStorage.getItem("searchedMovies"))).length
      );
    }
    else{
      setSearchedMovies([
        ...searchedMovies,
        ...JSON.parse(localStorage.getItem("searchedMovies")).slice(
          searchedMovies.length,
          searchedMovies.length + cardsNumberToShow["numberToUpload"]
        ),
      ]);
      localStorage.setItem(
        "numberToUpload",
        searchedMovies.length + cardsNumberToShow["numberToUpload"]
      );
    }


  }

  useEffect(() => {
    let timer1 = setTimeout(() => setContentLoaded(true), 0.3 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [searchedMovies, savedMovies]);

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
              savedMovies={JSON.parse(localStorage.getItem("savedMovies"))}
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
              moviesToRender={savedMovies}
              savedMovies={JSON.parse(localStorage.getItem("savedMovies"))}
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
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Login handleLogin={handleLogin} loginError={loginError} />
              )}
            </Route>
            <Route path="/register" exact>
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Register
                  handleRegister={handleRegistration}
                  registerError={registerError}
                />
              )}
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
