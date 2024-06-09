import moment from "moment";
import { Tweet } from "../model/schema";

let tweets: Tweet[] = [
    {
        tweetID: 1,
        text: "lorem ipsum",
        created: "21 Sun",
        nickname: "Lobo",
        username: "lobo",
        url: ""
    },
    {
        tweetID: 2,
        text: "sit dolor amet",
        created: "21 Sun",
        nickname: "Lobo",
        username: "lobo",
        url: ""
    },
    {
        tweetID: 3,
        text: "uno dos tres cuatro",
        created: "22 Sun",
        nickname: "Nana",
        username: "nana",
        url: ""
    }
];

export async function getAll() {
    return tweets;
}

export async function getByTweetId(tweetID: string) {
    return tweets.filter((tweet) => tweet.tweetID === parseInt(tweetID, 10));
}

export async function getAllByUsername(username: string) {
    return tweets.filter((tweet) => tweet.username === username);
}

export async function create(text: string, username: string, url: string, nickname: string) {
    const newTweet = {
        text,
        username,
        url,
        nickname,
        tweetID: Math.floor(Math.random() * 100),
        created: moment().startOf("hour").fromNow()
    };

    tweets = [newTweet, ...tweets];
    return newTweet;
}

export async function remove(tweetID: string) {
    tweets = tweets.filter((tweet) => tweet.tweetID !== parseInt(tweetID, 10));
    return;
}

export async function update(tweetID: string, text: string) {
    const tweet = tweets.find((tweet) => tweet.tweetID === parseInt(tweetID, 10));
    if (tweet) {
        tweet.text = text;
    }

    return tweet;
}
