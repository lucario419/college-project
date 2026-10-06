import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

const assessmentQuerySchema = z.object({
  category: z.enum(["All", "Screening Test", "Aptitude"]).optional(),
  search: z.string().optional(),
});

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to view your assessments." } }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = assessmentQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid assessment request" } }, { status: 400 });
  }

  const { category, search } = parsed.data;
  const dashboard = await getDashboardData(user.id);
  const results = dashboard.assessmentProgress.filter(({ assessment }) => {
    const matchesCategory = category === undefined || category === "All" || assessment.category === category;
    const matchesSearch = !search || assessment.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }).map(({ assessment, status, score, completedAt }) => ({
    ...assessment,
    status,
    score,
    completedAt,
  }));

  return NextResponse.json({ success: true, data: results });
}
