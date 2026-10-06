import { Badge, Card, Grid, Page, Progress, diffTone } from "@/components/ui";

const TOPICS = [
  ["Arrays", "Easy", 14, 30],
  ["Strings", "Easy", 9, 25],
  ["Recursion", "Medium", 5, 20],
  ["Linked Lists", "Medium", 3, 18],
  ["Dynamic Programming", "Hard", 0, 22],
  ["Graphs", "Hard", 1, 20],
] as const;

export default function PracticePage() {
  return (
    <Page title="Practice" sub="Sharpen your fundamentals with focused problem-solving practice.">
      <Grid>
        {TOPICS.map(([topic, difficulty, solved, total]) => (
          <Card key={topic} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">{topic}</h3>
              <Badge tone={diffTone(difficulty)}>{difficulty}</Badge>
            </div>
            <Progress value={Math.round((solved / total) * 100)} />
            <p className="text-xs text-slate-500">{solved} of {total} problems solved</p>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
