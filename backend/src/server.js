import app from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./utils/database.js";

dotenv.config();

const StartServer = async () => {
  try {
    await ConnectDB();
    app.on("error", (error) => {
      console.log("ERROR", error);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server Running on Port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("MongoDB Connection Failed!", error);
  }
};

StartServer();
