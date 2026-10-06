import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { sessions } from "@/db/schema";
import { clearSessionCookie, createTokenHash, getSessionToken } from "@/lib/auth";

export async function POST() {
  const token = await getSessionToken();

  if (token) {
    try {
      await db.delete(sessions).where(eq(sessions.tokenHash, createTokenHash(token)));
    } catch (error) {
      console.error("Failed to delete session", error);
    }
  }

  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
