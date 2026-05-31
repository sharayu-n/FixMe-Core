import { Response } from "express";
import * as DailyPlanService from "../Services/dailyPlan.service";
import { Request } from "express";

export async function addToToday(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const item = await DailyPlanService.addToTodayBucket(
      req.user.id,
      req.body
    );

    res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function getToday(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const items = await DailyPlanService.getTodayBucket(req.user.id);
  res.json({ success: true, data: items });
}

export async function completeItem(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const result = await DailyPlanService.completeDailyItem(
      req.user.id,
      Number(req.params.id)
    );

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}