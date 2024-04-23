import { Tweet } from "../model/model";
import moment from "moment";

export interface ITweetService {
    getTweets: (nickname?: string) => Promise<Tweet[]>;
    writeTweet: (text: string) => Promise<Tweet>;
    deleteTweet: (tweetId: number) => Promise<void>;
    updateTweet: (tweetId: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements ITweetService {
    _url: string;

    constructor(url: string) {
        this._url = url;
    }

    tweets: Tweet[] = [
        {
            id: 1,
            text: "lorem ipsum",
            created: "21 Sun",
            nickname: "Lobo",
            userid: "lobo",
            url: ""
        },
        {
            id: 2,
            text: "sit dolor amet",
            created: "21 Sun",
            nickname: "Lobo",
            userid: "lobo",
            url: ""
        },
        {
            id: 3,
            text: "uno dos tres cuatro",
            created: "22 Sun",
            nickname: "Nana",
            userid: "nana",
            url: ""
        }
    ];

    async getTweets(nickname?: string) {
        return nickname ? this.tweets.filter((tweet) => tweet.nickname === nickname) : this.tweets;
    }

    async writeTweet(text: string) {
        const newTweet = {
            id: Math.random(),
            created: moment().startOf("hour").fromNow(),
            nickname: "Lobo",
            userid: "lobo",
            text
        };
        this.tweets.push(newTweet);
        return newTweet;
    }

    async deleteTweet(tweetId: number) {
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    }

    async updateTweet(tweetId: number, text: string) {
        const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
        if (!tweet) {
            throw new Error(`Cannot find matching tweet with id ${tweetId}`);
        }
        tweet.text = text;
        return tweet;
    }
}
