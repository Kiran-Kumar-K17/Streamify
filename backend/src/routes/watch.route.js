import { Router } from "express";
import { saveProgress, getProgress } from "../controllers/watch.controller.js";
import { restrictToLoggedinUserOnly } from "../middleware/authCheck.js";

const router = Router();

router.post("/progress", restrictToLoggedinUserOnly, saveProgress);
router.get("/progress/:movieId", restrictToLoggedinUserOnly, getProgress);

export default router;
