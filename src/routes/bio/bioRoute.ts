import express from "express";
import { bioController } from "../../controllers/bio.controller";
import { verifyMiddileware } from "../../middleware/verify";
// import {ValidationData} from "../../middleware/validation";

export const bioRoute = express.Router();

bioRoute.post('/bio', verifyMiddileware.verifyToken, bioController.createBio)
bioRoute.get('/bio', verifyMiddileware.verifyToken, bioController.getBio)
bioRoute.put('/bio', verifyMiddileware.verifyToken, bioController.updateBio)

