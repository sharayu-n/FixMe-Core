import prisma from "../Utilities/prisma";
import { streakService } from "./streak.service";
export async function createTask(
  userId: number,
  topicId: number,
  title: string
) {
  // 1️⃣ Verify topic belongs to logged-in user
  const topic = await prisma.topics.findFirst({
    where: {
      id: topicId,
      goals: {
        user_id: userId,
      },
    },
  });

  if (!topic) {
    throw new Error("TOPIC_NOT_FOUND");
  }

  // 2️⃣ Find max sequence order
  const lastTask = await prisma.tasks.findFirst({
    where: { topic_id: topicId },
    orderBy: { sequence_order: "desc" },
  });

  const nextOrder = lastTask ? lastTask.sequence_order + 1 : 1;

  // 3️⃣ Create task
  const task = await prisma.tasks.create({
    data: {
      topic_id: topicId,
      title,
      sequence_order: nextOrder,
      status: 0,
    },
  });

  return task;
}

export async function completeTask(userId: number, taskId: number) {
  // 1️⃣ Verify task belongs to logged-in user
  const task = await prisma.tasks.findFirst({
    where: {
      id: taskId,
      topics: {
        goals: {
          user_id: userId,
        },
      },
    },
    include: {
      topics: {
        include: {
          goals: true,
        },
      },
    },
  });

  if (!task) {
    throw new Error("TASK_NOT_FOUND");
  }

  // 2️⃣ Mark task as completed
  await prisma.tasks.update({
    where: { id: taskId },
    data: { status: 1 },
  });

  const topicId = task.topic_id;
  const goalId = task.topics.goal_id;

  // 3️⃣ Recalculate topic progress
  const totalTasks = await prisma.tasks.count({
    where: { topic_id: topicId },
  });

  const completedTasks = await prisma.tasks.count({
    where: {
      topic_id: topicId,
      status: 1,
    },
  });

  const topicProgress = Math.floor(
    (completedTasks / totalTasks) * 100
  );

  await prisma.topics.update({
    where: { id: topicId },
    data: {
      progress_percent: topicProgress,
      status: topicProgress === 100 ? 1 : 0,
    },
  });

  // 4️⃣ Recalculate goal progress
  const totalTopics = await prisma.topics.count({
    where: { goal_id: goalId },
  });

  const completedTopics = await prisma.topics.count({
    where: {
      goal_id: goalId,
      status: 1,
    },
  });

  const goalProgress = Math.floor(
    (completedTopics / totalTopics) * 100
  );

  await prisma.goals.update({
    where: { id: goalId },
    data: {
      progress_percent: goalProgress,
      status: goalProgress === 100 ? 1 : 0,
    },
  });


  return { success: true };
}

