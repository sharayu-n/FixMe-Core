import prisma from "../Utilities/prisma";
import { TaskStatus, TopicStatus } from "../Enums";

export async function createTask(
  userId: number,
  topicId: number,
  title: string
) {
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

  const lastTask = await prisma.tasks.findFirst({
    where: { topic_id: topicId },
    orderBy: { sequence_order: "desc" },
  });

  const nextOrder = lastTask ? lastTask.sequence_order + 1 : 1;

  const task = await prisma.tasks.create({
    data: {
      topic_id: topicId,
      title,
      sequence_order: nextOrder,
      status: TaskStatus.NOT_STARTED,
    },
  });

  return task;
}

export async function completeTask(userId: number, taskId: number) {
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

  await prisma.tasks.update({
    where: { id: taskId },
    data: { status: TaskStatus.COMPLETED },
  });

  const topicId = task.topic_id;
  const goalId = task.topics.goal_id;

  const totalTasks = await prisma.tasks.count({
    where: { topic_id: topicId },
  });

  const completedTasks = await prisma.tasks.count({
    where: {
      topic_id: topicId,
      status: TaskStatus.COMPLETED,
    },
  });

  const topicProgress = Math.floor((completedTasks / totalTasks) * 100);

  await prisma.topics.update({
    where: { id: topicId },
    data: {
      progress_percent: topicProgress,
      status:
        topicProgress === 100
          ? TopicStatus.COMPLETED
          : TopicStatus.IN_PROGRESS,
    },
  });

  const totalTopics = await prisma.topics.count({
    where: { goal_id: goalId },
  });

  const completedTopics = await prisma.topics.count({
    where: {
      goal_id: goalId,
      status: TopicStatus.COMPLETED,
    },
  });

  const goalProgress = Math.floor((completedTopics / totalTopics) * 100);

  await prisma.goals.update({
    where: { id: goalId },
    data: {
      progress_percent: goalProgress,
      status: goalProgress === 100 ? 1 : 0,
    },
  });

  return { success: true };
}