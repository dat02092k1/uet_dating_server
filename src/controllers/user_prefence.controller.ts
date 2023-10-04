import {asyncHandler} from "../middleware/handle";
import {UserRequest} from "../interface/types";
import {NextFunction, Response} from "express";
import {CREATED, OK} from "../core/success.response";
import {User_preferenceService} from "../services/user_preference.service";

class User_prefenceController {
    addPreference = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        CREATED(res, 'Add preference successfully', await User_preferenceService.addPreference(req.user.id, req.body.preference));
    })

    editPreference = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Edit preference successfully', await User_preferenceService.editPreference(req.user.id, req.body.preference));
    })
}

export const user_prefenceController = new User_prefenceController();