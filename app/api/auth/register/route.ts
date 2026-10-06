import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession, hashPassword } from "@/lib/auth";
import { ensureDashboard } from "@/lib/dashboard-data";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Please provide a valid name, email, and password." } }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const [user] = await db
      .insert(users)
      .values({
        name: parsed.data.name.trim(),
        email,
        password: await hashPassword(parsed.data.password),
        role: "STUDENT",
      })
      .onConflictDoNothing({ target: users.email })
      .returning();

    if (!user) {
      return NextResponse.json({ success: false, error: { code: "USER_EXISTS", message: "An account with that email already exists." } }, { status: 409 });
    }

    await ensureDashboard(user.id);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    await createSession(response, user.id);
    return response;
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json({ success: false, error: { code: "REGISTRATION_ERROR", message: "Registration is temporarily unavailable. Please try again." } }, { status: 500 });
  }
}
