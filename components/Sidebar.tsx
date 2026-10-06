"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";

type Props = { collapsed: boolean; mobileOpen: boolean; onClose: () => void; onToggleCollapse: () => void };

export default function Sidebar({ collapsed, mobileOpen, onClose, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const hide = collapsed ? "lg:hidden" : "";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "lg:w-[72px]" : "lg:w-[260px]"}`}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-100 px-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <GraduationCap size={22} />
          </div>
          <div className={`leading-tight ${hide}`}>
            <p className="text-sm font-bold tracking-[0.18em] text-slate-900">UNISPHERE</p>
            <p className="text-[11px] font-medium text-indigo-600">Student Portal</p>
          </div>
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="ml-auto hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:inline-flex"
          >
            <X size={18} className={collapsed ? "rotate-180" : ""} />
          </button>
          <button onClick={onClose} aria-label="Close menu" className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                onClick={onClose}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                } ${collapsed ? "lg:justify-center lg:px-2" : ""}`}
              >
                <Icon size={18} className={`shrink-0 ${active ? "text-indigo-600" : "text-slate-500"}`} />
                <span className={`truncate ${hide}`}>{label}</span>
                {collapsed && (
                  <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-lg bg-slate-900 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 lg:group-hover:opacity-100">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
