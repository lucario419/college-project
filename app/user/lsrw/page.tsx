import { BookOpen, Headphones, Mic, PenLine } from "lucide-react";
import { Button, Card, Grid, Page, Progress } from "@/components/ui";
import { lsrwScores } from "@/lib/data/mock-data";

const skills = [
  { name: "Listening", icon: Headphones, score: lsrwScores.listening, progress: 82, description: "Audio comprehension and note-taking." },
  { name: "Speaking", icon: Mic, score: lsrwScores.speaking, progress: 76, description: "Pronunciation, fluency, and mock interviews." },
  { name: "Reading", icon: BookOpen, score: lsrwScores.reading, progress: 88, description: "Timed comprehension and technical reading." },
  { name: "Writing", icon: PenLine, score: lsrwScores.writing, progress: 81, description: "Essays, reports, and professional email drafts." },
];

export default function LsrwPage() {
  return (
    <Page title="LSRW" sub="Language development dashboard for listening, speaking, reading, and writing.">
      <div className="grid gap-4 md:grid-cols-5">
        {[
          ["Overall score", `${Math.round((Object.values(lsrwScores).reduce((sum, current) => sum + current, 0) / 4))}%`],
          ["Listening", `${lsrwScores.listening}%`],
          ["Speaking", `${lsrwScores.speaking}%`],
          ["Reading", `${lsrwScores.reading}%`],
          ["Writing", `${lsrwScores.writing}%`],
        ].map(([label, value]) => (
          <Card key={label} className="text-center">
            <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
          </Card>
        ))}
      </div>

      <Grid>
        {skills.map(({ name, icon: Icon, score, progress, description }) => (
          <Card key={name} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{name}</h3>
                <p className="text-xs text-slate-500">{score}% score</p>
              </div>
            </div>

            <p className="text-sm text-slate-500">{description}</p>
            <Progress value={progress} />
            <Button variant="secondary" className="w-full justify-center">Continue practice</Button>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
