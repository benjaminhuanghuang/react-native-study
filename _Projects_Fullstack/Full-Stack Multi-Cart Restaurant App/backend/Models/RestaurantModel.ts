import mongoose, { Schema } from "mongoose";
import { restaurantProps } from "../TypesCheck/RestaurantTypes";

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    ratingCount: {
      type: Number,
    },
    serviceCharge: {
      type: Number,
    },
    coords: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete (ret as any).__v;
        delete (ret as any).createdAt;
        delete (ret as any).updatedAt;
      },
    },
    timestamps: true,
  }
);

const RESTAURANTS = mongoose.model<restaurantProps>(
  "restaurant",
  restaurantSchema
);

export { RESTAURANTS };
