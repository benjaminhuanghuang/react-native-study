import express from "express";
import DbCon from "./Services/Database";
import App from "./Services/ExpressApp";
import dotenv from "dotenv";
dotenv.config();

const StartServer = async () => {
  const app = express();
  await DbCon();
  await App(app);

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartServer();
