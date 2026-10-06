import { NextResponse } from "next/server";
import { z } from "zod";
import { blogs } from "@/lib/data/mock-data";

const blogQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = blogQuerySchema.safeParse({
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid blog query" } }, { status: 400 });
  }

  const { category, search } = parsed.data;
  const results = blogs.filter((post) => {
    const matchesCategory = !category || category === "All" || post.category === category;
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return NextResponse.json({ success: true, data: results });
}
