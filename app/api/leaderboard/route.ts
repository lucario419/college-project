import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getLeaderboardData } from "@/lib/leaderboard-data";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to view the leaderboard." } }, { status: 401 });
  }

  const data = await getLeaderboardData();
  return NextResponse.json({ success: true, data });
}
