import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

const app = express();

//To use body parser
app.use(express.json());

dotenv.config();

connectDB();

//Routing
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server up and running on port ${PORT}`);
});
