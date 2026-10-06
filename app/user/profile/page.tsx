import { KeyRound, Mail, UserRound } from "lucide-react";
import { Button, Card, Page } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "ST";

  return (
    <Page title="Profile" sub="Student profile and account controls.">
      <Card className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-indigo-600 text-xl font-bold text-white">{initials}</div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.role}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500"><Mail size={16} /> Email</div>
            <p className="mt-2 font-medium text-slate-900">{user.email}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500"><UserRound size={16} /> Student ID</div>
            <p className="mt-2 font-medium text-slate-900">Not assigned</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Edit profile</Button>
          <Button variant="secondary"><KeyRound size={16} /> Change password</Button>
        </div>
      </Card>
    </Page>
  );
}
