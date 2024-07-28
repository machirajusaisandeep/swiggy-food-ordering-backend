import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).json({
        message: "Restaurant already exists",
      });
    }
    const image = req.file as Express.Multer.File;
    const base64Image = image.buffer.toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    const userId = new mongoose.Types.ObjectId(req.userId);

    const newRestaurant = new Restaurant({
      ...req.body,
      image: uploadResponse.url,
      user: userId,
      lastUpdated: Date.now(),
    });
    await newRestaurant.save();
    res.status(201).send(newRestaurant.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating restaurant",
    });
  }
};

export default { createRestaurant };
