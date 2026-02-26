import {z} from "zod";


export const UpdateGoalRequestSchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(500).optional(),
    targetStart: z.date().min(new Date(), { message: "Start date must be in the future" }).optional(),
    targetEnd: z.date().min(new Date(), { message: "End date must be in the future" }).optional(),
    priority: z.number().min(1).max(5).optional(),
    status: z.number().min(0).max(3).optional(),
    progressPercent: z.number().min(0).max(100).optional()
})

export type UpdateGoalRequest = z.infer<typeof UpdateGoalRequestSchema>;
