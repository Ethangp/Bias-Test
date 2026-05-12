"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAccount, getLastQuizSession, getRecommendedQuizSlugs } from "@/lib/storage";
import { getQuizBySlug } from "@/data/quizzes";
import { CATEGORY_INFO } from "@/lib/quizzes";
import { DEFAULT_CORE_ASSESSMENT_SLUG } from "@/lib/tests-hub";
import type { UserAccount } from "@/types";

export default function HomeDashboardModules() {
  const [account] = useState<UserAccount | null>(() =>
    typeof window !== "undefined" ? getAccount() : null
  );
  const [lastQuiz] = useState<ReturnType<typeof getLastQuizSession>>(() =>
    typeof window !== "undefined" ? getLastQuizSession() : null
  );

  const recommended = useMemo(() => {
    if (!account) return null;
    const slugs = getRecommendedQuizSlugs(account);
    const first = slugs[0];
    if (!first) return null;
    const q = getQuizBySlug(first);
    if (!q) return null;
    return { slug: first, title: q.title, cat: q.category };
  }, [account]);

  const snapshotConfidence = account?.profile.profileConfidence ?? null;
  const biasHint =
    account && account.profile.traits.biasAwareness
      ? `${account.profile.traits.biasAwareness.score}% signal on bias awareness`
      : "Take bias-related tests to populate this card";

  return (
    <section className="bg-stone-100 border-y border-stone-200 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">
              Home / Dashboard
            </p>
            <h2 className="text-2xl font-bold text-stone-900">Your control room</h2>
            <p className="text-sm text-stone-500 mt-1">
              Every block deep-links into the product. Nothing here is decorative.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 underline underline-offset-4 shrink-0"
          >
            Open full profile →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={`/quiz/${DEFAULT_CORE_ASSESSMENT_SLUG}`}
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Start
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Core assessment
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              Preference, exclusion, and bias reflection — common entry point.
            </span>
          </Link>

          <Link
            href={lastQuiz ? `/quiz/${lastQuiz.slug}` : "/tests"}
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Continue
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Last test
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              {lastQuiz ? lastQuiz.title : "Open the test hub to pick something new."}
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Snapshot
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Personality profile
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              {snapshotConfidence !== null
                ? `${snapshotConfidence}% profile confidence · tap for traits`
                : "Create a profile after your first save to unlock this card."}
            </span>
          </Link>

          <Link
            href="/explore#bias-cluster"
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Overview
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Bias & awareness
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">{biasHint}</span>
          </Link>

          <Link
            href="/history"
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Trends
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Weekly trajectory
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              Mood check-ins and charts ship next — preview the history layout.
            </span>
          </Link>

          <Link
            href={
              recommended
                ? `/quiz/${recommended.slug}`
                : account
                  ? "/tests"
                  : "/tests#core-section"
            }
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Next
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Recommended test
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              {recommended
                ? `${recommended.title} · ${CATEGORY_INFO[recommended.cat]?.emoji ?? ""} ${CATEGORY_INFO[recommended.cat]?.label ?? ""}`
                : "We suggest tests once you have saved results on this device."}
            </span>
          </Link>

          <Link
            href="/insights"
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Insights
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Latest read
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              Strengths, blind spots, and coaching-style prompts — evolving layer.
            </span>
          </Link>

          <Link
            href="/settings#share"
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col min-h-[140px]"
          >
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              Share
            </span>
            <span className="text-lg font-semibold text-stone-900 mt-1">
              Profile export
            </span>
            <span className="text-sm text-stone-500 mt-2 flex-1">
              Local-only today · share cards and public links are on the roadmap.
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
