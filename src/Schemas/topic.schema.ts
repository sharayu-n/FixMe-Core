import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().min(1),
});

export type CreateTopicInput = z.infer<typeof createTopicSchema>;
