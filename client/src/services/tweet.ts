import { Tweet } from "../model/model";
import { IHttp } from "../network/http";

export interface ITweetService {
    getTweets: (userid?: string) => Promise<Tweet[]>;
    writeTweet: (text: string) => Promise<Tweet>;
    deleteTweet: (tweetId: number) => Promise<void>;
    updateTweet: (tweetId: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements ITweetService {
    private http;

    constructor(http: IHttp) {
        this.http = http;
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
