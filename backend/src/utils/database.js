import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB Connected Successfully.. ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
