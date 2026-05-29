import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2, "Full name is required").optional(),
  email: z.string().email().optional(),
  phoneNumber: z
    .string()
    .min(10, "Invalid phone number")
    .max(15, "Invalid phone number")
    .optional(),
});

export type UserRequest = z.infer<typeof UserSchema>;