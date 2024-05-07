import { Tweet } from "../model/model";

export interface ITweetService {
    getTweets: (userid?: string) => Promise<Tweet[]>;
    writeTweet: (text: string) => Promise<Tweet>;
    deleteTweet: (tweetId: number) => Promise<void>;
    updateTweet: (tweetId: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements ITweetService {
    _url: string;

    constructor(url: string) {
        this._url = url;
    }

    async getTweets(userid?: string) {
        const query = userid ? `?userid=${userid}` : "";
        const res = await fetch(`${this._url}/tweets${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(data.message);
        }

        return data;
    }

    async writeTweet(text: string) {
        const res = await fetch(`${this._url}/tweets`, {
            method: "POST",
            body: JSON.stringify({
                text,
                userid: "lobo",
                url: "http://foo",
                nickname: "Lobo"
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();

        if (res.status !== 201) {
            throw new Error(data.message);
        }
        return data;
    }

    async deleteTweet(tweetId: number) {
        const res = await fetch(`${this._url}/tweets/${tweetId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (res.status !== 204) {
            throw new Error("Could not delete the tweet");
        }
    }

    async updateTweet(tweetId: number, text: string) {
        const res = await fetch(`${this._url}/tweets/${tweetId}`, {
            method: "PUT",
            body: JSON.stringify({
                text
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(data.message);
        }

        return data;
    }
}
