"use client";

import { CheckCircle2, Circle, Code2, FileCode2, LoaderCircle, Maximize2, Play, RotateCcw, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button } from "@/components/ui";

const starterCode = `function twoSum(nums, target) {
  // Return the indices of two values that add up to target.

}
`;

const samples = [
  { label: "Case 1", input: "nums = [2, 7, 11, 15]\ntarget = 9", output: "[0, 1]" },
  { label: "Case 2", input: "nums = [3, 2, 4]\ntarget = 6", output: "[1, 2]" },
];

type JudgeData = {
  passed: number;
  total: number;
  score: number;
  cases: Array<{ passed: boolean }>;
  error?: string;
  errorType?: "syntax" | "runtime" | "timeout" | "entrypoint";
  errorLine?: number;
  bestScore?: number;
  status?: string;
};

export default function CodingAssessment({ initialScore, initialStatus }: { initialScore: number | null; initialStatus: string }) {
  const router = useRouter();
  const workspaceRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useState(starterCode);
  const [result, setResult] = useState<JudgeData | null>(null);
  const [mode, setMode] = useState<"run" | "submit" | null>(null);
  const [requestError, setRequestError] = useState("");
  const [selectedCase, setSelectedCase] = useState(0);
  const lineCount = Math.max(1, code.split("\n").length);

  async function execute(action: "run" | "submit") {
    setMode(action);
    setRequestError("");
    try {
      const response = await fetch(`/api/assessments/coding-two-sum/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.error?.message ?? "The code could not be evaluated.");
      setResult(payload.data as JudgeData);
      setSelectedCase(payload.data.error ? -1 : 0);
      if (action === "submit") router.refresh();
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "The request failed.");
    } finally {
      setMode(null);
    }
  }

  function goToErrorLine(line: number) {
    const editor = editorRef.current;
    if (!editor) return;
    const lineStart = code.split("\n").slice(0, Math.max(0, line - 1)).join("\n").length + (line > 1 ? 1 : 0);
    const lineEnd = code.indexOf("\n", lineStart);
    editor.focus();
    editor.setSelectionRange(lineStart, lineEnd === -1 ? code.length : lineEnd);
    editor.scrollTop = Math.max(0, (line - 1) * 24 - editor.clientHeight / 2);
  }

  function handleEditorKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const editor = event.currentTarget;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const updated = `${code.slice(0, start)}  ${code.slice(end)}`;
    setCode(updated);
    requestAnimationFrame(() => {
      editor.selectionStart = start + 2;
      editor.selectionEnd = start + 2;
    });
  }

  async function toggleFullscreen() {
    if (!workspaceRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await workspaceRef.current.requestFullscreen();
  }

  const selectedResult = result?.cases[selectedCase];

  return (
    <section ref={workspaceRef} className="space-y-3 bg-slate-100 text-slate-800">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-700"><Code2 size={18} /></span>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-900">Two Sum</h1>
            <p className="text-xs text-slate-500">Coding assessment</p>
          </div>
          <Badge tone="green">Easy</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Best score <strong className="text-slate-800">{initialScore === null ? "--" : `${initialScore}%`}</strong></span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <span>Status <strong className="text-slate-800">{initialStatus}</strong></span>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-205px)] gap-3 xl:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)]">
        <section aria-labelledby="problem-title" className="min-h-[460px] overflow-y-auto border border-slate-200 bg-white">
          <div className="sticky top-0 z-10 flex h-11 items-center gap-5 border-b border-slate-200 bg-slate-50 px-4 text-sm">
            <span className="inline-flex h-full items-center gap-2 border-b-2 border-indigo-600 font-medium text-slate-900"><FileCode2 size={15} /> Description</span>
            <span className="text-slate-400">Submissions</span>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="problem-title" className="mr-2 text-xl font-bold text-slate-900">Two Sum</h2>
                <Badge tone="green">Easy</Badge>
                <Badge tone="orange">Array · Hash map</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Given an array of integers <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">nums</code> and an integer <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">target</code>, return the indices of the two numbers whose values add up to the target.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">You may assume that each input has exactly one solution, and you may not use the same element twice. Return the indices in any order.</p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-slate-900">Example 1</h3>
                <pre className="mt-2 overflow-x-auto border-l-2 border-indigo-200 bg-slate-50 px-4 py-3 font-mono text-[13px] leading-6 text-slate-700">Input: nums = [2, 7, 11, 15], target = 9{"\n"}Output: [0, 1]{"\n"}Explanation: nums[0] + nums[1] = 9.</pre>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example 2</h3>
                <pre className="mt-2 overflow-x-auto border-l-2 border-indigo-200 bg-slate-50 px-4 py-3 font-mono text-[13px] leading-6 text-slate-700">Input: nums = [3, 2, 4], target = 6{"\n"}Output: [1, 2]</pre>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-sm text-slate-600">
              <h3 className="font-semibold text-slate-900">Constraints</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>2 ≤ nums.length ≤ 10,000</li>
                <li>-1,000,000,000 ≤ nums[i], target ≤ 1,000,000,000</li>
                <li>Exactly one valid answer exists.</li>
              </ul>
              <p className="mt-4">Implement <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">twoSum(nums, target)</code> in JavaScript.</p>
            </div>
          </div>
        </section>

        <section aria-label="Code editor and tests" className="grid min-h-[650px] min-w-0 grid-rows-[minmax(340px,1fr)_minmax(220px,0.58fr)] gap-2 xl:min-h-0">
          <div className="grid min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[44px_minmax(0,1fr)] overflow-hidden border border-[#333] bg-[#1e1e1e]">
            <div className="flex items-center justify-between gap-3 border-b border-[#343434] bg-[#252526] px-3">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <span className="font-medium">Code</span>
                <span className="text-slate-600">/</span>
                <span className="rounded bg-[#343536] px-2 py-1 text-xs">JavaScript</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => { setCode(starterCode); setResult(null); setRequestError(""); }} title="Reset code" aria-label="Reset code" className="grid h-8 w-8 place-items-center rounded text-slate-400 hover:bg-[#3a3a3a] hover:text-white">
                  <RotateCcw size={15} />
                </button>
                <button type="button" onClick={toggleFullscreen} title="Toggle fullscreen" aria-label="Toggle editor fullscreen" className="grid h-8 w-8 place-items-center rounded text-slate-400 hover:bg-[#3a3a3a] hover:text-white">
                  <Maximize2 size={15} />
                </button>
                <Button type="button" variant="secondary" onClick={() => execute("run")} disabled={mode !== null} className="h-8 rounded-md px-3 py-1 text-xs">
                  {mode === "run" ? <LoaderCircle size={14} className="animate-spin" /> : <Play size={14} />}
                  Run
                </Button>
                <Button type="button" onClick={() => execute("submit")} disabled={mode !== null} className="h-8 rounded-md bg-emerald-600 px-3 py-1 text-xs hover:bg-emerald-700 focus:ring-emerald-200">
                  {mode === "submit" ? <LoaderCircle size={14} className="animate-spin" /> : <Send size={14} />}
                  Submit
                </Button>
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[42px_minmax(0,1fr)] overflow-hidden py-2 font-mono text-[13px] leading-6">
              <div aria-hidden="true" className="select-none overflow-hidden border-r border-[#333] pr-3 text-right text-[#858585]">
                {Array.from({ length: lineCount }, (_, index) => <div key={index}>{index + 1}</div>)}
              </div>
              <textarea
                ref={editorRef}
                id="solution"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onKeyDown={handleEditorKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="JavaScript solution editor"
                className="h-full min-h-0 min-w-0 w-full resize-none overflow-auto bg-transparent px-4 text-[#d4d4d4] outline-none placeholder:text-[#858585]"
              />
            </div>
          </div>

          <section aria-labelledby="testcase-title" className="grid min-h-0 grid-rows-[42px_38px_minmax(0,1fr)] overflow-hidden border border-[#333] bg-[#1e1e1e] text-slate-200">
            <div className="flex items-center justify-between border-b border-[#343434] bg-[#252526] px-4">
              <h2 id="testcase-title" className="text-xs font-semibold uppercase tracking-wide text-slate-300">Testcase</h2>
              {result && !result.error && <span className={`text-xs font-medium ${result.passed === result.total ? "text-emerald-400" : "text-amber-400"}`}>{result.passed}/{result.total} passed · {result.score}%</span>}
            </div>
            <div className="flex items-stretch gap-1 border-b border-[#343434] px-2">
              {samples.map((sample, index) => (
                <button key={sample.label} type="button" onClick={() => setSelectedCase(index)} className={`border-b-2 px-3 text-xs ${selectedCase === index ? "border-emerald-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
                  {sample.label}
                </button>
              ))}
              {result && <button type="button" onClick={() => setSelectedCase(-1)} className={`border-b-2 px-3 text-xs ${selectedCase === -1 ? "border-emerald-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}>Results</button>}
            </div>

            <div className="min-h-0 overflow-auto p-4 text-xs">
              {requestError && <p className="rounded-md border border-red-900/70 bg-red-950/40 p-3 text-red-300">{requestError}</p>}
              {result?.error && (
                <div role="alert" className="space-y-3 rounded-md border border-red-900/70 bg-red-950/40 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-red-200">
                      {result.errorType === "syntax" ? "Syntax error" : result.errorType === "runtime" ? "Runtime error" : result.errorType === "timeout" ? "Time limit exceeded" : result.errorType === "entrypoint" ? "Function not found" : "Code error"}
                      {result.errorLine ? ` on line ${result.errorLine}` : ""}
                    </p>
                    {result.errorLine && <button type="button" onClick={() => goToErrorLine(result.errorLine!)} className="rounded border border-red-800 px-2 py-1 text-xs font-medium text-red-200 hover:bg-red-900/60">Go to line {result.errorLine}</button>}
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-red-300">{result.error}</pre>
                  {result.errorType === "entrypoint" && <p className="text-xs text-red-200">Add a function named <code className="rounded bg-red-950 px-1">twoSum(nums, target)</code> before running your solution.</p>}
                </div>
              )}
              {!requestError && !result?.error && selectedCase >= 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Input</p>
                    <pre className="min-h-20 whitespace-pre-wrap rounded-md bg-[#111827] p-3 font-mono leading-5 text-slate-200">{samples[selectedCase].input}</pre>
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Expected output</p>
                    <pre className="min-h-20 whitespace-pre-wrap rounded-md bg-[#111827] p-3 font-mono leading-5 text-slate-200">{samples[selectedCase].output}</pre>
                  </div>
                  {selectedResult && (
                    <div className="flex items-center gap-2 sm:col-span-2">
                      {selectedResult.passed ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Circle size={15} className="text-amber-400" />}
                      <span className={selectedResult.passed ? "text-emerald-300" : "text-amber-300"}>{selectedResult.passed ? "Sample passed" : "Sample failed"}</span>
                    </div>
                  )}
                </div>
              )}
              {!requestError && result && selectedCase === -1 && !result.error && (
                <div className="space-y-2">
                  {result.cases.map((test, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-md bg-[#252526] px-3 py-2">
                      {test.passed ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Circle size={15} className="text-amber-400" />}
                      <span className="text-slate-300">{index < samples.length ? `Sample case ${index + 1}` : `Hidden case ${index - samples.length + 1}`}</span>
                      <span className={`ml-auto ${test.passed ? "text-emerald-300" : "text-amber-300"}`}>{test.passed ? "Passed" : "Failed"}</span>
                    </div>
                  ))}
                  {mode === null && result.status === "Completed" && <p className="pt-2 text-emerald-300">Assessment submitted. Your score and leaderboard points are saved.</p>}
                </div>
              )}
              {!requestError && !result && <p className="text-slate-500">Run your code to see test results here.</p>}
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}