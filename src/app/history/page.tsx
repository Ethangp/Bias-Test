"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAccount } from "@/lib/storage";
import { getLevelBadgeColor } from "@/lib/scoring";
import type { UserAccount } from "@/types";

export default function HistoryPage() {
  const [account, setAccount] = useState<UserAccount | null>(() =>
    typeof window !== "undefined" ? getAccount() : null
  );

  useEffect(() => {
    queueMicrotask(() => {
      setAccount(getAccount());
    });
  }, []);

  const items = account?.profile.completedQuizzes ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        History
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">Timeline</h1>
      <p className="text-stone-500 leading-relaxed mb-10">
        Every saved test becomes a clickable checkpoint. Mood check-ins and AI
        shift markers will anchor on this spine later.
      </p>

      {!account || items.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-stone-500 text-sm">
          No history yet.{" "}
          <Link href="/tests" className="underline font-medium text-stone-800">
            Take a test
          </Link>{" "}
          and save the result to your profile.
        </div>
      ) : (
        <ol className="relative border-s border-stone-200 ms-3 space-y-8 pb-4">
          {[...items]
            .sort(
              (a, b) =>
                new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            )
            .map((cq) => (
              <li key={cq.id} className="ms-8">
                <span className="absolute -start-1.5 mt-1.5 flex h-3 w-3 rounded-full bg-stone-900 ring-4 ring-white" />
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <Link
                    href={`/quiz/${cq.quizSlug}`}
                    className="text-base font-semibold text-stone-900 hover:underline"
                  >
                    {cq.quizTitle}
                  </Link>
                  <time
                    className="text-xs text-stone-400 tabular-nums"
                    dateTime={cq.completedAt}
                  >
                    {new Date(cq.completedAt).toLocaleString()}
                  </time>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${getLevelBadgeColor(cq.resultLevel)}`}
                  >
                    {cq.resultLabel}
                  </span>
                  <span className="text-xs text-stone-400 capitalize">{cq.mode}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    href={`/quiz/${cq.quizSlug}`}
                    className="text-stone-600 underline hover:text-stone-900"
                  >
                    Retake section
                  </Link>
                  <Link
                    href="/compare"
                    className="text-stone-600 underline hover:text-stone-900"
                  >
                    Compare this run
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-stone-600 underline hover:text-stone-900"
                  >
                    View current profile
                  </Link>
                </div>
              </li>
            ))}
        </ol>
      )}
    </div>
  );
}
