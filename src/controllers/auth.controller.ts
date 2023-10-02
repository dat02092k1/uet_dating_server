'use strict';
import {asyncHandler} from "../middleware/handle";
import {CREATED, OK} from "../core/success.response";
import {AuthService} from "../services/auth.service";
import {NextFunction, Request, Response} from "express";
import { UserRequest } from "../interface/types";

class AuthController {
    signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        CREATED(res, 'Register success', await AuthService.signup(req.body.user))
    })

    signIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        OK(res, 'Login success', await AuthService.signin(req.body.user))
    })
}

export const authController = new AuthController();