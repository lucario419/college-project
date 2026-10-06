import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { judgeTwoSum } from "@/lib/services/assessment-judge";
import { db } from "@/db";
import { userActivities, userAssessmentProgress, userDashboards } from "@/db/schema";

export const runtime = "nodejs";

const submitSchema = z.object({ code: z.string().min(1).max(12_000) });

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, error: { message: "Sign in to submit this assessment." } }, { status: 401 });

  const { slug } = await params;
  if (slug !== "coding-two-sum") return NextResponse.json({ success: false, error: { message: "This assessment does not accept code submissions." } }, { status: 404 });

  const parsed = submitSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false, error: { message: "Enter code under 12,000 characters." } }, { status: 400 });

  const judged = await judgeTwoSum(parsed.data.code);
  const dashboard = await getDashboardData(user.id);
  const previous = dashboard.assessmentProgress.find((item) => item.assessmentId === slug);
  if (!previous) return NextResponse.json({ success: false, error: { message: "Assessment is not assigned to this account." } }, { status: 404 });

  const bestScore = Math.max(previous.score ?? 0, judged.score);
  const complete = bestScore === 100;

  await db.transaction(async (tx) => {
    await tx
      .update(userAssessmentProgress)
      .set({
        score: bestScore,
        status: complete ? "Completed" : "In progress",
        completedAt: complete ? previous.completedAt ?? new Date() : null,
      })
      .where(and(eq(userAssessmentProgress.dashboardId, dashboard.id), eq(userAssessmentProgress.assessmentId, slug)));

    const results = await tx
      .select({ score: userAssessmentProgress.score, status: userAssessmentProgress.status })
      .from(userAssessmentProgress)
      .where(eq(userAssessmentProgress.dashboardId, dashboard.id));
    const completedAssessments = results.filter((item) => item.status === "Completed").length;
    const scored = results.flatMap((item) => item.score === null ? [] : [item.score]);
    const pointsAwarded = Math.max(0, bestScore - (previous.score ?? 0));

    await tx
      .update(userDashboards)
      .set({
        points: sql`${userDashboards.points} + ${pointsAwarded}`,
        completedAssessments,
        codingScore: scored.length ? Math.round(scored.reduce((sum, score) => sum + score, 0) / scored.length) : 0,
        ...(complete ? { weeklyProgress: Math.min(100, dashboard.weeklyProgress + pointsAwarded) } : {}),
      })
      .where(eq(userDashboards.id, dashboard.id));

    if (pointsAwarded > 0) {
      await tx.insert(userActivities).values({
        dashboardId: dashboard.id,
        description: `Earned ${pointsAwarded} points in Coding Assessment: Two Sum`,
      });
    }
  });

  return NextResponse.json({ success: true, data: { ...judged, bestScore, status: complete ? "Completed" : "In progress" } });
}