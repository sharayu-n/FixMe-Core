import zod, {z} from "zod";

export const CreateAvailabilityRequestSchema = zod.object({
  date: zod.string().min(10).max(10),
  available_time: zod.number().min(0),
  status: zod.number().min(0).max(4),
});

export type CreateAvailabilityRequest = zod.infer<typeof CreateAvailabilityRequestSchema>;