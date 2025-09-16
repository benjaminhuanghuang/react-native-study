import { FrequentFood } from "../Models/FrequentFood";
import { frequentFoodParams } from "../TypesCheck/FrequentFoodTypes";
import { Request, Response } from "express";

export const createFrequentFood = async (req: Request, res: Response) => {
  const { name } = <frequentFoodParams>req.body;

  const files = req.files as [Express.Multer.File];

  const path = "http://localhost:8082/assets/"; // This should ideally come from a config file
  const imageUrl = files.map((file) => {
    return path + file.filename;
  });

  try {
    const frequentFood = new FrequentFood({
      name,
      imageUrl,
    });

    const savedFrequentFood = await frequentFood.save();
    res.status(200).json(savedFrequentFood);
  } catch (error) {
    res.status(500).json({ message: "Error creating frequent food", error });
  }
};

export const getFrequentFood = async (req: Request, res: Response) => {
  try {
    const frequentFood = await FrequentFood.findById(req.params.id);
    res.status(200).json(frequentFood);
  } catch (error) {
    res.status(500).json({ message: "Error fetching frequent food", error });
  }
};

export const getAllFrequentFoods = async (req: Request, res: Response) => {
  try {
    const frequentFoods = await FrequentFood.find().limit(30);
    res.status(200).json(frequentFoods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching frequent foods", error });
  }
};

export const deleteFrequentFood = async (req: Request, res: Response) => {
  try {
    const deletedFrequentFood = await FrequentFood.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedFrequentFood);
  } catch (error) {
    res.status(500).json({ message: "Error deleting frequent food", error });
  }
};

export const updateFrequentFood = async (req: Request, res: Response) => {
  try {
    const updatedFrequentFood = await FrequentFood.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedFrequentFood);
  } catch (error) {
    res.status(500).json({ message: "Error updating frequent food", error });
  }
};
