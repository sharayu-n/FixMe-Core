import prisma from "../Utilities/prisma";

class StreakService {
  async evaluateAndUpdate(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 1️⃣ Get today's daily plan items
    const todaysItems = await prisma.daily_plan_items.findMany({
      where: {
        user_id: userId,
        date: today,
      },
    });

    if (todaysItems.length === 0) return;

    const totalTasks = todaysItems.length;
    const completedTasks = todaysItems.filter(
      (item) => item.status === 1
    ).length;

    const required = Math.ceil(totalTasks / 2);

    if (completedTasks < required) return;

    // 2️⃣ Fetch streak record
    let streak = await prisma.user_streaks.findUnique({
      where: { user_id: userId },
    });

    if (!streak) {
      streak = await prisma.user_streaks.create({
        data: {
          user_id: userId,
          current_streak: 1,
          longest_streak: 1,
          last_active_date: today,
        },
      });
      return;
    }

    // 3️⃣ If already counted today → do nothing
    if (
      streak.last_active_date &&
      streak.last_active_date.toISOString().slice(0, 10) ===
        today.toISOString().slice(0, 10)
    ) {
      return;
    }

    let newStreak = 1;

    // 4️⃣ If yesterday → increment
    if (
      streak.last_active_date &&
      streak.last_active_date.toISOString().slice(0, 10) ===
        yesterday.toISOString().slice(0, 10)
    ) {
      newStreak = streak.current_streak + 1;
    }

    const newLongest =
      newStreak > streak.longest_streak
        ? newStreak
        : streak.longest_streak;

    await prisma.user_streaks.update({
      where: { user_id: userId },
      data: {
        current_streak: newStreak,
        longest_streak: newLongest,
        last_active_date: today,
      },
    });
  }
}

export const streakService = new StreakService();