import mongoose, { Schema } from "mongoose";
import { frequentFoodParams } from "../TypesCheck/FrequentFoodTypes";

const FrequentFoodSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: [{ type: String, required: true }],
  },
  {
    toJSON: {
      timestamps: true, // This adds createdAt and updatedAt fields
      transform(doc, ret) {
        delete (ret as any).__v;
        delete (ret as any).createdAt;
        delete (ret as any).updatedAt;
      },
    },
  }
);

const FrequentFood = mongoose.model<frequentFoodParams>(
  "frequentFood",
  FrequentFoodSchema
);

export { FrequentFood };
