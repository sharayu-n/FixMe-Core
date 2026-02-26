// src/Routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "../Controllers/auth.controller";
import { requireAuth } from "../Middlewares/auth.middleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth as any, (req: any, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});


export default router;
