// src/Routes/goal.routes.ts
import { Router } from "express";
import { requireAuth } from "../Middlewares/auth.middleware";
import { createGoal } from "../Controllers/goal.controller";
import prisma  from "../Utilities/prisma";

const router = Router();

router.post("/", requireAuth as any, createGoal as any);

router.get("/:goalId", requireAuth as any, async (req: any, res) => {
  const goal = await prisma.goals.findUnique({
    where: { id: Number(req.params.goalId) },
    include: {
      topics: {
        include: {
          tasks: true,
        },
      },
    },
  });

  res.json(goal);
});

export default router;