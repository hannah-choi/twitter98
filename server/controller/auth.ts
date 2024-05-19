import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/schema";

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

const secret = "}k4R8Pfe@)NOd!}'2{3@(@W[kQu9^u4b";

export const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = { ...req.body, id: users.length + 1, password: await bcrypt.hash(req.body.password, 10) };
    users.push(newUser);
    res.status(200).json({
        userid: newUser.userid
    });
};

export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { userid, password } = req.body;

    const user = users.find((user) => user.userid === userid);
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            userid: user.userid,
            token: jwt.sign(
                {
                    id: user.id
                },
                secret,
                { expiresIn: 300000 }
            )
        });
    } else {
        return res.status(401).send("Userid and password does not match, try again");
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
