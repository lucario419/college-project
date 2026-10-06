import { redirect } from "next/navigation";
import AssessmentList from "@/components/AssessmentList";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function AssessmentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dashboard = await getDashboardData(user.id);
  const assessments = dashboard.assessmentProgress.map(({ assessment, status, score }) => ({
    id: assessment.id,
    title: assessment.title,
    category: assessment.category as "Screening Test" | "Aptitude",
    count: assessment.count,
    status,
    score,
  }));

  return <AssessmentList assessments={assessments} />;
}