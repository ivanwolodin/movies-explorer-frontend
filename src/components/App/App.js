import React from "react";
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
