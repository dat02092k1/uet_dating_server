import express from "express";
import {verifyMiddileware} from "../../middleware/verify";
import {userController} from "../../controllers/user.controller";

export const userRouter = express.Router();

userRouter.put('/user', verifyMiddileware.verifyToken, userController.updateUser);
userRouter.get('/user', verifyMiddileware.verifyToken, userController.getUser);

