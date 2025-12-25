import { Router } from "express";
import { streamVideo } from "../controllers/stream.controller.js";
import { restrictToLoggedinUserOnly } from "../middleware/authCheck.js";

const router = Router();

// protect streaming (optional but recommended)
router.get("/:movieId", restrictToLoggedinUserOnly, streamVideo);

export default router;
