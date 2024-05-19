import { Request, Response, RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as userDB from "../data/user";
import bcrypt from "bcrypt";

const secret = "}k4R8Pfe@)NOd!}'2{3@(@W[kQu9^u4b";

export const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userid = await userDB.registerUser(req.body);
        res.status(200).json({ userid });
    } catch (err) {
        res.status(401).send("Cannot register the user, please try again later");
    }
};

export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { userid, password } = req.body;

    try {
        const foundUser = await userDB.loginUser(userid, password);
        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
            return res.status(200).json({
                userid,
                token: jwt.sign(
                    {
                        id: foundUser.id
                    },
                    secret,
                    { expiresIn: 300000 }
                )
            });
        } else {
            res.status(401).send("Id and password does not match, try again");
        }
    } catch (err) {
        return res.status(401).send("Id and password does not match, try again");
    }
};

export const verifyUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
        return res.sendStatus(400);
    }

    jwt.verify(token, secret, (err) => {
        if (err) {
            return res.status(401).send(err);
        }
    });

    res.sendStatus(200);
};
