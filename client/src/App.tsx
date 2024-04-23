import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className='App'>
            <Header />
            <Navbar />
            <Switch>
                <main>
                    <Route exact path='/'></Route>
                    <Route exact path='/:userid'></Route>
                </main>
            </Switch>
        </div>
    );
}

export default App;
