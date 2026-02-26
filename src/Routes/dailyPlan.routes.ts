import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import {
  addToToday,
  getToday,
  completeItem,
} from "../Controllers/dailyPlan.controller";

const router = Router();

router.post("/", requireAuth as any, addToToday as any);
router.get("/today", requireAuth as any, getToday as any);
router.patch("/:id/complete", requireAuth as any, completeItem as any);

export default router;