import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Not signed in." } }, { status: 401 });
  }

  return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}
