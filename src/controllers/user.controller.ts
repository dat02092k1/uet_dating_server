import {asyncHandler} from "../middleware/handle";
import {OK} from "../core/success.response";
import {UserService} from "../services/user.service";
import {UserRequest} from "../interface/types";
import {NextFunction, Response} from "express";

class UserController {
    updateUser = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Update user successfully', await UserService.update(req.body.user, req.user.id));
    })

    getUser = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Get user successfully', await UserService.getUserById(req.user.id));
    })
}

export const userController = new UserController();