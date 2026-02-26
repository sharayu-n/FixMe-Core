
-- ======================
-- USERS
-- ======================
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "password_hash" TEXT,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "deleted_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");
CREATE UNIQUE INDEX "users_phone_key" ON "users" ("phone");

-- ======================
-- GOALS
-- ======================
CREATE TABLE "goals" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "priority" SMALLINT NOT NULL,
  "target_start" DATE,
  "target_end" DATE,
  "status" SMALLINT NOT NULL,
  "progress_percent" INTEGER NOT NULL DEFAULT 0,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "deleted_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "goals"
ADD CONSTRAINT "goals_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- ======================
-- TOPICS
-- ======================
CREATE TABLE "topics" (
  "id" SERIAL PRIMARY KEY,
  "goal_id" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "sequence_order" INTEGER NOT NULL,
  "status" SMALLINT NOT NULL,
  "progress_percent" INTEGER NOT NULL DEFAULT 0,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "deleted_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "topics"
ADD CONSTRAINT "topics_goal_id_fkey"
FOREIGN KEY ("goal_id") REFERENCES "goals"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- ======================
-- TASKS
-- ======================
CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "topic_id" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "sequence_order" INTEGER NOT NULL,
  "status" SMALLINT NOT NULL,
  "progress_percent" INTEGER NOT NULL DEFAULT 0,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "deleted_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "tasks"
ADD CONSTRAINT "tasks_topic_id_fkey"
FOREIGN KEY ("topic_id") REFERENCES "topics"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- ======================
-- DAILY PLAN TASKS
-- ======================
CREATE TABLE "daily_plan_tasks" (
  "id" SERIAL PRIMARY KEY,
  "task_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "allocated_time" INTEGER NOT NULL,
  "task_order" INTEGER NOT NULL,
  "status" SMALLINT NOT NULL,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "deleted_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "daily_plan_tasks"
ADD CONSTRAINT "daily_plan_tasks_task_id_fkey"
FOREIGN KEY ("task_id") REFERENCES "tasks"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX "daily_plan_tasks_task_id_date_key"
ON "daily_plan_tasks" ("task_id", "date");

-- ======================
-- USER STREAKS
-- ======================
CREATE TABLE "user_streaks" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "current_streak" INTEGER NOT NULL DEFAULT 0,
  "longest_streak" INTEGER NOT NULL DEFAULT 0,
  "last_active_date" DATE,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "deleted_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "user_streaks"
ADD CONSTRAINT "user_streaks_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX "user_streaks_user_id_key"
ON "user_streaks" ("user_id");
