import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";

export const SESSION_COOKIE = "unisphere_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export function createSessionToken() {
  return [
    crypto.randomBytes(18).toString("hex"),
    crypto.randomBytes(18).toString("hex"),
    crypto.randomBytes(18).toString("hex"),
  ].join(".");
}

export function createTokenHash(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateStudentId() {
  const year = new Date().getFullYear();
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `STU-${year}-${suffix}`;
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100_000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, hash: string) {
  const [salt, actualHash] = hash.split(":");

  if (!salt || !actualHash) {
    return false;
  }

  const candidate = crypto.pbkdf2Sync(password, salt, 100_000, 64, "sha512");
  const expected = Buffer.from(actualHash, "hex");

  if (candidate.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidate, expected);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function createSession(response: NextResponse, userId: string) {
  const token = createSessionToken();

  await db.insert(sessions).values({
    tokenHash: createTokenHash(token),
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000),
  });

  setSessionCookie(response, token);
}

export async function getCurrentUser() {
  const token = await getSessionToken();

  if (!token) {
    return null;
  }

  const [row] = await db
    .select({ user: users })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, createTokenHash(token)), gt(sessions.expiresAt, new Date())))
    .limit(1);

  return row?.user ?? null;
}
