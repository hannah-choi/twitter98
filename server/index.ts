import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import tweetRouter from "./router/tweets";
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

app.use("/tweets", tweetRouter);

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
