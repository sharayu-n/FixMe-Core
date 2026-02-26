import {z} from "zod";

export const TaskLogRequestSchema = z.object({
  user_id: z.string().uuid(),
  task_id: z.string().uuid(),
  date: z.string().min(10).max(10),
  time_spent: z.number().min(0),
  status: z.number().min(0).max(2),
});

export type TaskLogRequest = z.infer<typeof TaskLogRequestSchema>;
