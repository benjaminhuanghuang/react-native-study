import express, { Request, Response } from "express";
import multer from "multer";
import { createRestaurant, getAllRestaurants } from "../Controllers";
import path from "path";

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

router.post("/createRestaurant", images, createRestaurant);
router.get("/getAllRestaurants", getAllRestaurants);

export { router as RestaurantRoutes };
