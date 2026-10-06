"use client";

import { Search, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Card, Page } from "@/components/ui";

type Entry = {
  id: string;
  userId: string;
  name: string;
  department: string;
  points: number;
  level: number;
  completedAssessments: number;
  codingScore: number;
  weeklyProgress: number;
  rank: number;
};

const tabs = ["All-time", "Monthly", "Weekly"] as const;

export default function LeaderboardTable({ entries, currentUserId }: { entries: Entry[]; currentUserId: string }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [tab, setTab] = useState<(typeof tabs)[number]>("All-time");
  const departments = ["All", ...new Set(entries.map((entry) => entry.department))];
  const rows = useMemo(() => entries.filter((entry) =>
    (department === "All" || entry.department === department) && entry.name.toLowerCase().includes(query.toLowerCase())
  ), [department, entries, query]);

  return (
    <Page title="Leaderboard" sub="Student ranking, assessment results, and progress across your cohort.">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative block w-full max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100" />
        </label>
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`rounded-full px-3 py-1.5 text-sm font-medium ${tab === item ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {departments.map((item) => (
          <button key={item} onClick={() => setDepartment(item)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${department === item ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
            {item}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Rank</th>
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Points</th>
                <th className="px-5 py-3 font-medium">Level</th>
                <th className="px-5 py-3 font-medium">Completed assessments</th>
                <th className="px-5 py-3 font-medium">Coding score</th>
                <th className="px-5 py-3 font-medium">Weekly progress</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((entry) => {
                const isCurrentUser = entry.userId === currentUserId;
                return (
                  <tr key={entry.id} className={isCurrentUser ? "bg-indigo-50/70" : "border-t border-slate-100 hover:bg-slate-50"}>
                    <td className="px-5 py-3">{entry.rank <= 3 ? <Trophy size={16} className="text-orange-500" /> : entry.rank}</td>
                    <td className="px-5 py-3 font-medium text-slate-900">{entry.name}{isCurrentUser && <span className="ml-2 text-xs font-medium text-indigo-700">(You)</span>}</td>
                    <td className="px-5 py-3"><Badge tone={entry.rank <= 3 ? "orange" : "brand"}>{entry.department}</Badge></td>
                    <td className="px-5 py-3">{entry.points}</td>
                    <td className="px-5 py-3">Lv{entry.level}</td>
                    <td className="px-5 py-3">{entry.completedAssessments}</td>
                    <td className="px-5 py-3">{entry.codingScore}</td>
                    <td className="px-5 py-3">{entry.weeklyProgress}%</td>
                  </tr>
                );
              })}
              {!rows.length && <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-500">No students match this search.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}