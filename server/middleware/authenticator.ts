import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../controller/auth";
import * as userDB from "../data/user";

interface TokenPayload extends JwtPayload {
    userid: string;
}

export interface CustomRequest extends Request {
    userid: string;
    token: string;
}

export const authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
        return res.sendStatus(400);
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send("unauthorised");
        }

        const user = await userDB.findUserByUserid(decoded as TokenPayload["userid"]);
        if (!user) {
            return res.sendStatus(401);
        }
        (req as CustomRequest).userid = user.userid; // register 'userid'
    });

    next();
};
