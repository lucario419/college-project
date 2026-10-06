import { NextResponse } from "next/server";
import { z } from "zod";
import { courses } from "@/lib/data/mock-data";

const courseQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = courseQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid course query" } }, { status: 400 });
  }

  const { category, search } = parsed.data;
  const results = courses.filter((course) => {
    const matchesCategory = !category || category === "All" || course.category === category;
    const matchesSearch = !search || course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return NextResponse.json({ success: true, data: results });
}
