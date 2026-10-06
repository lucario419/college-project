"use client";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Badge, Button, Card, Grid, Page, Progress } from "@/components/ui";
import { courses } from "@/lib/data/mock-data";

const categoryOptions = ["All", ...new Set(courses.map((course) => course.category))];
const progressOptions = ["All", "In progress", "Completed", "Not started"] as const;

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [progressFilter, setProgressFilter] = useState<(typeof progressOptions)[number]>("All");

  const results = useMemo(() => {
    return courses.filter((course) => {
      const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || course.category === category;
      const matchesProgress =
        progressFilter === "All" ||
        (progressFilter === "Completed" && course.progress === 100) ||
        (progressFilter === "In progress" && course.progress > 0 && course.progress < 100) ||
        (progressFilter === "Not started" && course.progress === 0);
      return matchesQuery && matchesCategory && matchesProgress;
    });
  }, [category, progressFilter, query]);

  return (
    <Page title="Courses" sub="Continue your learning journey with structured academic pathways.">
      <div className="space-y-4">
        <label className="relative block max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                category === item ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {progressOptions.map((item) => (
            <button
              key={item}
              onClick={() => setProgressFilter(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                progressFilter === item ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Grid>
        {results.map((course) => (
          <Card key={course.id} className="flex h-full flex-col justify-between gap-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <Badge tone={course.progress === 100 ? "green" : "brand"}>{course.progress}% complete</Badge>
                <span className="text-xs text-slate-500">{course.category}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{course.title}</h3>
              <p className="mt-2 text-sm text-slate-500">Instructor: {course.instructor}</p>
            </div>

            <div className="space-y-2">
              <Progress value={course.progress} />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                <span>{course.status}</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full justify-center">
              Continue
              <ArrowRight size={16} />
            </Button>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
