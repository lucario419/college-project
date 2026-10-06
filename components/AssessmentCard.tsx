import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Assessment = { id: string; title: string; category: "Screening Test" | "Aptitude"; count: number; status: string; score: number | null };

export default function AssessmentCard({ a }: { a: Assessment }) {
  const tone = a.category === "Aptitude" ? "bg-orange-50 text-orange-700" : "bg-indigo-50 text-indigo-700";
  const statusTone = a.status === "Completed" ? "bg-emerald-50 text-emerald-700" : a.status === "In progress" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600";
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>{a.category}</span>
          <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusTone}`}>{a.status}</span>
        </div>
        <h3 className="mt-3 break-words text-base font-semibold text-slate-900">{a.title}</h3>
        {a.score !== null && <p className="mt-2 text-sm text-slate-600">Your score: <span className="font-semibold text-slate-900">{a.score}%</span></p>}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">{a.count} assessments</span>
        <Link href={`/user/assessments/${a.id}`} className="inline-flex items-center gap-0.5 font-medium text-indigo-600">
          Details <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
