import { Request, Response } from "express";
import { restaurantProps } from "../TypesCheck/RestaurantTypes";
import { RESTAURANTS } from "../Models/RestaurantModel";

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, description, foodType, time, serviceCharge, coords } = <
    restaurantProps
  >req.body;

  const files = req.files as [Express.Multer.File];

  const path = "http://localhost:8082/assets/"; // This should ideally come from a config file
  const imageUrl = files.map((file) => {
    return path + file.filename;
  });

  const newRestaurant = new RESTAURANTS({
    name,
    description,
    foodType,
    time,
    serviceCharge,
    coords,
    imageUrl,
  });

  try {
    await newRestaurant.save();

    res.status(200).json("Restaurant created successfully");
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await RESTAURANTS.find().limit(30);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};
