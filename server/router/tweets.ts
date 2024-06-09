import { NextFunction, Request, Response, Router } from "express";
import * as tweetController from "../controller/tweet";
import { body, param, validationResult } from "express-validator";
import { validate } from "../middleware/validator";
import { authenticate } from "../middleware/authenticator";

const router = Router();

const validateTweet = [
    body("text").trim().isLength({ min: 3, max: 140 }).withMessage("Text should be between 3 and 140 characters"),
    validate
];

// GET /tweets
// GET /tweets?username=username
router.get("/", tweetController.getTweets);

// GET /tweets/:tweetid
router.get("/:id", tweetController.getTweetsById);

// POST /tweets
router.post("/", authenticate, validateTweet, tweetController.createTweet);

// DELETE /tweets
router.delete(`/:id`, authenticate, tweetController.deleteTweet);

// PUT /tweets
router.put(`/:id`, authenticate, validateTweet, tweetController.updateTweet);

export default router;
