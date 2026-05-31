
import { Request, Response } from "express";
import { createTaskSchema } from "../Schemas/task.schema";
import * as TaskService from "../Services/task.service";

export async function createTask(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const topicId = Number(req.params.topicId);
    if (Number.isNaN(topicId)) {
      return res.status(400).json({ success: false, message: "Invalid topic id" });
    }

    const parsed = createTaskSchema.parse(req.body);

    const task = await TaskService.createTask(req.user.id, topicId, parsed.title);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err: any) {
    if (err?.message === "TOPIC_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Topic not found" });
    }

    if (err?.name === "ZodError") {
      return res.status(400).json({ success: false, message: "Invalid request body" });
    }

    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function completeTask(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false });
    }

    const taskId = Number(req.params.taskId);
    if (Number.isNaN(taskId)) {
      return res.status(400).json({ success: false, message: "Invalid task id" });
    }

    await TaskService.completeTask(req.user.id, taskId);

    return res.status(200).json({ success: true });
  } catch (err: any) {
    if (err?.message === "TASK_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    console.error(err);
    return res.status(500).json({ success: false });
  }
}