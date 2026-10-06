"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type UserSummary = { name: string; email: string; role: string };

export default function AppShell({ children, user }: { children: React.ReactNode; user: UserSummary }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />
      <div className={`transition-[padding] duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"}`}>
        <Header user={user} onToggleDesktop={() => setCollapsed((value) => !value)} onToggleMobile={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
