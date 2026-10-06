"use client";
import { CheckCircle2, Circle, Play, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Page, diffTone } from "@/components/ui";
import { codeProblems } from "@/lib/data/mock-data";

const difficultyFilters = ["All", "Easy", "Medium", "Hard"] as const;

export default function CodeArenaPage() {
  const [filter, setFilter] = useState<(typeof difficultyFilters)[number]>("All");
  const [selectedId, setSelectedId] = useState(codeProblems[0].id);
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("def two_sum(nums, target):\n    seen = {}\n    for i, value in enumerate(nums):\n        diff = target - value\n        if diff in seen:\n            return [seen[diff], i]\n        seen[value] = i\n    return []\n");

  const filteredProblems = useMemo(
    () => (filter === "All" ? codeProblems : codeProblems.filter((problem) => problem.difficulty === filter)),
    [filter]
  );

  const selectedProblem = filteredProblems.find((problem) => problem.id === selectedId) ?? filteredProblems[0] ?? codeProblems[0];

  return (
    <Page title="CodeArena" sub="Competitive programming environment with problem sets, sandbox execution, and submission tracking.">
      <div className="flex flex-wrap gap-2">
        {difficultyFilters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              item === filter ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="!p-0">
          <div className="divide-y divide-slate-100">
            {filteredProblems.map((problem) => (
              <button
                key={problem.id}
                type="button"
                onClick={() => setSelectedId(problem.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                  selectedProblem.id === problem.id ? "bg-indigo-50" : "hover:bg-slate-50"
                }`}
              >
                {problem.solved ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-300" />}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{problem.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{problem.tags.join(" • ")}</p>
                </div>
                <Badge tone={diffTone(problem.difficulty)}>{problem.difficulty}</Badge>
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{selectedProblem.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{selectedProblem.tags.join(" • ")}</p>
            </div>
            <Badge tone={diffTone(selectedProblem.difficulty)}>{selectedProblem.difficulty}</Badge>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p>{selectedProblem.statement}</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="font-semibold text-slate-900">Input</p>
                <pre className="mt-1 whitespace-pre-wrap">{selectedProblem.input}</pre>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Output</p>
                <pre className="mt-1 whitespace-pre-wrap">{selectedProblem.output}</pre>
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Constraints</p>
              <p className="mt-1">{selectedProblem.constraints}</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Language</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
              >
                <option>Java</option>
                <option>Python</option>
                <option>C++</option>
                <option>JavaScript</option>
                <option>TypeScript</option>
              </select>
            </label>

            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              rows={14}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
            />

            <div className="flex flex-wrap gap-3">
              <Button variant="primary">
                <Play size={16} />
                Run
              </Button>
              <Button variant="secondary">
                <Send size={16} />
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
