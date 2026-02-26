import {z} from "zod";


export const CreateTopicRequestSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(10).max(200),
    sequenceOrder: z.number().min(1).optional(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date())
})

export type CreateTopicRequest = z.infer<typeof CreateTopicRequestSchema>;
