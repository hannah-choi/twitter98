import { Router, Request, Response, NextFunction } from "express";
import moment from "moment";
import { Tweet } from "../model/schema";

const router = Router();

let dummyTweets: Tweet[] = [
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

router.get("/", (req: Request, res: Response) => {
    try {
        const userid = req.query.userid;

        const data = userid ? dummyTweets.filter((tweet) => tweet.userid === req.query.userid) : dummyTweets;

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.send(500);
    }
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tweet = dummyTweets.find((tweet) => tweet.id === parseInt(id, 10));
        res.status(200).send(tweet);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

router.post("/", (req: Request, res: Response) => {
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
        dummyTweets = [newTweet, ...dummyTweets];
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
        dummyTweets = dummyTweets.filter((tweet) => tweet.id !== parseInt(id, 10));
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

router.put(`/:id`, (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = dummyTweets.find((tweet) => tweet.id === parseInt(id, 10));

    if (tweet) {
        tweet.text = text;
        return res.status(200).json(tweet);
    } else {
        res.status(404).send({ message: `cannot find tweet id: ${id}` });
    }
});

export default router;
