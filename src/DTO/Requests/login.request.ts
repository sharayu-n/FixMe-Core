import { z } from "zod";

export const LoginRequestSchema = z.object({
  emailOrPhone: z.string().min(3, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
