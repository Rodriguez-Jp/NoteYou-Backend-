import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server up and running on port ${PORT}`);
});
