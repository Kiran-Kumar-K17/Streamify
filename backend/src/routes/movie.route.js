import { Router } from "express";
import {
  createMovies,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import { upload } from "../utils/multer.js";
import {
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
} from "../middleware/authCheck.js";

const router = Router();

/* =========================
   CREATE (Admin)
========================= */
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

/* =========================
   READ (Public)
========================= */
router.get("/", getMovies);
router.get("/:id", getMovieById);

/* =========================
   UPDATE (Admin)
========================= */
router.put(
  "/:id",
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateMovie
);

/* =========================
   DELETE (Admin)
========================= */
router.delete(
  "/:id",
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
  deleteMovie
);

export default router;
