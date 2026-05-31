import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createGoal, getById } from "../Controllers/goal.controller";
import { goalCreateLimiter } from "../Middlewares/rateLimit.middleware";

const router = Router();

router.post("/", requireAuth as any, goalCreateLimiter, createGoal as any);
router.get("/:goalId", requireAuth as any, getById as any);

export default router;