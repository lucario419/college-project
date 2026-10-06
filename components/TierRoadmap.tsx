import { Trophy, TrendingUp } from "lucide-react";

type Props = { tier: string; level: number; totalPoints: number; tierRange: string; pointsToNext: number };

export default function TierRoadmap({ tier, level, totalPoints, tierRange, pointsToNext }: Props) {
  const pct = Math.round((totalPoints / (totalPoints + pointsToNext)) * 100);
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Performance Tier</h2>
      <div className="flex flex-col gap-4 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500 text-white"><Trophy size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">Current tier</p>
            <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">{tier} Lv{level}</span>
          </div>
        </div>
        <p className="text-sm text-slate-600">Tier range: <b className="text-slate-900">{tierRange} points</b></p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900"><TrendingUp size={18} className="text-indigo-600" /> Level Roadmap</h3>
          <span className="text-sm font-medium text-indigo-600">Level {level}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-indigo-600 transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{totalPoints} pts</span>
          <span className="font-medium text-orange-600">{pointsToNext} pts to next level</span>
        </div>
      </div>
    </section>
  );
}
