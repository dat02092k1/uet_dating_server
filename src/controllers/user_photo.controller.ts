import {asyncHandler} from "../middleware/handle";
import {OK} from "../core/success.response";
import {User_photoService} from "../services/user_photo.service";
import {NextFunction, Response, Request} from "express";
import {UserRequest} from "../interface/types";

class User_photoController {
    upload = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Upload successfully', await User_photoService.uploadPhoto(req.files, req.user.id));
    })
}

export const user_photoController = new User_photoController();