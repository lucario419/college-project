import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, createTokenHash, setSessionCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";

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

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });

    if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
      return NextResponse.json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Incorrect email or password." } }, { status: 401 });
    }

    const token = createSessionToken();
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: {
        tokenHash: createTokenHash(token),
        userId: user.id,
        expiresAt: expiry,
      },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: "AUTH_ERROR", message: error instanceof Error ? error.message : "Authentication failed." } }, { status: 500 });
  }
}
