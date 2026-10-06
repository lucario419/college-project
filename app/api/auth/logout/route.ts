import { NextResponse } from "next/server";
import { clearSessionCookie, createTokenHash } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const token = request.headers.get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("unisphere_session="))
    ?.split("=")[1];

  if (token) {
    await prisma.session.deleteMany({
      where: {
        tokenHash: createTokenHash(token),
      },
    });
  }

  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
