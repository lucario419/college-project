import { getTierSnapshot } from "@/lib/utils/tier";
import { prisma } from "@/lib/db";

export async function getLeaderboardData() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    select: { id: true },
  });

  for (const student of students) {
    const dashboard = await prisma.userDashboard.findUnique({ where: { userId: student.id } });
    if (!dashboard) {
      try {
        await prisma.userDashboard.create({ data: { userId: student.id } });
      } catch (error) {
        const createdConcurrently = await prisma.userDashboard.findUnique({ where: { userId: student.id } });
        if (!createdConcurrently) throw error;
      }
    }
  }

  const dashboards = await prisma.userDashboard.findMany({
    where: { user: { role: "STUDENT" } },
    include: { user: { select: { id: true, name: true } } },
    orderBy: [{ points: "desc" }, { completedAssessments: "desc" }, { updatedAt: "asc" }],
  });

  return dashboards.map((dashboard, index) => ({
    id: dashboard.userId,
    userId: dashboard.userId,
    name: dashboard.user.name,
    department: "Student",
    points: dashboard.points,
    level: getTierSnapshot(dashboard.points).currentLevel,
    completedAssessments: dashboard.completedAssessments,
    codingScore: dashboard.codingScore,
    weeklyProgress: dashboard.weeklyProgress,
    rank: index + 1,
  }));
}