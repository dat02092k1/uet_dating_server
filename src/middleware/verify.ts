'use strict';
import { NextFunction, Request, Response } from "express";
import { utilConstants } from "../utils/constants";
import jwt from "jsonwebtoken";
import { Api401Error, Api403Error } from "../core/error.response";

class VerifyMiddileware {
    verifyToken = (req: any , res: Response, next: NextFunction) => {
        const token = req.headers[utilConstants.HEADER.AUTHORIZATION] as string;
        if (token) {
            const accessToken = token.split(" ")[1];

            jwt.verify(accessToken, utilConstants.JWT_SECRET, (err: any, user: any) => {
                if (err) {
                    console.log(err);
                    throw new Api403Error("Forbidden request");
                }
                console.log(user);
                req.user = user;
                next();
            });
        } else {
            throw new Api401Error("You're not authenticated");
        }
    }
}

export const verifyMiddileware = new VerifyMiddileware();