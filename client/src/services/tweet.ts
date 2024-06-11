import { Tweet } from "../model/model";
import { IHttp } from "../network/http";

export interface ITweetService {
    getTweets: (username?: string) => Promise<Tweet[]>;
    writeTweet: (text: string, id: number) => Promise<Tweet>;
    deleteTweet: (tweetID: number) => Promise<void>;
    updateTweet: (tweetID: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements ITweetService {
    private http;

    constructor(http: IHttp) {
        this.http = http;
    }

    async getTweets(username?: string) {
        const query = username ? `?username=${username}` : "";
        return this.http.fetch(
            "/tweets" + query,
            {
                method: "GET"
            },
            localStorage.getItem("tweeterToken") || undefined
        );
    }

    async writeTweet(text: string, id: number) {
        return this.http.fetch(
            "/tweets",
            {
                method: "POST",
                body: JSON.stringify({
                    text,
                    id
                })
            },
            localStorage.getItem("tweeterToken") || undefined
        );
    }

    async deleteTweet(tweetID: number) {
        return this.http.fetch(
            `/tweets/${tweetID}`,
            {
                method: "DELETE"
            },
            localStorage.getItem("tweeterToken") || undefined
        );
    }

    async updateTweet(tweetID: number, text: string) {
        return this.http.fetch(
            `/tweets/${tweetID}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    tweetID,
                    text
                })
            },
            localStorage.getItem("tweeterToken") || undefined
        );
    }
}
