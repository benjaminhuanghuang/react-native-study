import express, { Request, Response } from "express";
import {
  createFrequentFood,
  getFrequentFood,
} from "../Controllers/FrequentFoodController";
import multer from "multer";
import path from "path/win32";
import { getActiveResourcesInfo } from "process";

const router = express.Router();

const imageStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const images = multer({ storage: imageStore }).array("imageUrl");

router.post("/createFrequentFood", images, createFrequentFood);
router.get("/getAllFrequentFoods", getActiveResourcesInfo);
router.get("/getSingleFrequentFood/:id", getFrequentFood);
router.delete("/deleteFrequentFood/:id", getActiveResourcesInfo);
router.put("/updateFrequentFood/:id", getActiveResourcesInfo);

export { router as FrequentFoodRoutes };
