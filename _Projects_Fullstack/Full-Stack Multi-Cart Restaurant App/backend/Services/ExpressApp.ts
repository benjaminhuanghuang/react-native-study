import express, { Application } from "express";
import { FrequentFoodRoutes, RestaurantRoutes } from "../Routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/assets", express.static("assets"));

  app.use("/frequent", FrequentFoodRoutes);

  app.use("/restaurant", RestaurantRoutes);

  return app;
};
