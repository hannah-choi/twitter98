import { Request, Response, RequestHandler } from "express";
import * as tweetDB from "../data/tweet";

export const getTweets: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userid = (req.query.userid as string) || undefined;
        const data = await (userid ? tweetDB.getAllByUserid(userid) : tweetDB.getAll());
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.send(500);
    }
};

export const getTweetsById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tweet = await tweetDB.getByTweetId(id);
        res.status(200).send(tweet);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
};

export const createTweet: RequestHandler = async (req: Request, res: Response) => {
    const { text, userid, url, nickname } = req.body;

    try {
        const newTweet = await tweetDB.create(text, userid, url, nickname);
        res.status(201).json(newTweet);
    } catch (err) {
        console.log(err);
        console.log(req.body);
    }
    res.status(200).send();
};

export const deleteTweet: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await tweetDB.remove(id);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const updateTweet: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = await tweetDB.update(id, text);

    if (tweet) {
        return res.status(200).json(tweet);
    } else {
        res.status(404).send({ message: `cannot find tweet id: ${id}` });
    }
};
