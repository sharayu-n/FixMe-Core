import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email?: string };
    }
  }
}

export const requireAuth: RequestHandler = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const token = auth.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET_NOT_SET");
    }

    const payload = jwt.verify(token, secret) as { userId?: number; email?: string };

    if (!payload.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = {
      id: payload.userId,
      email: payload.email,
    };

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export {};