import { Router } from "express";
import { createMovies } from "../controllers/movie.controller.js";
import {
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
} from "../middleware/authCheck.js";

const router = Router();

router.post(
  "/entry",
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
  createMovies
);

export default router;
