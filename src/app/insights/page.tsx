import Link from "next/link";

const PILLARS = [
  {
    title: "What this means about you",
    body: "Summaries will synthesize trait deltas and test history into plain language — each paragraph opens a drill-down.",
    href: "/dashboard",
  },
  {
    title: "Strengths breakdown",
    body: "Every strength becomes a link to examples, habits that reinforce it, and compare-to-population context.",
    href: "/explore",
  },
  {
    title: "Blind spots & contradictions",
    body: "Where your answers disagree with each other, we surface the tension without picking a winner.",
    href: "/compare",
  },
  {
    title: "Behavioral predictions",
    body: "Forward-looking prompts (not fortune telling) tied to communication, conflict, and bias risk.",
    href: "/history",
  },
];

export default function InsightsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        Insights
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">Insight layer</h1>
      <p className="text-stone-500 leading-relaxed mb-10">
        This is the narrative dashboard: every card below will eventually open a
        dedicated explanation route with examples, population context, and
        coaching prompts. Today the structure is live; model-generated copy ships
        next.
      </p>
      <ul className="space-y-4">
        {PILLARS.map((p) => (
          <li key={p.title}>
            <Link
              href={p.href}
              className="block bg-white border border-stone-200 rounded-2xl p-6 hover:border-stone-400 hover:shadow-sm transition-all"
            >
              <h2 className="text-lg font-semibold text-stone-900 mb-2">{p.title}</h2>
              <p className="text-sm text-stone-500 leading-relaxed">{p.body}</p>
              <span className="inline-block mt-4 text-sm font-medium text-stone-900 underline underline-offset-4">
                Open related surface →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
