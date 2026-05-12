import Link from "next/link";
import { notFound } from "next/navigation";
import { isTraitKey, TRAIT_EXPLAINERS } from "@/lib/trait-explainer";

export default async function TraitDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!isTraitKey(key)) notFound();
  const t = TRAIT_EXPLAINERS[key];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        My Profile · Trait
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">{t.headline}</h1>
      <p className="text-stone-600 leading-relaxed mb-8">{t.body}</p>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
          Real-life example
        </h2>
        <p className="text-sm text-stone-700 leading-relaxed">{t.example}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/dashboard"
          className="text-stone-900 font-medium underline underline-offset-4"
        >
          ← Back to profile
        </Link>
        <Link href="/compare" className="text-stone-600 underline hover:text-stone-900">
          Compare this trait
        </Link>
        <Link href="/search" className="text-stone-600 underline hover:text-stone-900">
          Search related tests
        </Link>
      </div>
    </div>
  );
}
