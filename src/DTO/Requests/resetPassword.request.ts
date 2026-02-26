import { z } from "zod";


export const ResetPasswordSchema = z.object({
    userId: z.string().uuid(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
