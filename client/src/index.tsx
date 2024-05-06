import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TweetService from "./services/tweet";
import AuthService, { AuthErrorEventBus } from "./services/auth";
import { AuthProvider } from "./context/Auth";

const baseURL = process.env.REACT_APP_BASE_URL!;
const tweetService = new TweetService(baseURL);
const authService = new AuthService();
const authErrorEventBus = new AuthErrorEventBus();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
                <App tweetService={tweetService} />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
