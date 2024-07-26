import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({
    message: "test",
  });
});

app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
