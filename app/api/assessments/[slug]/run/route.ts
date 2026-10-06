import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { judgeTwoSum } from "@/lib/services/assessment-judge";

export const runtime = "nodejs";

const runSchema = z.object({ code: z.string().min(1).max(12_000) });

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, error: { message: "Sign in to run code." } }, { status: 401 });

  const { slug } = await params;
  if (slug !== "coding-two-sum") return NextResponse.json({ success: false, error: { message: "This assessment does not have a code runner." } }, { status: 404 });

  const parsed = runSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false, error: { message: "Enter code under 12,000 characters." } }, { status: 400 });

  const result = await judgeTwoSum(parsed.data.code);
  return NextResponse.json({ success: true, data: result });
}