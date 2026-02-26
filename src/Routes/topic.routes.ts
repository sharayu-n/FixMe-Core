import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createTopic } from "../Controllers/topic.controller";

const router = Router();

router.post("/:goalId/topics", requireAuth as any, createTopic as any);

export default router;
