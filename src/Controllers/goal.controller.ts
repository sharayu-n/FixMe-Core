// src/Controllers/goal.controller.ts
import { Response } from "express";
import { createGoalSchema } from "../Schemas/goal.schema";
import * as GoalService from "../Services/goal.service";
import { AuthRequest } from "../Middlewares/auth.middleware";

export async function createGoal(req: AuthRequest, res: Response) {
  try {
    const parsed = createGoalSchema.parse(req.body);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await GoalService.createGoal(
      req.user.id,
      parsed // pass full object
    );

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
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