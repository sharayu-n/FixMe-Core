// src/Middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../Utilities/prisma";

export interface AuthRequest extends Request {
  user?: { id: number; email?: string };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ success: false, message: "No token" });

    const token = auth.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET_NOT_SET");

    const payload = jwt.verify(token, secret) as any;
    const userId = payload.userId;

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) return res.status(401).json({ success: false, message: "Invalid token (user removed)" });

    req.user = { id: user.id, email: user.email ?? undefined };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
