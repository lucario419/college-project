import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { userDashboards, users } from "@/db/schema";
import { getTierSnapshot } from "@/lib/utils/tier";

export async function getLeaderboardData() {
  const points = sql<number>`coalesce(${userDashboards.points}, 0)`;
  const completedAssessments = sql<number>`coalesce(${userDashboards.completedAssessments}, 0)`;

  const students = await db
    .select({
      userId: users.id,
      name: users.name,
      points,
      completedAssessments,
      codingScore: sql<number>`coalesce(${userDashboards.codingScore}, 0)`,
      weeklyProgress: sql<number>`coalesce(${userDashboards.weeklyProgress}, 0)`,
    })
    .from(users)
    .leftJoin(userDashboards, eq(userDashboards.userId, users.id))
    .where(eq(users.role, "STUDENT"))
    .orderBy(desc(points), desc(completedAssessments), asc(sql`coalesce(${userDashboards.updatedAt}, ${users.createdAt})`));

  return students.map((student, index) => ({
    id: student.userId,
    userId: student.userId,
    name: student.name,
    department: "Student",
    points: Number(student.points),
    level: getTierSnapshot(Number(student.points)).currentLevel,
    completedAssessments: Number(student.completedAssessments),
    codingScore: Number(student.codingScore),
    weeklyProgress: Number(student.weeklyProgress),
    rank: index + 1,
  }));
}
