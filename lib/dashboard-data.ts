import { assessments, courses } from "@/lib/data/mock-data";
import { prisma } from "@/lib/db";

export async function getDashboardData(userId: string) {
  let dashboard = await prisma.userDashboard.findUnique({ where: { userId } });

  if (!dashboard) {
    try {
      dashboard = await prisma.userDashboard.create({
        data: {
          userId,
          courseProgress: {
            create: courses.map((course) => ({ courseId: course.id, title: course.title })),
          },
          assessmentProgress: {
            create: assessments.map((assessment) => ({ assessmentId: assessment.id })),
          },
        },
      });
    } catch (error) {
      dashboard = await prisma.userDashboard.findUnique({ where: { userId } });
      if (!dashboard) throw error;
    }
  }

  const dashboardWithProgress = await prisma.userDashboard.findUniqueOrThrow({
    where: { id: dashboard.id },
    include: {
      courseProgress: true,
      assessmentProgress: { include: { assessment: true } },
      activities: { orderBy: { createdAt: "desc" }, take: 3 },
    },
  });
  const rank = (await prisma.userDashboard.count({
    where: { points: { gt: dashboardWithProgress.points } },
  })) + 1;

  return { ...dashboardWithProgress, rank };
}