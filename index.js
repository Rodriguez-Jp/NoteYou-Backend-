import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

//To use body parser
app.use(express.json());

//env config
dotenv.config();

connectDB();

//Set up CORS
const whiteList = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error"));
    }
  },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server up and running on port ${PORT}`);
});
