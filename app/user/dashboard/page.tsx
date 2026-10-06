import { ArrowRight, BookOpen, BriefcaseBusiness, Code2, Trophy, Zap } from "lucide-react";
import UserCard from "@/components/UserCard";
import TierRoadmap from "@/components/TierRoadmap";
import { courses } from "@/lib/data/mock-data";
import { getDashboardData } from "@/lib/dashboard-data";
import { getCurrentUser } from "@/lib/auth";
import { getTierSnapshot } from "@/lib/utils/tier";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { redirect } from "next/navigation";

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Trophy }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
      </div>
    </Card>
  );
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dashboard = await getDashboardData(user.id);
  const snapshot = getTierSnapshot(dashboard.points);
  const personalCourses = courses.map((course) => ({
    ...course,
    progress: dashboard.courseProgress.find((item) => item.courseId === course.id)?.progress ?? 0,
  }));
  const activeCourses = personalCourses.filter((course) => course.progress > 0 && course.progress < 100).length;
  const upcomingAssessments = dashboard.assessmentProgress
    .filter((item) => item.status !== "Completed")
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[linear-gradient(135deg,#4f46e5,#3b82f6)] p-5 text-white shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-100">Your learning space</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Welcome, {user.name.split(/\s+/)[0]}</h1>
            <p className="mt-1 text-sm text-indigo-100">Your progress, courses, and next steps.</p>
          </div>
          <Button className="bg-white text-indigo-700 hover:bg-indigo-50" variant="secondary">View profile</Button>
        </div>
      </div>

      <UserCard user={user} points={dashboard.points} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active courses" value={String(activeCourses).padStart(2, "0")} icon={BookOpen} />
        <StatCard label="Upcoming tasks" value={String(upcomingAssessments.length).padStart(2, "0")} icon={BriefcaseBusiness} />
        <StatCard label="Leaderboard" value={`#${dashboard.rank}`} icon={Trophy} />
        <StatCard label="Coding streak" value={`${dashboard.codingStreak} days`} icon={Code2} />
      </div>

      <TierRoadmap
        tier={snapshot.currentTier.name}
        level={snapshot.currentLevel}
        totalPoints={dashboard.points}
        tierRange={snapshot.currentRange}
        pointsToNext={snapshot.pointsToNextLevel}
      />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Upcoming assessments</h2>
            <Badge tone="blue">{upcomingAssessments.length} upcoming</Badge>
          </div>
          <div className="space-y-4">
            {upcomingAssessments.map((item) => (
              <div key={item.assessmentId} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.assessment.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.assessment.description}</p>
                  </div>
                  <Badge tone={item.status === "In progress" ? "orange" : "blue"}>{item.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.assessment.category}</span>
                  <span>{item.assessment.count} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Progress snapshot</h2>
            <Zap className="text-indigo-600" size={18} />
          </div>
          <div className="mt-5 space-y-5">
            {personalCourses.slice(0, 3).map((course) => (
              <div key={course.id}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">{course.title}</p>
                  <span className="text-xs text-slate-500">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
          <div className="mt-4 space-y-3">
            {dashboard.activities.length ? dashboard.activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                  <p className="text-xs text-slate-500">{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(activity.createdAt)}</p>
                </div>
              </div>
            )) : <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Your learning activity will appear here as you make progress.</p>}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Leaderboard position</h2>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-50 p-4">
            <div>
              <p className="text-sm text-slate-500">Current rank</p>
              <p className="mt-2 text-3xl font-bold text-indigo-700">#{dashboard.rank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Points</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{dashboard.points}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-600">Performance trend</span>
            <span className="font-semibold text-emerald-600">{dashboard.weeklyProgress}%</span>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recommended learning</h2>
          <Button variant="ghost" className="text-indigo-700">
            Explore all
            <ArrowRight size={16} />
          </Button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { title: "SQL Query Tuning", tag: "Database", time: "30 min" },
            { title: "System Design Sprint", tag: "Architecture", time: "45 min" },
            { title: "Mock Technical Interview", tag: "Career", time: "20 min" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 p-4">
              <Badge tone="brand">{item.tag}</Badge>
              <p className="mt-3 font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm text-slate-500">{item.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
