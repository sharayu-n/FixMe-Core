import { Response } from "express";
import { AuthRequest } from "../Middlewares/auth.middleware";
import { createTopicSchema } from "../Schemas/topic.schema";
import * as TopicService from "../Services/topic.service";

export async function createTopic(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const goalId = Number(req.params.goalId);
    const parsed = createTopicSchema.parse(req.body);

    const topic = await TopicService.createTopic(
      req.user.id,
      goalId,
      parsed.title
    );

    return res.status(201).json({
      success: true,
      data: topic,
    });
  } catch (err: any) {
    if (err.message === "GOAL_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }

    if (err.name === "ZodError") {
      return res.status(400).json({ success: false });
    }

    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
