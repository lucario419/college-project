"use client";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Card, Grid, Page } from "@/components/ui";
import { blogs } from "@/lib/data/mock-data";

const categories = ["All", ...new Set(blogs.map((post) => post.category))];

export default function BlogsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, query]);

  return (
    <Page title="Blogs" sub="Research-backed student insights, coding guides, and career advice.">
      <div className="space-y-4">
        <label className="relative block max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blogs"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                category === item ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Grid>
        {filteredPosts.map((post) => (
          <Card key={post.id} className="flex h-full flex-col justify-between gap-4">
            <div>
              <Badge tone="brand">{post.category}</Badge>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-500">by {post.author}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{post.publishedAt}</span>
              <span>{post.readTime}</span>
            </div>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
