import { Tweet } from "../model/model";
import moment from "moment";

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
            nickname: "Ashcona",
            userid: "orangejuice1234",
            url: ""
        },
        {
            id: 3,
            text: "uno dos tres cuatro",
            created: "22 Sun",
            nickname: "Nana",
            userid: "nana",
            url: ""
        },
        {
            id: 4,
            text: "Just a perfect day. Drink sangria in a park, And then later When it gets dark we go home.",
            created: "22 Sun",
            nickname: "Miguel",
            userid: "miguel_1234",
            url: ""
        },
        {
            id: 5,
            text: "미안해 솔직하지 못한 내가 지금 이 순간이 꿈이라면 살며시 너에게로 다가와 모든걸 고백할텐데",
            created: "22 Sun",
            nickname: "세일러문",
            userid: "sailor_1234",
            url: ""
        }
    ];

    async getTweets(userid?: string) {
        return userid ? this.tweets.filter((tweet) => tweet.userid === userid) : this.tweets;
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
