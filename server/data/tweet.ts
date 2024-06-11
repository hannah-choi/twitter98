import moment from "moment";
import { Tweet } from "../model/schema";
import * as UserDB from "./user";

let tweets: Pick<Tweet, "tweetID" | "text" | "created" | "id">[] = [
    {
        tweetID: 1,
        text: "lorem ipsum",
        created: "21 Sun",
        id: 1
    },
    {
        tweetID: 2,
        text: "sit dolor amet",
        created: "21 Sun",
        id: 1
    },
    {
        tweetID: 3,
        text: "uno dos tres cuatro",
        created: "22 Sun",
        id: 1
    }
];

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            // return type: array of Promise<Tweet>
            const user = await UserDB.findUserById(tweet.id); //get the user's info in each tweet (async)

            if (user) {
                const { username, nickname, avatar } = user;
                return { ...tweet, username, nickname, avatar }; // add the userinfo to each tweet
            } else {
                console.log("cannot find the matching user with the tweet");
            }
        })
    );
}

export async function getByTweetId(tweetID: number) {
    const found = tweets.find((tweet) => tweet.tweetID === tweetID);
    if (!found) {
        return null;
    }

    const user = await UserDB.findUserById(found.id);

    if (user) {
        const { username, nickname, avatar } = user;
        return { ...found, username, nickname, avatar };
    } else {
        console.log("cannot find the matching tweet");
    }
}

export async function getAllByUsername(username: string) {
    return getAll().then((tweets) =>
        tweets.filter((tweet) => {
            console.log(tweet);
            tweet!.username === username;
        })
    );
}

export async function create(text: string, id: number) {
    const newTweet = {
        text,
        tweetID: Math.floor(Math.random() * 100),
        created: moment().startOf("hour").fromNow(),
        id
    };

    tweets = [newTweet, ...tweets];
    return getByTweetId(newTweet.tweetID);
}

export async function remove(tweetID: number) {
    tweets = tweets.filter((tweet) => tweet.tweetID !== tweetID);
    return;
}

export async function update(tweetID: number, text: string) {
    const tweet = tweets.find((tweet) => tweet.tweetID === tweetID);

    if (tweet) {
        tweet.text = text;
        return getByTweetId(tweet.tweetID);
    } else {
        console.log("cannot edit because cannot find the matching tweet");
    }
}
