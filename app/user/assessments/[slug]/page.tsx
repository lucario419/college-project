import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge, Card, Page } from "@/components/ui";
import CodingAssessment from "@/components/CodingAssessment";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function AssessmentDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { slug } = await params;
  const dashboard = await getDashboardData(user.id);
  const result = dashboard.assessmentProgress.find((item) => item.assessmentId === slug);
  if (!result) notFound();

  if (slug === "coding-two-sum") {
    return <CodingAssessment initialScore={result.score} initialStatus={result.status} />;
  }

  return (
    <Page title={result.assessment.title} sub={result.assessment.description ?? "Assessment assigned to your account."}>
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="blue">{result.assessment.category}</Badge>
          <Badge tone={result.status === "Completed" ? "green" : "brand"}>{result.status}</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Tasks</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{result.assessment.count}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Your score</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{result.score === null ? "Not submitted" : `${result.score}%`}</p>
          </div>
        </div>
        <Link href="/user/assessments" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900">Back to your assessments</Link>
      </Card>
    </Page>
  );
}