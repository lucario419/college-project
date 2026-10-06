import { NextResponse } from "next/server";
import { trainings } from "@/lib/data/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: trainings });
}
