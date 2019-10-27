import express from "express";
import * as geoController from "../controllers/geoController";
const router = express.Router();

router.post("/findOutlet", geoController.findOutlet);

export default router;
