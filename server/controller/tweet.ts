import { Request, Response, RequestHandler } from "express";
import * as tweetDB from "../data/tweet";

export const getTweets: RequestHandler = async (req: Request, res: Response) => {
    try {
        const username = (req.query.username as string) || undefined;
        const data = await (username ? tweetDB.getAllByUsername(username) : tweetDB.getAll());
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.send(500);
    }
};

export const getTweetsById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tweet = await tweetDB.getByTweetId(parseInt(id));
        res.status(200).send(tweet);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
};

export const createTweet: RequestHandler = async (req: Request, res: Response) => {
    const { text, id } = req.body;

    try {
        const newTweet = await tweetDB.create(text, parseInt(id));
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
        await tweetDB.remove(parseInt(id));
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const updateTweet: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = await tweetDB.update(parseInt(id), text);

    if (tweet) {
        return res.status(200).json(tweet);
    } else {
        res.status(404).send({ message: `cannot find tweet id: ${id}` });
    }
};
