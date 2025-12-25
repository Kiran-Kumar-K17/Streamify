import { Router } from "express";
import {
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
} from "../middleware/authCheck.js";

import { Movie } from "../models/movie.model.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get(
  "/admin",
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
  async (req, res) => {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.render("adminpage", { movies });
  }
);

router.get("/dashboard", restrictToLoggedinUserOnly, async (req, res) => {
  const movies = await Movie.find().select("title thumbnailUrl");
  res.render("dashboard", { user: req.user, movies });
});

router.get("/watch/:id", restrictToLoggedinUserOnly, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("watch", { movie });
});

router.get("/admin/edit/:id", restrictToLoggedinUserOnly, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("editMovie", { movie });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

export default router;
