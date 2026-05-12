import Link from "next/link";

const COMPARE_MODES = [
  {
    title: "Compare with another user",
    body: "Side-by-side trait radar, overlap bands, and shared blind spots — requires an invite link or shared token.",
  },
  {
    title: "Friend compatibility",
    body: "Maps communication directness, conflict style, and empathy overlap to highlight synergy and friction zones.",
  },
  {
    title: "Relationship match report",
    body: "Romantic contexts weigh attachment signals, boundary strength, and emotional availability together.",
  },
  {
    title: "Work compatibility",
    body: "Focus on accountability, bias awareness, and conflict avoidance under professional pressure.",
  },
  {
    title: "Conflict risk analysis",
    body: "Surfaces where defensiveness spikes for either party and where repair tends to succeed.",
  },
];

export default function ComparePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        Compare
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">Comparison studio</h1>
      <p className="text-stone-500 leading-relaxed mb-10">
        High-engagement flows need explicit consent and shareable snapshots. Routes
        below describe the interaction model; invite-based compare arrives with the
        social layer.
      </p>
      <div className="space-y-4">
        {COMPARE_MODES.map((m) => (
          <div
            key={m.title}
            className="bg-white border border-stone-200 border-dashed rounded-2xl p-6 text-sm text-stone-600"
          >
            <h2 className="text-base font-semibold text-stone-900 mb-2">{m.title}</h2>
            <p className="leading-relaxed">{m.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-stone-400">
        Until invites ship, export slices from{" "}
        <Link href="/settings#share" className="underline hover:text-stone-600">
          Settings → Share
        </Link>{" "}
        and discuss them offline.
      </p>
    </div>
  );
}
