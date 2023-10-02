import express from "express";
import {authRoute} from "./auth/authRoute";

export const router = express.Router();

router.use("/v1/api", authRoute);
