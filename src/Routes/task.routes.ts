import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createTask } from "../Controllers/task.controller";
import {completeTask} from "../Controllers/task.controller";


const router = Router();

router.post("/:topicId/tasks", requireAuth as any, createTask as any);
router.patch("/:taskId/complete", requireAuth as any, completeTask as any);


export default router;
