
import { createGoalSchema } from "../Schemas/goal.schema";
import * as GoalService from "../Services/goal.service";
import { Request, Response } from "express";

export async function createGoal(req: Request, res: Response) {
  try {
    const parsed = createGoalSchema.parse(req.body);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await GoalService.createGoal(req.user.id, parsed);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: err.errors,
      });
    }

    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const goalId = Number(req.params.goalId);

    if (Number.isNaN(goalId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid goal id",
      });
    }

    const goal = await GoalService.getById(goalId);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    if (goal.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    return res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}