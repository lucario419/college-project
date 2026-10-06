"use client";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = { user: { name: string; email: string; role: string }; onToggleDesktop: () => void; onToggleMobile: () => void };

export default function Header({ user, onToggleDesktop, onToggleMobile }: Props) {
  const router = useRouter();
  const btn = "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-100";
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "ST";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-sm sm:px-6">
      <button onClick={onToggleMobile} aria-label="Open menu" className={`${btn} lg:hidden`}>
        <Menu size={18} />
      </button>
      <button onClick={onToggleDesktop} aria-label="Toggle sidebar" className={`${btn} hidden lg:inline-flex`}>
        <Menu size={18} />
      </button>

      <label className="relative max-w-md flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search modules, courses, tasks..."
          aria-label="Search"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </label>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 sm:inline-flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Online
        </span>
        <button aria-label="Notifications" className={`${btn} relative`}>
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>
        <button onClick={handleLogout} aria-label="Logout" className={`${btn}`} title="Logout">
          <LogOut size={18} />
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">{initials}</div>
          <div className="hidden sm:block">
            <p className="max-w-36 truncate text-xs font-semibold text-slate-900">{user.name}</p>
            <p className="text-[10px] capitalize text-slate-500">{user.role.toLowerCase()}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
