import { frequentFoodParams } from "../TypesCheck/FrequentFoodTypes";

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
    res.status(201).json(savedFrequentFood);
  } catch (error) {
    res.status(500).json({ message: "Error creating frequent food", error });
  }
};
