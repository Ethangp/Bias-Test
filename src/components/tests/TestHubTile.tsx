"use client";

import Link from "next/link";
import { useState } from "react";
import type { HubTestTile } from "@/lib/tests-hub";
import { getLastQuizSession, type LastQuizSession } from "@/lib/storage";

export default function TestHubTile({ tile }: { tile: HubTestTile }) {
  const [last] = useState<LastQuizSession | null>(() =>
    typeof window !== "undefined" ? getLastQuizSession() : null
  );

  const canResume = Boolean(tile.slug && last?.slug === tile.slug);

  if (tile.comingSoon || !tile.slug) {
    return (
      <div className="bg-stone-100 border border-stone-200 border-dashed rounded-2xl p-6 flex flex-col h-full opacity-90">
        <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
          Coming soon
        </div>
        <h3 className="text-lg font-semibold text-stone-700 mb-2">{tile.title}</h3>
        <p className="text-sm text-stone-500 leading-relaxed flex-1">{tile.blurb}</p>
        <button
          type="button"
          disabled
          className="mt-5 text-sm text-stone-400 py-2.5 px-4 rounded-full border border-stone-200 cursor-not-allowed"
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col h-full hover:border-stone-300 hover:shadow-sm transition-all">
      <h3 className="text-lg font-semibold text-stone-900 mb-2">{tile.title}</h3>
      <p className="text-sm text-stone-500 leading-relaxed flex-1 mb-5">{tile.blurb}</p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/quiz/${tile.slug}`}
          className="inline-flex items-center justify-center bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 transition-colors"
        >
          Start
        </Link>
        {canResume ? (
          <Link
            href={`/quiz/${tile.slug}`}
            className="inline-flex items-center justify-center bg-stone-100 text-stone-800 text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-200 transition-colors"
          >
            Resume
          </Link>
        ) : (
          <span
            className="inline-flex items-center justify-center text-stone-300 text-sm font-medium px-4 py-2 rounded-full border border-stone-100 cursor-default"
            title="Resume appears when this was the last test you opened"
          >
            Resume
          </span>
        )}
        <Link
          href={`/tests/sample#${tile.slug}`}
          className="inline-flex items-center justify-center text-stone-600 text-sm font-medium px-4 py-2 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors"
        >
          Sample result
        </Link>
      </div>
    </div>
  );
}
