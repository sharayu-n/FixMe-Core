import prisma from "../Utilities/prisma";

export async function createTopic(
  userId: number,
  goalId: number,
  title: string
) {
  // 1️⃣ Verify goal belongs to user
  const goal = await prisma.goals.findFirst({
    where: {
      id: goalId,
      user_id: userId,
    },
  });

  if (!goal) {
    throw new Error("GOAL_NOT_FOUND");
  }

  // 2️⃣ Find max sequence order
  const lastTopic = await prisma.topics.findFirst({
    where: { goal_id: goalId },
    orderBy: { sequence_order: "desc" },
  });

  const nextOrder = lastTopic ? lastTopic.sequence_order + 1 : 1;

  // 3️⃣ Create topic
  const topic = await prisma.topics.create({
    data: {
      goal_id: goalId,
      title,
      sequence_order: nextOrder,
      status: 0,
      progress_percent: 0,
    },
  });

  return topic;
}
