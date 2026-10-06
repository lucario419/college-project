"use client";
import { useState } from "react";
import { Play, FileCode2 } from "lucide-react";
import { Page, Card, Btn } from "@/components/ui";

const CODE = `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("LMS"));`;

export default function Codespace() {
  const [out, setOut] = useState("");
  return (
    <Page title="Codespace" sub="A scratch editor for quick experiments.">
      <Card className="overflow-hidden !p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"><FileCode2 size={16} className="text-indigo-600" />main.js</span>
          <Btn onClick={() => setOut("Hello, LMS!")}><Play size={14} /> Run</Btn>
        </div>
        <pre className="overflow-x-auto bg-slate-900 p-4 text-sm text-slate-100"><code>{CODE}</code></pre>
        <div className="border-t border-slate-800 bg-slate-950 p-4 font-mono text-sm text-emerald-400">
          {out ? `> ${out}` : <span className="text-slate-500">Output appears here after you run the file.</span>}
        </div>
      </Card>
      <p className="text-xs text-slate-500">The editor is read-only and the output is fixed. Connect a code runner to execute real code.</p>
    </Page>
  );
}
