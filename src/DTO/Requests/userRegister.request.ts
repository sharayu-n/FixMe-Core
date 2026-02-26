import { z } from "zod";


export const UserRegisterRequestSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email(),
  phoneNumber: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type UserRegisterRequest = z.infer<typeof UserRegisterRequestSchema>;
