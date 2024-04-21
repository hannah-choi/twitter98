import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { dummyTweets } from "./data/dummyTweets";
import moment from "moment";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

dotenv.config({ path: "../.env" });

const app: Express = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("hola");
});

app.get("/tweets", async (req: Request, res: Response) => {
    try {
        const userid = req.query.userid;

        const data = userid ? dummyTweets.filter((tweet) => tweet.userid === req.query.userid) : dummyTweets;

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

app.get("/tweets/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const filtered = dummyTweets.filter((tweet) => tweet.id === parseInt(id, 10));
        res.status(200).send(filtered);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

app.post("/tweets", async (req: Request, res: Response) => {
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
        dummyTweets.push(newTweet);
        res.status(201);
    } catch (err) {
        console.log(err);
        console.log(req.body);
    }
    res.status(200).send();
});

app.delete(`/tweets/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    const index = dummyTweets.findIndex((tweet) => tweet.id === parseInt(id, 10));

    try {
        dummyTweets.splice(index, 1);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        console.log(req.body);
    }
});

app.put(`/tweets/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const index = dummyTweets.findIndex((tweet) => tweet.id === parseInt(id, 10));

    try {
        dummyTweets[index] = {
            ...dummyTweets[index],
            text
        };
        res.status(200).redirect("/tweets");
    } catch (err) {
        console.log(err);
        console.log(req.body);
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
