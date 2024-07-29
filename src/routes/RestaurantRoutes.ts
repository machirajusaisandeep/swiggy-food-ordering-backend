import express from "express";
import multer from "multer";
import RestaurantController from "../controllers/RestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// /api/restaurant

router.get("/", jwtCheck, jwtParse, RestaurantController.getRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  RestaurantController.createRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  RestaurantController.updateRestaurant
);

export default router;
