import {asyncHandler} from "../middleware/handle";
import {UserRequest} from "../interface/types";
import {NextFunction, Response} from "express";
import {OK} from "../core/success.response";
import {LikeService} from "../services/like.service";

class LikeController {
    like = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'like successfully', await LikeService.like(req.body.user_id, req.body.target_id))
    })
}

export const likeController = new LikeController();