import { redirect } from "next/navigation";
import LeaderboardTable from "@/components/LeaderboardTable";
import { getCurrentUser } from "@/lib/auth";
import { getLeaderboardData } from "@/lib/leaderboard-data";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const entries = await getLeaderboardData();
  return <LeaderboardTable entries={entries} currentUserId={user.id} />;
}