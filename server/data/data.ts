import { Tweet } from "../model/schema";

export const dummyTweets: Tweet[] = [
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

export class Database {
    tweets: Tweet[];

    constructor(tweets: Tweet[]) {
        this.tweets = tweets;
    }

    getData(userid?: string) {
        return userid ? this.tweets.filter((tweet) => tweet.userid === userid) : this.tweets;
    }

    getDataById(id: string) {
        const tweet = this.tweets.find((tweet) => tweet.id === parseInt(id, 10));
        return tweet;
    }

    addData(newTweet: Tweet) {
        this.tweets = [newTweet, ...dummyTweets];
        return newTweet;
    }

    deleteData(id: string) {
        this.tweets = this.tweets.filter((tweet) => tweet.id !== parseInt(id, 10));
    }

    updateData(id: string, text: string) {
        const index = this.tweets.findIndex((tweet) => tweet.id === parseInt(id, 10));
        this.tweets[index].text = text;
        return this.tweets[index];
    }
}
