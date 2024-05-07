import { Router, Request, Response, NextFunction } from "express";
import * as tweetController from "../controller/tweet";

const router = Router();

router.get("/", tweetController.getTweets);

router.get("/:id", tweetController.getTweetsById);

router.post("/", tweetController.createTweet);

router.delete(`/:id`, tweetController.deleteTweet);

router.put(`/:id`, tweetController.updateTweet);

export default router;
