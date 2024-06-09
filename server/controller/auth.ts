import { Request, Response, RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as userDB from "../data/user";
import bcrypt from "bcrypt";
import { CustomRequestID } from "../middleware/authenticator";

// TODO: Separate this
export const secret = "}k4R8Pfe@)NOd!}'2{3@(@W[kQu9^u4b";
const salt = 10;
const expirySeconds = 300000;
//

export const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, nickname, email, bio, avatar, bg } = req.body;
    const isUserExists = await userDB.findUserByUsername(username);

    if (isUserExists) {
        return res.status(409).json({ message: `${username} already exists` });
    }

    const hashed = await bcrypt.hash(password, salt);
    const id = await userDB.addUser({ username, password: hashed, nickname, email, bio, avatar, bg });

    res.status(201).json({ username, token: generateToken(id) });
};

export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const foundUser = await userDB.findUserByUsername(username);
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
        return res.status(200).json({
            username,
            token: generateToken(foundUser.id)
        });
    } else {
        res.status(401).send("Id or password does not match, try again");
    }
};

export const verifyUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userDB.findUserById((req as CustomRequestID).id);
    if (!user) {
        return res.sendStatus(401);
    }

    res.status(200).json({ token: (req as CustomRequestID).token, username: user.username });
};

const generateToken = (id: number) => {
    return jwt.sign(
        {
            id: id.toString()
        },
        secret,
        { expiresIn: expirySeconds }
    );
};
