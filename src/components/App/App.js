import React from "react";
import { Redirect, Route, Switch, Router } from "react-router-dom";
import Main from "../Main/Main";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  return (
    <div className="app">
      <>
        <Header />
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
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </>
    </div>
  );
}

export default App;
