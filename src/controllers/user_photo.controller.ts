import {asyncHandler} from "../middleware/handle";
import {OK} from "../core/success.response";
import {User_photoService} from "../services/user_photo.service";
import {NextFunction, Response, Request} from "express";

class User_photoController {
    upload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        OK(res, 'Upload successfully', await User_photoService.uploadImg(req.files));
    })
}

export const user_photoController = new User_photoController();