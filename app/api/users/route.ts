import { NextResponse } from "next/server";
import { z } from "zod";
import { studentProfile } from "@/lib/data/mock-data";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["STUDENT", "TRAINER", "ADMIN"]),
});

export async function GET() {
  return NextResponse.json({ success: true, data: studentProfile });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = userSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid user payload" } }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: { ...parsed.data, id: "mock-user-1" } });
}
