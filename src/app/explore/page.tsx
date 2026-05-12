import Link from "next/link";
import { TRAIT_EXPLAINERS, TRAIT_KEYS_ORDER } from "@/lib/trait-explainer";
import { QUIZ_REGISTRY } from "@/data/quizzes";

export default function ExplorePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        Explore
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">Discovery</h1>
      <p className="text-stone-500 leading-relaxed mb-12 max-w-2xl">
        Browse traits, bias entry points, and archetype placeholders. Each tile
        routes to a deeper explanation or a live test.
      </p>

      <section id="bias-cluster" className="mb-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Bias types & scanners</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { slug: "preference-or-bias", label: "Preference vs. bias" },
            { slug: "microaggression-checker", label: "Microaggressions" },
            { slug: "racial-blind-spots", label: "Racial blind spots" },
          ].map((b) => (
            <Link
              key={b.slug}
              href={`/quiz/${b.slug}`}
              className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 transition-colors"
            >
              <div className="font-semibold text-stone-900 mb-1">{b.label}</div>
              <p className="text-xs text-stone-500">Open reflection test →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Traits library</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAIT_KEYS_ORDER.map((key) => {
            const t = TRAIT_EXPLAINERS[key];
            return (
              <Link
                key={key}
                href={`/dashboard/trait/${key}`}
                className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 transition-colors"
              >
                <div className="font-semibold text-stone-900 mb-2">{t.headline}</div>
                <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed">
                  {t.body}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-stone-900 mb-4">Tests index</h2>
        <ul className="columns-1 sm:columns-2 gap-4 text-sm">
          {QUIZ_REGISTRY.map((q) => (
            <li key={q.slug} className="mb-2 break-inside-avoid">
              <Link href={`/quiz/${q.slug}`} className="text-stone-600 hover:text-stone-900 underline-offset-2 hover:underline">
                {q.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
