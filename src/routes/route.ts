import express from "express";
import { router as postRouter } from './post'; // Import the router from post.route.ts
import { router as userRouter } from './user';

export const router = express.Router();

router.use("/v1/api", postRouter);
router.use("/v1/api", userRouter);