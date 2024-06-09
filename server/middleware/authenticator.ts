import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../controller/auth";
import * as userDB from "../data/user";

interface TokenPayload extends JwtPayload {
    id: string;
}

export interface CustomRequestID extends Request {
    id: number;
    token: string;
}

export const authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader?.startsWith("Bearer "))) {
        return res.status(401).json({ message: "Authentication error" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(400);
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send("unauthorised");
        }

        const user = await userDB.findUserById(parseInt((decoded as TokenPayload).id)); //Not mandatory
        if (!user) {
            return res.sendStatus(401);
        }
        (req as CustomRequestID).id = user.id; // register 'userid' 앞으로 이어지는 콜백에서 또 써야하는 데이터라면 이렇게 등록 가능
        next();
    });
};
