import z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  phone: z.string(),
  role: z.number(),
  name: z.string(),
  password_hash: z.string(),
});