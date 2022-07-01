import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
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

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { userContext } from "../../context/CurrentUserContext";

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

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isPopupNavOpened, setPopupNavOpen] = React.useState(false);

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

  function handleLogout() {
    setLoggedIn(false);
  }

  function handleLogin() {
    setLoggedIn(true);
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
              loggedIn={loggedIn}
              component={Movies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
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
              <Register />
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
