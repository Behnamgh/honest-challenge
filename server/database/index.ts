import mongoose from "mongoose";
import { initializeDatabase } from "./initialize";

mongoose.set("useNewUrlParser", true);

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost/honest"

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.debug(`${mongoUrl} | connected`))
  .then(() => initializeDatabase())
  .then(() => console.debug(`${mongoUrl} | data initialized`))
  .catch((err: Error) => {
    console.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err.toString()}`
    );
    process.exit();
  });
  