import {z} from "zod";

export const UpdateTaskRequestSchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(500).optional(),
    status: z.number().min(0).max(3).optional(),
    sequenceOrder: z.number().min(1).optional(),
    progressPercent: z.number().min(0).max(100).optional()
})

export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
