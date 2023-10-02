import express from "express";
import {authController} from "../../controllers/auth.controller";
// import {ValidationData} from "../../middleware/validation";

export const authRoute = express.Router();

authRoute.post('/auth/signup', authController.signUp)
authRoute.post('/auth/signin', authController.signIn)
