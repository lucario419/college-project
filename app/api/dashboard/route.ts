import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { getLeaderboardData } from "@/lib/leaderboard-data";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to view your dashboard." } }, { status: 401 });
  }

  const [dashboard, leaderboard] = await Promise.all([getDashboardData(user.id), getLeaderboardData()]);
  const activeCourses = dashboard.courseProgress.filter((course) => course.progress > 0 && course.progress < 100).length;

  return NextResponse.json({
    success: true,
    data: {
      profile: { id: user.id, name: user.name, email: user.email, role: user.role, points: dashboard.points },
      stats: {
        activeCourses,
        upcomingAssessments: dashboard.assessmentProgress.filter((item) => item.status !== "Completed").length,
        completedAssessments: dashboard.completedAssessments,
        leaderboardRank: leaderboard.find((entry) => entry.userId === user.id)?.rank ?? leaderboard.length + 1,
      },
      leaderboard: leaderboard.slice(0, 5),
    },
  });
}
