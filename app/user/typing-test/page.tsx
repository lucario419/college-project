"use client";
import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Page } from "@/components/ui";

const SAMPLE_TEXT = "Consistency beats speed when you train with purpose and deliberate practice every single day.";
const DURATIONS = [30, 60, 120] as const;

export default function TypingTestPage() {
  const [duration, setDuration] = useState<number>(60);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setInput("");
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setIsRunning(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const correctChars = useMemo(
    () => [...input].filter((character, index) => character === SAMPLE_TEXT[index]).length,
    [input]
  );

  const incorrectChars = Math.max(input.length - correctChars, 0);
  const accuracy = input.length ? Math.round((correctChars / input.length) * 100) : 100;
  const elapsed = duration - timeLeft;
  const wpm = elapsed > 0 ? Math.round((correctChars / 5) / (elapsed / 60)) : 0;
  const progress = Math.min(100, Math.round((input.length / SAMPLE_TEXT.length) * 100));
  const isComplete = timeLeft === 0 || input.length >= SAMPLE_TEXT.length;

  const handleChange = (value: string) => {
    if (isComplete) return;
    setInput(value);
    if (!isRunning && value.length > 0) {
      setIsRunning(true);
    }
  };

  const reset = () => {
    setInput("");
    setTimeLeft(duration);
    setIsRunning(false);
  };

  return (
    <Page title="Typing Test" sub="Measure your typing speed, accuracy, and momentum in timed challenges.">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Duration", `${timeLeft}s`],
          ["WPM", String(wpm)],
          ["Accuracy", `${accuracy}%`],
          ["Progress", `${progress}%`],
        ].map(([label, value]) => (
          <Card key={label} className="text-center">
            <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((item) => (
            <button
              key={item}
              onClick={() => setDuration(item)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                item === duration ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}s
            </button>
          ))}
        </div>

        <p className="rounded-xl bg-slate-50 p-4 text-lg leading-relaxed text-slate-700">
          {SAMPLE_TEXT.split("").map((character, index) => {
            const typedCharacter = input[index];
            const isCorrect = typedCharacter === character;
            const isTyped = typedCharacter !== undefined;

            return (
              <span
                key={`${character}-${index}`}
                className={
                  isTyped
                    ? isCorrect
                      ? "text-emerald-600"
                      : "bg-red-100 text-red-700"
                    : "text-slate-500"
                }
              >
                {character}
              </span>
            );
          })}
        </p>

        <textarea
          value={input}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Start typing to begin..."
          rows={5}
          disabled={isComplete}
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="secondary" onClick={reset} className="w-full sm:w-auto">
            <RotateCcw size={16} />
            Restart
          </Button>

          {isComplete && (
            <div className="text-sm font-medium text-slate-700">
              Result: <span className="text-emerald-600">{wpm} WPM</span> • {accuracy}% accuracy • {correctChars} correct / {incorrectChars} incorrect
            </div>
          )}
        </div>
      </Card>
    </Page>
  );
}
