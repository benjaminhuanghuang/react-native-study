import express from "express";
import DbCon from "./Services/Database";
import App from "./Services/ExpressApp";
import { PORT } from "./Config";

const StartServer = async () => {
  const app = express();
  await DbCon();
  await App(app);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartServer();
