import { index, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

const id = () => text().primaryKey().$defaultFn(() => crypto.randomUUID());
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

export const users = pgTable("users", {
  id: id(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  studentId: text("student_id").unique(),
  role: text().notNull().default("STUDENT"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: id(),
    tokenHash: text("token_hash").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: createdAt(),
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)],
);

export const assessments = pgTable("assessments", {
  id: text().primaryKey(),
  title: text().notNull(),
  category: text().notNull(),
  count: integer().notNull().default(0),
  description: text(),
  status: text().notNull().default("Open"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const userDashboards = pgTable("user_dashboards", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  points: integer().notNull().default(0),
  codingStreak: integer("coding_streak").notNull().default(0),
  weeklyProgress: integer("weekly_progress").notNull().default(0),
  completedAssessments: integer("completed_assessments").notNull().default(0),
  codingScore: integer("coding_score").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const userCourseProgress = pgTable(
  "user_course_progress",
  {
    id: id(),
    dashboardId: text("dashboard_id")
      .notNull()
      .references(() => userDashboards.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    title: text().notNull(),
    progress: integer().notNull().default(0),
    updatedAt: updatedAt(),
  },
  (table) => [uniqueIndex("user_course_progress_dashboard_course_idx").on(table.dashboardId, table.courseId)],
);

export const userActivities = pgTable(
  "user_activities",
  {
    id: id(),
    dashboardId: text("dashboard_id")
      .notNull()
      .references(() => userDashboards.id, { onDelete: "cascade" }),
    description: text().notNull(),
    createdAt: createdAt(),
  },
  (table) => [index("user_activities_dashboard_created_idx").on(table.dashboardId, table.createdAt)],
);

export const userAssessmentProgress = pgTable(
  "user_assessment_progress",
  {
    id: id(),
    dashboardId: text("dashboard_id")
      .notNull()
      .references(() => userDashboards.id, { onDelete: "cascade" }),
    assessmentId: text("assessment_id")
      .notNull()
      .references(() => assessments.id, { onDelete: "cascade" }),
    status: text().notNull().default("Not started"),
    score: integer(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: updatedAt(),
  },
  (table) => [uniqueIndex("user_assessment_progress_dashboard_assessment_idx").on(table.dashboardId, table.assessmentId)],
);

export type User = typeof users.$inferSelect;
