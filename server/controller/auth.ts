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
    const { userid, password, nickname, email, bio, avatar, bg } = req.body;
    const isUserExists = await userDB.findUserByUserid(userid);

    if (isUserExists) {
        return res.status(409).json({ message: `${userid} already exists` });
    }

    const hashed = await bcrypt.hash(password, salt);
    const id = await userDB.addUser({ userid, password: hashed, nickname, email, bio, avatar, bg });

    res.status(201).json({ userid, token: generateToken(id) });
};

export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { userid, password } = req.body;

    const foundUser = await userDB.findUserByUserid(userid);
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
        return res.status(200).json({
            userid,
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

    res.status(200).json({ token: (req as CustomRequestID).token, userid: user.userid });
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
