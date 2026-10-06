import { tierDefinitions } from "@/lib/data/mock-data";

export function getTierSnapshot(points: number) {
  const currentTier =
    [...tierDefinitions].reverse().find((tier) => points >= tier.minPoints) ?? tierDefinitions[0];
  const currentLevel = Math.max(1, Math.floor(points / 100) + 1);
  const nextTier = tierDefinitions.find((tier) => tier.minPoints > points) ?? null;
  const start = currentTier.minPoints;
  const range = Math.max(1, currentTier.maxPoints - start);
  const progressPercentage = Math.min(100, Math.max(0, ((points - start) / range) * 100));
  const pointsToNextLevel = nextTier ? Math.max(1, nextTier.minPoints - points) : 0;

  return {
    currentTier,
    currentLevel,
    progressPercentage,
    pointsToNextLevel,
    currentRange: `${currentTier.minPoints}-${currentTier.maxPoints}`,
    nextTier,
  };
}
