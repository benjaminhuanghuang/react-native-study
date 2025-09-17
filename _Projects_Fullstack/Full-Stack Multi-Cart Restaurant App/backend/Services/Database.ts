import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (e) {
    console.log("DB Connection Error", e);
    process.exit(1);
  }
};
