import express from "express";
import path from "path";
import userRoutes from "./routes/user.routes.js";
import staticRouter from "./routes/staticRouter.js";
import movieRoutes from "./routes/movie.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/uploads", express.static("uploads"));

app.use("/", staticRouter);
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
//Adding Movies Meta-Data

export default app;
