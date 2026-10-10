import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import { getCurrentUser } from "@/lib/auth";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  let user: Awaited<ReturnType<typeof getCurrentUser>>;

  try {
    user = await getCurrentUser();
  } catch {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <section role="alert" className="w-full max-w-lg space-y-4 rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-amber-700">Database connection unavailable</p>
          <h1 className="text-2xl font-bold text-slate-900">Your portal could not load</h1>
          <p className="text-sm leading-6 text-slate-600">
            UniSphere could not reach the Neon database. Check the DATABASE_URL in .env and retry.
          </p>
          <a href="/user/dashboard" className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Retry
          </a>
        </section>
      </main>
    );
  }

  if (!user) {
    redirect("/login");
  }

  return <AppShell user={{ name: user.name, email: user.email, role: user.role }}>{children}</AppShell>;
}
