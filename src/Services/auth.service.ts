// src/Services/auth.service.ts
import prisma from "../Utilities/prisma"; // We'll add this helper next
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "7d";

export async function registerUser(email: string, password: string, name?: string) {
  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) throw new Error("EMAIL_EXISTS");

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: { email, name, password_hash },
    select: { id: true, email: true, name: true, created_at: true },
  });

  const token = generateToken({ userId: user.id });

  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const ok = await bcrypt.compare(password, user.password_hash || "");
  if (!ok) throw new Error("INVALID_CREDENTIALS");

  const token = generateToken({ userId: user.id });

  // do not return password_hash
  const safeUser = { id: user.id, email: user.email, name: user.name };

  return { user: safeUser, token };
}

function generateToken(payload: { userId: number}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET_NOT_SET");
  return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
}
