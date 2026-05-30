import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { completeTask } from "../Controllers/task.controller";

const router = Router();

router.patch("/:taskId/complete", requireAuth as any, completeTask as any);

export default router;