import express from "express";
import {authRoute} from "./auth/authRoute";
import { bioRoute } from "./bio/bioRoute";
import {userPhotoRouter} from "./user_photo/user_photo";

export const router = express.Router();

router.use("/v1/api", authRoute);
router.use("/v1/api", bioRoute);
router.use("/v1/api", userPhotoRouter);
