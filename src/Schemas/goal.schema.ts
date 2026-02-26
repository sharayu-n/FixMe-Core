// src/Schemas/goal.schema.ts
import { z } from "zod";

export const createGoalSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  target_start: z.string().optional(),
  target_end: z.string().optional(),
  priority: z.number().optional(),
  goal_expertise: z.number().optional(),
});