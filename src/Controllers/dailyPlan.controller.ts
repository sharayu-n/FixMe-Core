import { Response } from "express";
import * as DailyPlanService from "../Services/dailyPlan.service";
import { AuthRequest } from "../Middlewares/auth.middleware";

function mapDailyPlanError(err: any) {
  const code = err?.message;

  switch (code) {
    case "TASK_NOT_FOUND":
      return { status: 404, message: "Task not found" };
    case "ITEM_NOT_FOUND":
      return { status: 404, message: "Daily plan item not found" };
    case "TASK_ID_OR_CUSTOM_TITLE_REQUIRED":
      return { status: 400, message: "Task id or custom title is required" };
    default:
      return { status: 500, message: "Server error" };
  }
}

export async function addToToday(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const item = await DailyPlanService.addToTodayBucket(req.user.id, req.body);

    return res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    console.error(err);
    const mapped = mapDailyPlanError(err);
    return res.status(mapped.status).json({
      success: false,
      message: mapped.message,
    });
  }
}

export async function getToday(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const items = await DailyPlanService.getTodayBucket(req.user.id);
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function completeItem(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const itemId = Number(req.params.id);
    if (Number.isNaN(itemId)) {
      return res.status(400).json({ success: false, message: "Invalid item id" });
    }

    const result = await DailyPlanService.completeDailyItem(req.user.id, itemId);

    return res.json({ success: true, data: result });
  } catch (err: any) {
    console.error(err);
    const mapped = mapDailyPlanError(err);
    return res.status(mapped.status).json({
      success: false,
      message: mapped.message,
    });
  }
}