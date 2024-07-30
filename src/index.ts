import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";
import RestaurantRoutes from "./routes/RestaurantRoutes";
import FilterRestaurantRoutes from "./routes/FilterRestaurantRoutes";
import { v2 as cloudinary } from "cloudinary";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to MongoDB");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "health OK",
  });
});

app.use("/api/my/user", UserRoutes);
app.use("/api/my/restaurant", RestaurantRoutes);
app.use("/api/restaurant", FilterRestaurantRoutes);

app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
