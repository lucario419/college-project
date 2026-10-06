"use client";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Page } from "@/components/ui";

const defaultArray = [9, 4, 7, 2, 5, 1, 8, 3];

export default function DsaVisualizerPage() {
  const [values, setValues] = useState(defaultArray);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [speed, setSpeed] = useState(500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const steps = useMemo(() => {
    const copy = [...defaultArray];
    const result: number[][] = [];
    for (let i = 0; i < copy.length; i += 1) {
      for (let j = 0; j < copy.length - i - 1; j += 1) {
        if (copy[j] > copy[j + 1]) {
          [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
        }
        result.push([...copy]);
      }
    }
    return result;
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    timeoutRef.current = window.setTimeout(() => {
      setStep((current) => {
        const nextStep = current + 1;
        if (nextStep >= steps.length) {
          setIsPlaying(false);
          return current;
        }
        setValues(steps[nextStep]);
        setActiveIndexes([Math.floor(nextStep / 7), Math.floor(nextStep / 7) + 1]);
        return nextStep;
      });
    }, speed);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, speed, steps]);

  const reset = () => {
    setValues(defaultArray);
    setIsPlaying(false);
    setStep(0);
    setActiveIndexes([]);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const stepForward = () => {
    const nextStep = Math.min(step + 1, steps.length - 1);
    setStep(nextStep);
    setValues(steps[nextStep]);
  };

  return (
    <Page title="DSA Visualizer" sub="Visualize sorting behavior, complexity, and algorithmic flow in a controlled environment.">
      <Card className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button onClick={play} variant="primary"><Play size={16} /> Play</Button>
          <Button onClick={pause} variant="secondary"><Pause size={16} /> Pause</Button>
          <Button onClick={stepForward} variant="secondary"><StepForward size={16} /> Step</Button>
          <Button onClick={reset} variant="secondary"><RotateCcw size={16} /> Reset</Button>
        </div>

        <div className="flex items-end gap-2 rounded-xl bg-slate-50 p-4">
          {values.map((value, index) => (
            <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`w-full rounded-t-xl transition-all ${activeIndexes.includes(index) ? "bg-orange-500" : "bg-indigo-600"}`}
                style={{ height: `${value * 18}px` }}
              />
              <span className="text-xs text-slate-500">{value}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Current operation</p>
            <p className="mt-2 text-base font-semibold text-slate-900">Compare and swap adjacent values</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Time complexity</p>
            <p className="mt-2 text-base font-semibold text-slate-900">O(n²)</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Space complexity</p>
            <p className="mt-2 text-base font-semibold text-slate-900">O(1)</p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Animation speed</label>
          <input
            type="range"
            min={200}
            max={1000}
            step={100}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </Card>
    </Page>
  );
}
