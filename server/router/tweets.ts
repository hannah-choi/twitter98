import { Router, Request, Response, NextFunction } from "express";
import * as tweetDB from "../data/tweet";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    try {
        const userid = (req.query.userid as string) || undefined;
        const data = userid ? tweetDB.getAllByUserid(userid) : tweetDB.getAll();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.send(500);
    }
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tweet = tweetDB.getByTweetId(id);
        res.status(200).send(tweet);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

router.post("/", (req: Request, res: Response) => {
    const { text, userid, url, nickname } = req.body;

    try {
        const newTweet = tweetDB.create(text, userid, url, nickname);
        res.status(201).json(newTweet);
    } catch (err) {
        console.log(err);
        console.log(req.body);
    }
    res.status(200).send();
});

router.delete(`/:id`, (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        tweetDB.remove(id);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

router.put(`/:id`, (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweetDB.update(id, text);

    if (tweet) {
        return res.status(200).json(tweet);
    } else {
        res.status(404).send({ message: `cannot find tweet id: ${id}` });
    }
});

export default router;
