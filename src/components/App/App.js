import React from "react";
import {Redirect, Route, Switch, Router} from 'react-router-dom'
import Main from "../Main/Main";
import './App.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";


function App() {
    return (
        <div className='app'>
            <>
                <Header/>
                <Switch>
                    <Route path='/' exact>
                        <Main/>
                    </Route>
                    <Route path='/movies' exact>
                        <Movies/>
                    </Route>
                </Switch>
                <Footer/>
            </>
        </div>
    );
}

export default App;
