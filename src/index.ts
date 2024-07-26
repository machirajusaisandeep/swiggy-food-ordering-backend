import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to MongoDB");
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", UserRoutes);

app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
