
import {z} from "zod";


export const CreateGoalRequestSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    startDate: z.date().min(new Date(), { message: "Start date must be in the future" }),
    dueDate: z.date().min(new Date(), { message: "Due date must be in the future" }),
    priority: z.number().min(1).max(5)
})

export type CreateGoalRequest = z.infer<typeof CreateGoalRequestSchema>;
