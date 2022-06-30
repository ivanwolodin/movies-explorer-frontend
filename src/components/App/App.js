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
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isPopupNavOpened, setPopupNavOpen] = React.useState(false);

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
    <div className="app">
      <>
        <Header loggedIn={loggedIn} onButtonClick={handlePopupNav} />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route path="/saved-movies" exact>
            <SavedMovies />
          </Route>
          <Route path="/login" exact>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/profile" exact>
            <Profile handleLogout={handleLogout} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
        <NavTab isPopupNavOpened={isPopupNavOpened} onClose={closeAllPopups} />
      </>
    </div>
  );
}

export default App;
