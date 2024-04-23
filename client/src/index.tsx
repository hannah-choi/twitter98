import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TweetService from "./services/tweet";

const baseURL = process.env.REACT_APP_BASE_URL!;
const tweetService = new TweetService(baseURL);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App tweetService={tweetService} />
        </BrowserRouter>
    </React.StrictMode>
);
