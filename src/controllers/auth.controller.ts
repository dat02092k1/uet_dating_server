'use strict';
import {asyncHandler} from "../middleware/handle";
import {CREATED} from "../core/success.response";
import {AuthService} from "../services/auth.service";
import {NextFunction, Request, Response} from "express";

class AuthController {
    signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        CREATED(res, 'Register success', await AuthService.signup(req.body.user))
    })
}

export const authController = new AuthController();