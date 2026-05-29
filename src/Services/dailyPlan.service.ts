import prisma from "../Utilities/prisma";
import { streakService } from "./streak.service";

const PENDING = 0;
const COMPLETED = 1;

export async function addToTodayBucket(
  userId: number,
  data: { task_id?: number; custom_title?: string }
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!data.task_id && !data.custom_title) {
    throw new Error("TASK_ID_OR_CUSTOM_TITLE_REQUIRED");
  }

  let titleSnapshot = data.custom_title ?? null;

  if (data.task_id) {
    const task = await prisma.tasks.findFirst({
      where: {
        id: data.task_id,
        topics: {
          goals: {
            user_id: userId,
          },
        },
      },
    });

    if (!task) throw new Error("TASK_NOT_FOUND");

    titleSnapshot = task.title;
  }

  // find next order
  const lastItem = await prisma.daily_plan_items.findFirst({
    where: { user_id: userId, date: today },
    orderBy: { item_order: "desc" },
  });

  const nextOrder = lastItem ? lastItem.item_order + 1 : 1;

  const item = await prisma.daily_plan_items.create({
    data: {
      user_id: userId,
      task_id: data.task_id ?? null,
      custom_title: titleSnapshot,
      date: today,
      item_order: nextOrder,
      status: PENDING,
    },
  });

  return item;
}

export async function getTodayBucket(userId: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.daily_plan_items.findMany({
    where: { user_id: userId, date: today },
    orderBy: { item_order: "asc" },
  });
}

export async function completeDailyItem(userId: number, itemId: number) {
  const item = await prisma.daily_plan_items.findFirst({
    where: { id: itemId, user_id: userId },
  });

  if (!item) throw new Error("ITEM_NOT_FOUND");

  if (item.status === COMPLETED) return item;

  await prisma.daily_plan_items.update({
    where: { id: itemId },
    data: { status: COMPLETED },
  });

  await streakService.evaluateAndUpdate(userId);

  return { success: true };
}