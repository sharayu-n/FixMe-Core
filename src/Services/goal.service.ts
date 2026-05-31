import prisma from "../Utilities/prisma";
import { aiService } from "./ai.service";
import {
  GoalPriority,
  GoalExpertise,
  TopicStatus,
  TaskStatus,
} from "../Enums";

export async function createGoal(userId: number, dto: any) {
  return prisma.$transaction(async (tx) => {
    const goal = await tx.goals.create({
      data: {
        user_id: userId,
        title: dto.title,
        description: dto.description ?? null,
        target_start: dto.target_start ? new Date(dto.target_start) : null,
        target_end: dto.target_end ? new Date(dto.target_end) : null,
        priority: dto.priority ?? GoalPriority.MEDIUM,
        goal_expertise: dto.goal_expertise ?? GoalExpertise.BEGINNER,
        status: 0,
        progress_percent: 0,
      },
    });

    const generatedTopics = await aiService.generateTopics(goal);
    const fullTopics = [];

    for (const topic of generatedTopics) {
      const savedTopic = await tx.topics.create({
        data: {
          goal_id: goal.id,
          title: topic.title,
          description: topic.description,
          estimated_duration_days: topic.estimated_duration_days,
          sequence_order: topic.sequence_order,
          status: TopicStatus.NOT_STARTED,
          progress_percent: 0,
        },
      });

      const generatedTasks = await aiService.generateTasks(savedTopic, goal);
      const savedTasks = [];

      for (const task of generatedTasks) {
        const savedTask = await tx.tasks.create({
          data: {
            topic_id: savedTopic.id,
            title: task.title,
            description: task.description,
            estimated_effort_hours: task.estimated_effort_hours,
            sequence_order: task.sequence_order,
            status: TaskStatus.NOT_STARTED,
          },
        });

        savedTasks.push(savedTask);
      }

      fullTopics.push({
        ...savedTopic,
        tasks: savedTasks,
      });
    }

    return {
      goal,
      topics: fullTopics,
    };
  });
}

export async function getById(goalId: number) {
  return prisma.goals.findUnique({
    where: {
      id: goalId,
    },
    include: {
      topics: {
        include: {
          tasks: true,
        },
      },
    },
  });
}