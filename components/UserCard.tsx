import { Mail, Building2, CalendarDays, IdCard, FileBarChart, KeyRound } from "lucide-react";

type Props = { user: { name: string; email: string; role: string; studentId?: string | null }; points: number };

export default function UserCard({ user, points }: Props) {
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "ST";
  const stats = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Building2, label: "Organization", value: "University" },
    { icon: CalendarDays, label: "Account type", value: user.role.toLowerCase() },
    { icon: IdCard, label: "Student ID", value: user.studentId ?? "Not assigned" },
  ];
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-indigo-600 text-xl font-bold text-white">{initials}</div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Active</span>
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">{user.role.toLowerCase()}</span>
          </div>
        </div>
        <span className="self-start rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-orange-700 sm:self-center">{points} pts</span>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
            <Icon size={18} className="mt-0.5 shrink-0 text-indigo-600" />
            <div className="min-w-0">
              <dt className="text-xs text-slate-500">{label}</dt>
              <dd className="truncate text-sm font-medium text-slate-900">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95">
          <FileBarChart size={16} /> Report
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95">
          <KeyRound size={16} /> Change Password
        </button>
      </div>
    </section>
  );
}
