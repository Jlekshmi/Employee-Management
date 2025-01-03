
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

console.log(MONGO_CONNECTION_STRING);
mongoose.connect(MONGO_CONNECTION_STRING);

//Listen connection event
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
