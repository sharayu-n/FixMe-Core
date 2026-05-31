import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createGoal, getById } from "../Controllers/goal.controller";
import { goalCreateLimiter } from "../Middlewares/rateLimit.middleware";

const router = Router();

router.post("/", requireAuth, goalCreateLimiter, createGoal);
router.get("/:goalId", requireAuth, getById);

export default router;