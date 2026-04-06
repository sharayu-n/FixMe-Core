# 🚀 FixMe : Productivity Focused Microservices Platform

> AI-Powered Productivity Platform built with a Microservices Architecture  
> Transforming high-level goals into structured execution roadmaps with deterministic streak enforcement and analytics.

---

## 📌 Overview

FixMe is a backend-first productivity system that converts user-defined goals into structured execution plans using Generative AI, enforces consistent daily execution through a threshold-based streak engine, and separates core logic from analytics via microservice boundaries.

The system was designed with production engineering principles in mind — focusing on idempotent state transitions, service separation, API contract control (DTOs), and quota-aware AI orchestration.

---

# 🏗 Architecture

FixMe follows a modular microservice architecture:

FixMe-core-service        → Port 3000  
FixMe-analytics-service   → Port 4000  
FixMe-notification-service (planned)

---

## 1️⃣ Core Service (discipline-core-service)

### Responsibilities:
- User Authentication (JWT)
- Goal Management
- AI Roadmap Generation
- Topic & Task Persistence
- Daily Planning System
- Streak Engine

### Tech Stack:
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation
- Layered Architecture (Controller → Service → DTO)

---

## 2️⃣ Analytics Service (FixMe-analytics-service)

### Responsibilities:
- Weekly task completion aggregation
- Productivity metrics
- Completion rate calculations
- Heatmap-ready data

This service runs independently and connects to the same PostgreSQL database in read-only mode to simulate microservice data separation.

---

## 3️⃣ Notification Service (Planned)

Future service to support:
- Morning motivation reminders
- Evening task alerts
- Missed streak notifications
- Cron-based user activity checks

---

# 🤖 AI Roadmap Engine

The system integrates Gemini API to:

- Convert user goals into structured topics
- Generate executable tasks per topic
- Enforce strict JSON-only outputs
- Normalize AI responses before persistence
- Optimize token usage to avoid quota exhaustion

### Engineering Decisions

- Reduced prompt verbosity to lower token consumption
- Consolidated AI calls where possible
- Implemented strict JSON extraction to prevent malformed responses
- Designed AI service as a pure orchestration layer (no DB coupling)

---

# 📚 Domain Model

Relational database structure using Prisma schema:

- users
- goals
- topics
- tasks
- daily_plan_items
- user_streaks

Designed to ensure:

- Strict user-level isolation
- Snapshot-based daily task persistence
- Deterministic progress tracking
- Clean relational mapping

---

# 🔥 Streak Engine (Idempotent Logic)

The streak system uses a threshold-based qualification rule:

completed ≥ ceil(total_tasks / 2)

### Guarantees:

- No duplicate increments
- Idempotent daily updates
- Prevents race-condition streak inflation
- Maintains:
  - current_streak
  - longest_streak
  - last_active_date

This ensures consistent state transitions even under repeated task completion events.

---

# 📅 Daily Planning System

### Endpoints:
- Add task to daily bucket
- Retrieve today's bucket
- Complete daily item (triggers streak evaluation)



# 🧠 Why Prisma?

Prisma was chosen because:

- Type-safe ORM
- Clear relational modeling
- Migration support
- Auto-generated client
- Enforces schema-driven development
- Clean separation between database and business logic

Prisma schema acts as the single source of truth for the system’s data model.

---

# 🔐 Authentication Strategy

- JWT-based authentication
- Middleware-level protection
- Ownership validation in all data queries
- Multi-tenant data isolation via user_id scoping

---

# 📊 Engineering Principles Applied

- Service boundary separation
- Idempotent business logic
- Snapshot-based persistence
- DTO-based API contracts
- AI quota optimization
- Clean error handling middleware
- Microservice extensibility design

---

FixMe demonstrates:

- Distributed system thinking
- AI integration in backend architecture
- Deterministic state management
- Multi-service separation
- Production-grade data modeling
- Quota-aware external API integration

---

# 📬 Contact

If you'd like to discuss system design, backend architecture, or AI integration, feel free to connect.
