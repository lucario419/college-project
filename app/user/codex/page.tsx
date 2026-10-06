"use client";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button, Card, Page } from "@/components/ui";
import { MockAIService } from "@/lib/services/ai-service";

const prompts = ["Explain binary search", "Explain the bug in my loop", "Analyze complexity of this sort", "Generate a hint for this recursion problem"];

export default function CodeXPage() {
  const [prompt, setPrompt] = useState(prompts[0]);
  const [response, setResponse] = useState<string>("");
  const service = new MockAIService();

  const handleGenerate = async () => {
    const result = await service.explainCode({ code: "function binarySearch(arr, target) { let low = 0; let high = arr.length - 1; while (low <= high) { const mid = Math.floor((low + high) / 2); if (arr[mid] === target) return mid; if (arr[mid] < target) low = mid + 1; else high = mid - 1; } return -1; }", language: "JavaScript" });
    setResponse(result);
  };

  return (
    <Page title="CodeX" sub="AI-assisted code explanation, debugging, complexity analysis, and guided hints.">
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {prompts.map((item) => (
            <button
              key={item}
              onClick={() => setPrompt(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                item === prompt ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={4}
          placeholder="Describe the code question you want help with..."
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
        />

        <Button onClick={handleGenerate} className="w-full sm:w-auto">
          <Sparkles size={16} />
          Generate insight
        </Button>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">AI response</h3>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {response || "The assistant output will appear here after the request is sent to the service layer."}
        </p>
      </Card>
    </Page>
  );
}
