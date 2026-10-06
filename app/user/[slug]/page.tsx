import { NAV_ITEMS } from "@/lib/nav";

export default async function Placeholder({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = NAV_ITEMS.find((i) => i.href === `/user/${slug}`);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h1 className="text-xl font-bold text-slate-900">{item?.label ?? "Page not found"}</h1>
      <p className="mt-2 text-sm text-slate-500">This section hasn&apos;t been built yet.</p>
    </div>
  );
}
