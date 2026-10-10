import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession, verifyPassword } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Email and password are required." } }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.email, parsed.data.email.trim().toLowerCase())).limit(1);

    if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
      return NextResponse.json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Incorrect email or password." } }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role,
      },
    });

    await createSession(response, user.id);
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ success: false, error: { code: "AUTH_ERROR", message: "Sign in is temporarily unavailable. Please try again." } }, { status: 500 });
  }
}
