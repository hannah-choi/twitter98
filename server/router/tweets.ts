import { NextFunction, Request, Response, Router } from "express";
import * as tweetController from "../controller/tweet";
import { body, param, validationResult } from "express-validator";
import { validate } from "../middleware/validator";

const router = Router();

const validateTweet = [
    body("text").trim().isLength({ min: 3, max: 140 }).withMessage("Text should be between 3 and 140 characters"),
    validate
];

// GET /tweets
// GET /tweets?userid=userid
router.get("/", tweetController.getTweets);

// GET /tweets/:tweetid
router.get("/:id", tweetController.getTweetsById);

// POST /tweets
router.post("/", validateTweet, tweetController.createTweet);

// DELETE /tweets
router.delete(`/:id`, tweetController.deleteTweet);

// PUT /tweets
router.put(`/:id`, validateTweet, tweetController.updateTweet);

export default router;
