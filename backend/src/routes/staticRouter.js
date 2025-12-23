import { Router } from "express";
import {
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
} from "../middleware/authCheck.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get(
  "/admin",
  restrictToLoggedinUserOnly,
  restrictToAdminOnly,
  (req, res) => {
    res.render("adminpage");
  }
);

router.get("/dashboard", restrictToLoggedinUserOnly, (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

export default router;
