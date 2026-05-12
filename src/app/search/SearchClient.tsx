"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUIZ_REGISTRY } from "@/data/quizzes";
import { TRAIT_EXPLAINERS, TRAIT_KEYS_ORDER } from "@/lib/trait-explainer";

type Hit =
  | { kind: "test"; slug: string; title: string; snippet: string }
  | { kind: "trait"; key: string; title: string; snippet: string };

export default function SearchClient() {
  const [q, setQ] = useState("");

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const out: Hit[] = [];

    TRAIT_KEYS_ORDER.forEach((key) => {
      const t = TRAIT_EXPLAINERS[key];
      const hay = `${t.headline} ${t.body} ${t.example}`.toLowerCase();
      if (hay.includes(needle)) {
        out.push({
          kind: "trait",
          key,
          title: t.headline,
          snippet: t.body,
        });
      }
    });

    QUIZ_REGISTRY.forEach((quiz) => {
      const hay = `${quiz.title} ${quiz.description} ${quiz.tags.join(" ")}`.toLowerCase();
      if (hay.includes(needle)) {
        out.push({
          kind: "test",
          slug: quiz.slug,
          title: quiz.title,
          snippet: quiz.description,
        });
      }
    });

    return out.slice(0, 24);
  }, [q]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        Search
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-6">Find a surface</h1>
      <label className="block text-sm text-stone-500 mb-2" htmlFor="q">
        Traits, tests, and tags (local index)
      </label>
      <input
        id="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try “boundary”, “microaggression”, “attachment”…"
        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-stone-400 transition-colors mb-8"
        autoComplete="off"
      />

      {!q.trim() ? (
        <p className="text-sm text-stone-400">
          Start typing to filter tests and trait explainers stored in this build.
        </p>
      ) : hits.length === 0 ? (
        <p className="text-sm text-stone-500">No matches — try another word.</p>
      ) : (
        <ul className="space-y-3">
          {hits.map((h) => (
            <li key={`${h.kind}-${h.kind === "test" ? h.slug : h.key}`}>
              <Link
                href={h.kind === "test" ? `/quiz/${h.slug}` : `/dashboard/trait/${h.key}`}
                className="block bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-400 transition-colors"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">
                  {h.kind === "test" ? "Test → Start" : "Trait → Explanation"}
                </div>
                <div className="font-medium text-stone-900">{h.title}</div>
                <p className="text-sm text-stone-500 mt-1 line-clamp-2">{h.snippet}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
