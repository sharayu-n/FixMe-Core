import { geminiClient } from "../Utilities/geminiClient";
import { GoalExpertise, GoalPriority } from "../Enums";

class AIService {
  async generateTopics(goal: any) {
    const prompt = this.buildTopicsPrompt(goal);
    const aiResponse = await geminiClient.generate(prompt);
    return this.parseAndNormalizeTopics(aiResponse);
  }

  async generateTasks(topic: any, goal: any) {
    const prompt = this.buildTasksPrompt(topic, goal);
    const aiResponse = await geminiClient.generate(prompt);
    return this.parseAndNormalizeTasks(aiResponse);
  }

  private buildTopicsPrompt(goal: any) {
    return `
Return ONLY valid JSON.

Goal: ${goal.title}
Expertise: ${GoalExpertise[goal.goal_expertise]}

Generate 5 concise learning topics.

Output:
{
  "topics": [
    {
      "title": "",
      "estimated_duration_days": number
    }
  ]
}
`;
  }

  private buildTasksPrompt(topic: any, goal: any) {
    return `
Return ONLY valid JSON.

Goal: ${goal.title}
Topic: ${topic.title}

Generate 5 small executable tasks.

Output:
{
  "tasks": [
    {
      "title": "",
      "estimated_effort_hours": number
    }
  ]
}
`;
  }

  private cleanJson(aiText: string) {
    let cleaned = aiText.trim();

    if (cleaned.startsWith("```")) {
      cleaned = cleaned
        .replace(/^```(?:json)?/i, "")
        .replace(/```$/, "")
        .trim();
    }

    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");

    return match[0];
  }

  private parseAndNormalizeTopics(aiText: string) {
    const json = this.cleanJson(aiText);
    const data = JSON.parse(json);

    if (!Array.isArray(data.topics))
      throw new Error("Invalid topics response");

    return data.topics.map((t: any, index: number) => ({
      title: String(t.title).trim().slice(0, 80),
      estimated_duration_days: Number(t.estimated_duration_days) || 7,
      sequence_order: index + 1,
    }));
  }

  private parseAndNormalizeTasks(aiText: string) {
    const json = this.cleanJson(aiText);
    const data = JSON.parse(json);

    if (!Array.isArray(data.tasks))
      throw new Error("Invalid tasks response");

    return data.tasks.map((t: any, index: number) => ({
      title: String(t.title).trim().slice(0, 120),
      estimated_effort_hours: Number(t.estimated_effort_hours) || 2,
      sequence_order: index + 1,
    }));
  }
}

export const aiService = new AIService();