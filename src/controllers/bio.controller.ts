'use strict'

import { NextFunction, Response, Request } from "express"
import { asyncHandler } from "../middleware/handle";
import { CREATED, OK } from "../core/success.response";
import { BioService } from "../services/bio.service";
import { UserRequest } from "../interface/types";

class BioController {
    createBio = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        CREATED(res, 'Created success', await BioService.createBio(req.body.bio, req.query.user_id))
    })

    getBio = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
        OK(res, 'get bio successfully', await BioService.getBio(req.user.id))
    })
}

export const bioController = new BioController();
