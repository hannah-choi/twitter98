import { RequestHandler, Request, Response, NextFunction } from "express";
import moment from "moment";
import { Database, dummyTweets } from "../data/data";

const db = new Database(dummyTweets);

export const getTweets: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userid = (req.query.userid as string) || undefined;
        const data = db.getData(userid);

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.send(500);
    }
};

export const getTweetsById: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const tweet = db.getDataById(id);
        res.status(200).send(tweet);
    } catch (err) {
        res.sendStatus(404);
    }
};

export const createTweet: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { text, userid, url, nickname } = req.body;
    const newTweet = {
        text,
        userid,
        url,
        nickname,
        id: dummyTweets.length + 1,
        created: moment().startOf("hour").fromNow()
    };

    try {
        db.addData(newTweet);
        res.status(201).json(newTweet);
    } catch (err) {
        console.log(err);
        console.log(req.body);
    }
    res.status(200).send();
};

export const deleteTweet: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        db.deleteData(id);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const updateTweet: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const tweet = db.updateData(id, text);
        return res.status(200).json(tweet);
    } catch (err) {
        res.status(404).send({ message: `cannot find tweet id: ${id}` });
    }
};
