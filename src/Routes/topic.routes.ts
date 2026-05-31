import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createTopic } from "../Controllers/topic.controller";
import { createTask } from "../Controllers/task.controller";

const router = Router();

router.post("/:goalId/topics", requireAuth, createTopic);

// Nested task creation under a topic
router.post("/:topicId/tasks", requireAuth, createTask);

export default router;