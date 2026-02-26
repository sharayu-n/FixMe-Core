import {z} from "zod";


export const UpdateTopicRequestSchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().min(10).max(200).optional(),
    sequenceOrder: z.number().min(1).optional(),
    status: z.number().min(0).max(3).optional(),
    progressPercent: z.number().min(0).max(100).optional()
})

export type UpdateTopicRequest = z.infer<typeof UpdateTopicRequestSchema>;
