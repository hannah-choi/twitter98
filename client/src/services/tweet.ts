import { Tweet } from "../model/model";
import { IHttp } from "../network/http";
import { TokenStorage } from "../store/token";

export interface ITweetService {
    getTweets: (username?: string) => Promise<Tweet[]>;
    writeTweet: (text: string, id: number) => Promise<Tweet>;
    deleteTweet: (tweetID: number) => Promise<void>;
    updateTweet: (tweetID: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements ITweetService {
    private http;
    private tokenStorage;

    constructor(http: IHttp, tokenStorage: TokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getTweets(username?: string) {
        const query = username ? `?username=${username}` : "";
        return this.http.fetch("/tweets" + query, {
            method: "GET",
            headers: this.getHeaders()
        });
    }

    async writeTweet(text: string, id: number) {
        return this.http.fetch("/tweets", {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify({
                text,
                id
            })
        });
    }

    async deleteTweet(tweetID: number) {
        return this.http.fetch(`/tweets/${tweetID}`, {
            method: "DELETE",
            headers: this.getHeaders()
        });
    }

    async updateTweet(tweetID: number, text: string) {
        return this.http.fetch(`/tweets/${tweetID}`, {
            method: "PUT",
            body: JSON.stringify({
                tweetID,
                text
            }),
            headers: this.getHeaders()
        });
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`
        };
    }
}
