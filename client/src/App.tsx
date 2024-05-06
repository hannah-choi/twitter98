import React from "react";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ITweetService } from "./services/tweet";
import AllTweets from "./pages/AllTweets";
import UserTweets from "./pages/UserTweets";
import classNames from "classnames";
import styles from "./App.module.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";

type Props = {
    tweetService: ITweetService;
};

function App({ tweetService }: Props) {
    return (
        <div className={classNames(styles.app, "window")}>
            <Header title='Twitter 98' />
            <Navbar />
            <Switch>
                <main className={styles.main}>
                    <Route exact path='/'>
                        <AllTweets tweetService={tweetService} />
                    </Route>
                    <Route exact path='/:userid'>
                        <UserTweets tweetService={tweetService} />
                    </Route>
                </main>
            </Switch>
        </div>
    );
}

export default App;
