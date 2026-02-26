import {z} from "zod";

export const DailyPlanRequestSchema = z.object({
  date: z.string().min(10).max(10),
  allocated_time: z.number().min(0),
  task_order: z.number().min(0),
  status: z.number().min(0).max(4),
});

export type DailyPlanRequest = z.infer<typeof DailyPlanRequestSchema>;
