import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createTopic } from "../Controllers/topic.controller";
import { createTask } from "../Controllers/task.controller";

const router = Router();

router.post("/:goalId/topics", requireAuth as any, createTopic as any);

// Nested task creation under a topic
router.post("/:topicId/tasks", requireAuth as any, createTask as any);

export default router;