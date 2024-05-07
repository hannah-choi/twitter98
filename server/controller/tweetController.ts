import { RequestHandler, Request, Response, NextFunction } from "express";
import { dummyTweets } from "../data/data";

let tweets = dummyTweets;

export const getTweets: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userid = req.query.userid;

        const data = userid ? dummyTweets.filter((tweet) => tweet.userid === req.query.userid) : dummyTweets;

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.send(500);
    }
};

export const getTweetsById: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const tweet = tweets.find((tweet) => tweet.id === parseInt(id, 10));
        res.status(200).send(tweet);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
};

export const deleteTweet: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        tweets = tweets.filter((tweet) => tweet.id !== parseInt(id, 10));
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const updateTweet: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweets.find((tweet) => tweet.id === parseInt(id, 10));

    if (tweet) {
        tweet.text = text;
        return res.status(200).json(tweet);
    } else {
        res.status(404).send({ message: `cannot find tweet id: ${id}` });
    }
};
