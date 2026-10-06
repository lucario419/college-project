import { count, desc, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { assessments as assessmentsTable, userActivities, userAssessmentProgress, userCourseProgress, userDashboards } from "@/db/schema";
import { assessments, courses } from "@/lib/data/mock-data";

export async function ensureDashboard(userId: string) {
  const [existing] = await db.select().from(userDashboards).where(eq(userDashboards.userId, userId)).limit(1);
  if (existing) return existing;

  await db
    .insert(assessmentsTable)
    .values(assessments.map(({ id, title, category, count, description, status }) => ({ id, title, category, count, description, status })))
    .onConflictDoNothing();

  await db.insert(userDashboards).values({ userId }).onConflictDoNothing();
  const [dashboard] = await db.select().from(userDashboards).where(eq(userDashboards.userId, userId)).limit(1);

  await db
    .insert(userCourseProgress)
    .values(courses.map((course) => ({ dashboardId: dashboard.id, courseId: course.id, title: course.title })))
    .onConflictDoNothing();
  await db
    .insert(userAssessmentProgress)
    .values(assessments.map((assessment) => ({ dashboardId: dashboard.id, assessmentId: assessment.id })))
    .onConflictDoNothing();

  return dashboard;
}

export async function getDashboardData(userId: string) {
  const dashboard = await ensureDashboard(userId);

  const [courseProgress, assessmentRows, activities, [{ value: ahead }]] = await Promise.all([
    db.select().from(userCourseProgress).where(eq(userCourseProgress.dashboardId, dashboard.id)),
    db
      .select({ progress: userAssessmentProgress, assessment: assessmentsTable })
      .from(userAssessmentProgress)
      .innerJoin(assessmentsTable, eq(userAssessmentProgress.assessmentId, assessmentsTable.id))
      .where(eq(userAssessmentProgress.dashboardId, dashboard.id)),
    db
      .select()
      .from(userActivities)
      .where(eq(userActivities.dashboardId, dashboard.id))
      .orderBy(desc(userActivities.createdAt))
      .limit(3),
    db.select({ value: count() }).from(userDashboards).where(gt(userDashboards.points, dashboard.points)),
  ]);

  return {
    ...dashboard,
    courseProgress,
    assessmentProgress: assessmentRows.map(({ progress, assessment }) => ({ ...progress, assessment })),
    activities,
    rank: Number(ahead) + 1,
  };
}
