import {z} from "zod";


export const CreateTaskRequestSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    sequenceOrder: z.number().min(1).optional()
})

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
