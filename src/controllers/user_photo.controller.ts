import {asyncHandler} from "../middleware/handle";
import {OK} from "../core/success.response";
import {User_photoService} from "../services/user_photo.service";
import {NextFunction, Response, Request} from "express";
import {UserRequest} from "../interface/types";

class User_photoController {
    upload = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Upload successfully', await User_photoService.uploadPhoto(req.files, req.user.id));
    })

    delete = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Delete successfully', await User_photoService.deletePhoto(req.user.id, req.query.photo_id));
    })

    add = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'Add successfully', await User_photoService.addPhoto(req.user.id, req.file));
    });
}

export const user_photoController = new User_photoController();