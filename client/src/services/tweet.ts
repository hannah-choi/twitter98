import { Tweet } from "../model/model";

export interface ITweetService {
    getTweets: (userid?: string) => Promise<Tweet[]>;
    writeTweet: (text: string) => Promise<Tweet>;
    deleteTweet: (tweetId: number) => Promise<void>;
    updateTweet: (tweetId: number, text: string) => Promise<Tweet>;
}

class Http {
    baseURL;

    constructor() {
        this.baseURL = process.env.REACT_APP_BASE_URL!;
    }

    async fetch(url: string, config: RequestInit) {
        try {
            const res = await fetch(`${this.baseURL}/tweets${url}`, {
                ...config,
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) {
                throw new Error("response not ok");
            }
            if (res.status === 204) {
                return;
            }

            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
}

export default class TweetService implements ITweetService {
    private http;

    constructor() {
        this.http = new Http();
    }

    async getTweets(userid?: string) {
        const query = userid ? `?userid=${userid}` : "";
        return this.http.fetch(query, {
            method: "GET"
        });
    }

    async writeTweet(text: string) {
        return this.http.fetch("", {
            method: "POST",
            body: JSON.stringify({
                text,
                userid: "lobo",
                url: "http://foo",
                nickname: "Lobo"
            })
        });
    }

    async deleteTweet(tweetId: number) {
        return this.http.fetch(`/${tweetId}`, {
            method: "DELETE"
        });
    }

    async updateTweet(tweetId: number, text: string) {
        return this.http.fetch(`/${tweetId}`, {
            method: "PUT",
            body: JSON.stringify({
                text
            })
        });
    }
}
