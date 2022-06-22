import React from "react";
import { Redirect, Route, Switch, Router } from "react-router-dom";
import Main from "../Main/Main";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

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
        </Switch>
        <Footer />
      </>
    </div>
  );
}

export default App;
