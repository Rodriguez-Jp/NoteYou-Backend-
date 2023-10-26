import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_CONNECTION);

    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log("MongoDB connected on: ", url);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

export default connectDB;
