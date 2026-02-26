import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import goalRoutes from "./goal.routes";
import topicRoutes from "./topic.routes";
import taskRoutes from "./task.routes";
import dailyPlanRoutes from "./dailyPlan.routes";





const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/goals', goalRoutes);
router.use('/goals', topicRoutes);
router.use("/topics", taskRoutes);
router.use("/tasks", taskRoutes);
router.use("/daily-plan", dailyPlanRoutes);


export default router;
