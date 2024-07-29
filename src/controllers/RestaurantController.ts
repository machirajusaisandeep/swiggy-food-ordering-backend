import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (!existingRestaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    existingRestaurant.restaurantName = req.body.restaurantName;
    existingRestaurant.city = req.body.city;
    existingRestaurant.country = req.body.country;
    existingRestaurant.deliveryPrice = req.body.deliveryPrice;
    existingRestaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    existingRestaurant.cuisines = req.body.cuisines;
    existingRestaurant.menuItems = req.body.menuItems;
    existingRestaurant.lastUpdated = new Date();
    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      existingRestaurant.imageUrl = imageUrl;
    }
    await existingRestaurant.save();

    res.status(200).send(existingRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default { createRestaurant, getRestaurant, updateRestaurant };
