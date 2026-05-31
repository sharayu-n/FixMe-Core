import { Router, Request, Response } from "express";
import { register, login } from "../Controllers/auth.controller";
import { requireAuth } from "../Middlewares/auth.middleware";
import { authLimiter } from "../Middlewares/rateLimit.middleware";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

router.get("/me", requireAuth, (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

export default router;