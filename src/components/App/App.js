import React from "react";
// import {Switch} from 'react-router-dom';
import Main from "../Main/Main";
import './App.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";


function App() {
    return (
        <div className="app">
            <Header/>

            {/*<Switch>*/}
                {/*<Route path='/' exact>*/}
                {/*<Movies/>*/}
                {/*</Route>*/}

                {/*<Route path='/signup'>*/}
                {/*    <Main />*/}
                {/*</Route>*/}
                {/*<Route path='/signin' exact>*/}
                    <Main />
                {/*</Route>*/}
                {/*<Route path="*">*/}
                {/*    <Main />*/}
                {/*</Route>*/}
            {/*</Switch>*/}
            <Footer/>
        </div>
    );
}

export default App;
