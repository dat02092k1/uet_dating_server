import express from "express";
import {authRoute} from "./auth/authRoute";
import { bioRoute } from "./bio/bioRoute";

export const router = express.Router();

router.use("/v1/api", authRoute);
router.use("/v1/api", bioRoute);
