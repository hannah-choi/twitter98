import { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";

export const encrypt = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        return next();
    }

    return res.sendStatus(400);
};
