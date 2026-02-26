// src/Controllers/auth.controller.ts
import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../Schemas/auth.schema";
import * as AuthService from "../Services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const parsed = registerSchema.parse(req.body);
    const result = await AuthService.registerUser(parsed.email, parsed.password, parsed.name);
    return res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    if (err?.message === "EMAIL_EXISTS") {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }
    if (err?.name === "ZodError") {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await AuthService.loginUser(parsed.email, parsed.password);
    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    if (err?.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (err?.name === "ZodError") {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
