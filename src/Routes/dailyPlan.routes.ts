import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import {
  addToToday,
  getToday,
  completeItem,
} from "../Controllers/dailyPlan.controller";

const router = Router();

router.post("/", requireAuth, addToToday);
router.get("/today", requireAuth, getToday);
router.patch("/:id/complete", requireAuth, completeItem);

export default router;