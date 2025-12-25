import { Router } from "express";
import {
  createMovies,
  getMovies,
  getMovieById,
} from "../controllers/movie.controller.js";
import { upload } from "../utils/multer.js";
import {
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
} from "../middleware/authCheck.js";

const router = Router();

router.post(
  "/entry",
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createMovies
);

router.get("/", getMovies);
router.get("/:id", getMovieById);

export default router;
