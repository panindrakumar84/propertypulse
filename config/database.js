import mongoose from "mongoose";

let connected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if db already connected return
  if (connected) {
    console.log("Mongodb is connected");
    return;
  }

  // connect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
