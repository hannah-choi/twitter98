import { NextFunction, Request, Response, Router } from "express";
import * as tweetController from "../controller/tweet";
import { body, param, validationResult } from "express-validator";
import { validate } from "../middleware/validator";
import { User } from "../model/schema";
import bcrypt from "bcrypt";

const router = Router();

const users: User[] = [
    {
        id: 1,
        userid: "lobo",
        nickname: "Lobo",
        email: "croissant@atun.com",
        password: "1234",
        bio: "13 y.o siamese",
        token: undefined
    }
];

// POST /register
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = { ...req.body, id: users.length + 1, password: await bcrypt.hash(req.body.password, 10) };
    users.push(newUser);
    console.log(users);
    res.status(200).json({
        userid: newUser.userid,
        token: "token123"
    });
});

// POST /login
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const { userid, password } = req.body;

    const user = users.find((user) => user.userid === userid);
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            userid: user.userid,
            token: "123"
        });
    } else {
        return res.status(401).send("Userid and password does not match, try again");
    }
});

export default router;
