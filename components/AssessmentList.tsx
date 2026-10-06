"use client";

import { FileSearch, Search } from "lucide-react";
import { useMemo, useState } from "react";
import AssessmentCard from "@/components/AssessmentCard";
import { Page } from "@/components/ui";

type AssessmentItem = {
  id: string;
  title: string;
  category: "Screening Test" | "Aptitude";
  count: number;
  status: string;
  score: number | null;
};

const filters = ["All", "Screening Test", "Aptitude"] as const;

export default function AssessmentList({ assessments }: { assessments: AssessmentItem[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const results = useMemo(() => assessments.filter((assessment) =>
    (filter === "All" || assessment.category === filter) && assessment.title.toLowerCase().includes(query.toLowerCase())
  ), [assessments, filter, query]);

  return (
    <Page title="Assessments" sub="Your assigned assessments and personal results.">
      <div className="space-y-4">
        <label className="relative block max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assessments..." className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100" />
        </label>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === item ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
              {item} ({item === "All" ? assessments.length : assessments.filter((assessment) => assessment.category === item).length})
            </button>
          ))}
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((assessment) => <AssessmentCard key={assessment.id} a={assessment} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
          <FileSearch className="mx-auto mb-3" />
          <p className="font-medium text-slate-700">No assessments matched your search.</p>
          <p className="mt-1 text-sm text-slate-500">Try a different keyword or clear the filter.</p>
        </div>
      )}
    </Page>
  );
}