import { Router } from "express";
import { register, login } from "../Controllers/auth.controller";
import { requireAuth } from "../Middlewares/auth.middleware";
import { authLimiter } from "../Middlewares/rateLimit.middleware";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

router.get("/me", requireAuth as any, (req: any, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

export default router;