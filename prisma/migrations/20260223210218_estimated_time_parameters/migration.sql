/*
  Warnings:

  - Added the required column `goal_expertise` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "goal_expertise" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "estimated_effort_hours" INTEGER;

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "estimated_duration_days" INTEGER;
