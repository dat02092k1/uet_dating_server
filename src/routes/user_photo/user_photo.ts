import express from "express";
import {verifyMiddileware} from "../../middleware/verify";
import {upload} from '../../helpers/multer';
import {user_photoController} from "../../controllers/user_photo.controller";

export const userPhotoRouter = express.Router();

userPhotoRouter.post('/photo', verifyMiddileware.verifyToken, upload.array('image', 6), user_photoController.upload);
userPhotoRouter.delete('/photo', verifyMiddileware.verifyToken, user_photoController.delete);

