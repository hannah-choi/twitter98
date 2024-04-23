import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ITweetService } from "./services/tweet";
import AllTweets from "./pages/AllTweets";
import UserTweets from "./pages/UserTweets";

type Props = {
    tweetService: ITweetService;
};

function App({ tweetService }: Props) {
    return (
        <div className='App'>
            <Header />
            <Navbar />
            <Switch>
                <main>
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
