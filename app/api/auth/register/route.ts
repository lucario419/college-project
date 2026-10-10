import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, createTokenHash, generateStudentId, hashPassword, setSessionCookie } from "@/lib/auth";
import { assessments, courses } from "@/lib/data/mock-data";
import { prisma } from "@/lib/db";

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
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ success: false, error: { code: "USER_EXISTS", message: "An account with that email already exists." } }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name.trim(),
        email,
        password: await hashPassword(parsed.data.password),
        studentId: generateStudentId(),
        role: "STUDENT",
        dashboard: {
          create: {
            courseProgress: {
              create: courses.map((course) => ({ courseId: course.id, title: course.title })),
            },
            assessmentProgress: {
              create: assessments.map((assessment) => ({ assessmentId: assessment.id })),
            },
          },
        },
      },
    });

    const token = createSessionToken();
    await prisma.session.create({
      data: {
        tokenHash: createTokenHash(token),
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

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

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json({ success: false, error: { code: "REGISTRATION_ERROR", message: "Registration is temporarily unavailable. Please try again." } }, { status: 500 });
  }
}
