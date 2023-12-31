import express from "express";
import { verifyMiddileware } from "../../middleware/verify";
import {user_prefenceController} from "../../controllers/user_prefence.controller";

export const preferenceRoute = express.Router();

preferenceRoute.post('/preference', verifyMiddileware.verifyToken, user_prefenceController.addPreference);
preferenceRoute.put('/preference', verifyMiddileware.verifyToken, user_prefenceController.editPreference);
preferenceRoute.get('/preference', verifyMiddileware.verifyToken, user_prefenceController.findUsersByPreference);



