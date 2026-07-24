import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connectDB.js";

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
