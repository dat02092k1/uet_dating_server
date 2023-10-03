import express from "express";
import { verifyMiddileware } from "../../middleware/verify";
import {likeController} from "../../controllers/like.controller";

export const likeRoute = express.Router();

likeRoute.post('/like', verifyMiddileware.verifyToken, likeController.like)

