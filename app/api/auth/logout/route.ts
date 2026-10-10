import { NextResponse } from "next/server";
import { clearSessionCookie, createTokenHash, getSessionToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST() {
  const token = await getSessionToken();

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
